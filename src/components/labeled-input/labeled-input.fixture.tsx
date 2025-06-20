"use client";

import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Button, View } from "natmfat";
import { z } from "zod";
import { LabeledInput } from ".";
import { Wrapper } from "../../wrapper";

const schema = z.object({
  username: z
    .string({ message: "Email is a required field" })
    .email("Email must be a valid email"),
  password: z
    .string({ message: "Password is a required field" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(72, { message: "Password cannot exceed 72 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(password), {
      message: "Password must contain at least one special character",
    }),
});

export default () => {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <Wrapper className="w-full max-w-sm">
      <View className="gap-2" asChild>
        <form id={form.id} onSubmit={form.onSubmit}>
          <LabeledInput
            type="text"
            label="Email"
            placeholder="you@example.com"
            name={fields.username.name}
            errors={fields.username.errors}
            errorId={fields.username.errorId}
          />
          <LabeledInput
            type="password"
            label="Password"
            name={fields.password.name}
            errors={fields.password.errors}
            errorId={fields.password.errorId}
            requirements={[
              {
                text: "Uppercase letter",
                test: (value) => /[A-Z]/.test(value),
              },
              {
                text: "Lowercase letter",
                test: (value) => /[a-z]/.test(value),
              },
              {
                text: "Number",
                test: (value) => /[0-9]/.test(value),
              },
              {
                text: "Special character (e.g. !?<>@#$%)",
                test: (value) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(value),
              },
              {
                text: "8 characters or more",
                test: (value) => value.length >= 8,
              },
            ]}
          />
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
      </View>
    </Wrapper>
  );
};
