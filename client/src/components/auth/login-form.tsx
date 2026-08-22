"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validation/auth";

type LoginResponse = {
  success: boolean;
  message?: string;
};

export function LoginForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post<LoginResponse>(
        "/api/auth/logIn",
        {
          identifier: data.email,
          passwordHash: data.password,
        },
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ?? "Unable to sign in",
        );
      }

      toast.success("Welcome back!", {
        description: "You have been signed in successfully.",
      });

      form.reset();

      router.replace("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<LoginResponse>;

      const message =
        axiosError.response?.data?.message ??
        (error instanceof Error
          ? error.message
          : "Unable to sign in. Please try again.");

      toast.error("Sign in failed", {
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
          Welcome back
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Sign in to continue analyzing your videos.
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
              <FieldLabel htmlFor="login-email">
                Email
              </FieldLabel>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="login-email"
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
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="login-password">
                  Password
                </FieldLabel>

                <button
                  type="button"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => {
                    toast.info("Password reset isn't available yet.");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  {...field}
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>

        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-3 text-muted-foreground">
            New to Clario?
          </span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}