"use client";

import { cn } from "natmfat/lib/cn";
import { useEffect, useRef } from "react";
import styles from "./logo.module.css";

export const Logo = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = useRef<ICanvas>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvas.current = new Canvas(canvasRef.current);

    return () => {
      canvas.current?.dispose();
    };
  }, []);

  return (
    <div className={cn(styles.logo, className)}>
      <canvas
        className={styles.logoCanvas}
        ref={canvasRef}
        onClick={() => canvas.current?.reset()}
      ></canvas>
    </div>
  );
};

interface ICanvas {
  /**
   * Reset the canvas (ie: a drawing)
   */
  reset(): void;

  /**
   * Stop any ongoing animations or side effects
   * Shouldn't delete the canvas
   */
  dispose(): void;
}

// erasible syntax only, no enums
const CELL_ALIVE = 1 as const;
const CELL_DEAD = 0 as const;

type Cell = typeof CELL_ALIVE | typeof CELL_DEAD;

const MARGIN = 20;
const UPSCALE = 6;

class Canvas implements ICanvas {
  private static readonly SIZE: number = 10;
  private static readonly MARGIN: number = 1;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: Cell[][];
  private generating: boolean = false;

  private oldFavicon: HTMLLinkElement | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.state = Canvas.createGrid();
    this.resizeCanvas();
    this.drawDefaultProfile();
  }

  /**
   * Create an empty grid of dead cells
   * @returns Grid of empty cells
   */
  static createGrid(): Cell[][] {
    return new Array(Canvas.SIZE)
      .fill(0)
      .map(() => new Array(Canvas.SIZE).fill(0).map(() => CELL_DEAD));
  }

  /**
   * Randomly generate a new avatar of random squares
   */
  static generateGrid() {
    const grid = Canvas.createGrid();

    // randomly generate a new avatar
    for (let y = Canvas.MARGIN; y < Canvas.SIZE - Canvas.MARGIN; y++) {
      for (let x = Canvas.MARGIN; x < Canvas.SIZE / 2; x++) {
        const cell = Math.random() > 0.5 ? CELL_ALIVE : CELL_DEAD;
        grid[y][x] = cell;
        grid[y][Canvas.SIZE - x - 1] = cell;
      }
    }

    return grid;
  }

  drawDefaultProfile() {
    this.state = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ] as Cell[][];

    this.draw();
  }
  /**
   * Resize the canvas to its container size
   */
  private resizeCanvas() {
    const container = this.canvas.parentElement;
    if (!container) {
      return;
    }
    this.canvas.width = container.offsetWidth * UPSCALE;
    this.canvas.height = container.offsetWidth * UPSCALE;
    this.canvas.style.width = `${container.offsetWidth}px`;
    this.canvas.style.height = `${container.offsetHeight}px`;
  }

  static cellToColor(cell: Cell) {
    if (cell === CELL_ALIVE) {
      return "#fd8978";
    }

    return "#710b2c";
  }

  /**
   * Draw the state to the canvas
   */
  private draw(margin: number = MARGIN) {
    // clear the scene
    this.ctx.fillStyle = Canvas.cellToColor(CELL_DEAD);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < Canvas.SIZE; y++) {
      for (let x = 0; x < Canvas.SIZE; x++) {
        const renderSize = (this.canvas.width - margin * 2) / Canvas.SIZE;
        const renderY = y * renderSize + margin;
        const renderX = x * renderSize + margin;

        // draw the cell
        const state = this.state[y][x];
        if (state !== CELL_DEAD) {
          this.ctx.fillStyle = Canvas.cellToColor(state);
          this.ctx.fillRect(renderX, renderY, renderSize, renderSize);
        }
      }
    }
  }

  // private updateFavicon() {
  //   let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

  //   // save a reference to the old favicon to restore it later
  //   if (link && !this.oldFavicon) {
  //     this.oldFavicon = link.cloneNode() as HTMLLinkElement;
  //   }

  //   // create a new favicon if necessary
  //   if (!link) {
  //     link = document.createElement("link");
  //     window.document.head.appendChild(link);
  //   }

  //   // set the appropriate attributes
  //   link.setAttribute("rel", "icon");
  //   link.setAttribute("type", "image/png");
  //   link.setAttribute("href", this.canvas.toDataURL("image/png"));
  // }

  async reset() {
    if (this.generating) {
      return;
    }

    this.generating = true;
    this.state = Canvas.generateGrid();
    this.draw();
    // this.updateFavicon();
    this.generating = false;
  }

  dispose() {
    // if the previous favicon is in memory, remove the new one & add back a clone
    if (this.oldFavicon && typeof window !== "undefined") {
      document.querySelector("link[rel~='icon']")?.remove();
      document.head.appendChild(this.oldFavicon.cloneNode());
    }
  }
}
