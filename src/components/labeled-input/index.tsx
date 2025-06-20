"use client";

import {
  IconButton,
  Input,
  RiCheckboxCircleIcon,
  RiCircleIcon,
  RiEyeCloseIcon,
  RiEyeIcon,
  Text,
  View,
  type InputProps as InputPropsRoot,
} from "natmfat";
import { cn } from "natmfat/lib/cn";
import React, { useCallback, useState } from "react";
import { omit } from "../../utils/omit";
import { AnimateHeight } from "../animate-height";

type BaseLabeledInputProps = InputPropsRoot & {
  /**
   * Input label to appear before the input
   */
  label: string;

  /**
   * Input form name
   */
  name: string;

  /**
   * Error message if form input is invalid
   */
  errors?: string[];

  errorId: string;
};

type LabeledInputPasswordProps = Omit<BaseLabeledInputProps, "type"> & {
  type: "password";
  requirements?: Array<{
    text: string;
    test: (value: string) => boolean;
  }>;
};

type LabeledInputAnyProps = BaseLabeledInputProps;

type LabeledInputProps = LabeledInputPasswordProps | LabeledInputAnyProps;

export const LabeledInput = ({ ...props }: LabeledInputProps) => {
  return (
    <View className="gap-1">
      <Text color="dimmer" asChild>
        <label htmlFor={props.name} id={getLabelId(props.name)}>
          {props.label}
        </label>
      </Text>
      {props.type === "password" ? (
        <LabeledInputPassword {...props} type="password" />
      ) : (
        <LabeledInputAny {...props} />
      )}
    </View>
  );
};

const LabeledInputErrors: React.FC<
  Pick<LabeledInputAnyProps, "errors" | "errorId">
> = ({ errors, errorId }) => {
  const error = getFirstError(errors);

  return (
    <AnimateHeight expand={!!errors} childrenHash={error}>
      <Text className="text-red-default" id={errorId} multiline>
        {error}
      </Text>
    </AnimateHeight>
  );
};

const LabeledInputAny: React.FC<LabeledInputAnyProps> = (props) => {
  return (
    <>
      <Input {...transformInputProps(props)} />
      <LabeledInputErrors {...props} />
    </>
  );
};

const LabeledInputPassword: React.FC<LabeledInputPasswordProps> = ({
  requirements = [],
  onClick,
  onChange,
  className,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [expand, setExpand] = useState(false);
  const [reveal, setReveal] = useState(false);

  return (
    <>
      <View className="relative">
        <Input
          {...transformInputProps({
            ...props,
            className: cn(className, "pr-8"),
          })}
          type={reveal ? "text" : "password"}
          placeholder="••••••••"
          onClick={useCallback(
            (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
              if (onClick) {
                onClick(e);
              }
              setExpand(true);
            },
            [onClick],
          )}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
            setValue(e.target.value);
          }}
        />
        <IconButton
          alt="Show Password"
          className="absolute top-1/2 -translate-y-1/2 right-1"
          onClick={useCallback(
            () => setReveal((prevReveal) => !prevReveal),
            [setReveal],
          )}
          type="button"
        >
          {reveal ? <RiEyeIcon /> : <RiEyeCloseIcon />}
        </IconButton>
      </View>
      <LabeledInputErrors {...props} />
      {requirements.length > 0 ? (
        <AnimateHeight expand={expand}>
          <View className="py-2 text-foreground-dimmest">
            {requirements.map(({ text, test }) => (
              <RequirementView key={text} text={text} fulfilled={test(value)} />
            ))}
          </View>
        </AnimateHeight>
      ) : null}
    </>
  );
};

export const RequirementView = ({
  text,
  fulfilled,
}: {
  text: string;
  fulfilled?: boolean;
}) => {
  return (
    <View
      className={cn(
        "flex-row items-center gap-2",
        fulfilled && "text-foreground-default",
      )}
    >
      {fulfilled ? <RiCheckboxCircleIcon /> : <RiCircleIcon />}
      <Text>{text}</Text>
    </View>
  );
};

const getLabelId = (name: string) => `label-${name}`;

const transformInputProps = ({
  required,
  errors,
  errorId,
  className,
  ...props
}: LabeledInputAnyProps): InputPropsRoot => {
  return {
    ...omit(props, ["label"]),
    className: cn(className, errors && "border-red-default"),
    "aria-required": required,
    "aria-labelledby": getLabelId(props.name),
    required: undefined,
    ...(errors
      ? {
          "aria-invalid": "true",
          "aria-describedby": errorId,
        }
      : {}),
    id: props.name,
  };
};

const getFirstError = (error?: string[]) => (error ? error[0] : undefined);
