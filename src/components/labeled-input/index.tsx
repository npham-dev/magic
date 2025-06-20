"use client";

import {
  IconButton,
  Input,
  RiEyeCloseIcon,
  RiEyeIcon,
  Text,
  View,
  type InputProps,
} from "natmfat";
import { cn } from "natmfat/lib/cn";
import React, { useState } from "react";
import { AnimateHeight } from "../animate-height";

export type LabeledInputProps = InputProps & {
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

const inputProps = ({
  required,
  errors,
  errorId,
  className,
  ...props
}: Omit<LabeledInputProps, "label">): InputProps => {
  return {
    ...props,
    className: cn(className, errors && "border-red-default"),
    "aria-required": required,
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

export const LabeledInput = (props: LabeledInputProps) => {
  const error = getFirstError(props.errors);

  return (
    <View className="gap-1">
      <Text color="dimmer" asChild>
        <label htmlFor={props.name}>{props.label}</label>
      </Text>

      {props.type === "password" ? (
        <PasswordInput {...props} />
      ) : (
        <TextInput {...props} />
      )}

      <AnimateHeight expand={!!props.errors} childrenHash={error}>
        <Text className="text-red-default" id={props.errorId} multiline>
          {error}
        </Text>
      </AnimateHeight>
    </View>
  );
};

const TextInput: React.FC<LabeledInputProps> = (props) => {
  return <Input {...inputProps(props)} />;
};

const PasswordInput: React.FC<LabeledInputProps> = ({
  className,
  ...props
}) => {
  const [show, setShow] = useState(false);

  return (
    <View className="relative">
      <Input
        {...inputProps({ ...props, className: cn(className, "pr-8") })}
        type={show ? "text" : "password"}
        placeholder="••••••••"
      />
      <IconButton
        alt="Show Password"
        className="absolute top-1/2 -translate-y-1/2 right-1"
        onClick={() => setShow((prevShow) => !prevShow)}
        type="button"
      >
        {show ? <RiEyeIcon /> : <RiEyeCloseIcon />}
      </IconButton>
    </View>
  );
};
