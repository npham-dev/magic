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
  password: z.string({ message: "Password is a required field" }),
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
    <Wrapper className="max-w-sm w-full">
      <View className="gap-2 w-full" asChild>
        <form id={form.id} onSubmit={form.onSubmit}>
          <LabeledInput
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
          />
          <Button color="primary" type="submit">
            Log In
          </Button>
        </form>
      </View>
    </Wrapper>
  );
};
