export type Defined<T, K extends keyof T> = Omit<T, K> & {
  [key in K]: NonNullable<T[K]>;
};

export type Loose<T, K extends keyof T> = Omit<T, K> & {
  [key in K]?: T[K];
};
