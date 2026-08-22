"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  signupSchema,
  type SignupFormValues,
} from "@/lib/validation/auth";

type SignupResponse = {
  success: boolean;
  message?: string;
};

export function SignupForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post<SignupResponse>(
        "/api/auth/signup",
        {
          email: data.email,
          passwordHash: data.password,
        },
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ?? "Unable to create account",
        );
      }

      toast.success("Account created successfully", {
        description: "You can now sign in to your account.",
      });

      form.reset();

      router.replace("/login");
    } catch (error) {
      const axiosError = error as AxiosError<SignupResponse>;

      const message =
        axiosError.response?.data?.message ??
        (error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again.");

      toast.error("Sign up failed", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Start turning long videos into searchable knowledge.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
     
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-email">
                Email
              </FieldLabel>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="h-11 rounded-xl pl-10"
                />
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

     
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-password">
                Password
              </FieldLabel>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="h-11 rounded-xl pl-10 pr-10"
                />

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

      
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-confirm-password">
                Confirm password
              </FieldLabel>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="signup-confirm-password"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  aria-invalid={fieldState.invalid}
                  className="h-11 rounded-xl pl-10 pr-10"
                />

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

    
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}