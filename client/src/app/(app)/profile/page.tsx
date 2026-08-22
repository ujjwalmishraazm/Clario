"use client";

import {
  BadgeCheck,
  CalendarDays,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  const initials =
    user?.email
      ?.split("@")[0]
      .slice(0, 2)
      .toUpperCase() ?? "CL";

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          ACCOUNT
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          View your Clario account information and profile details.
        </p>
      </div>

      {/* Profile card */}
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted text-xl font-semibold">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Clario account
              </p>

              <h2 className="mt-1 truncate text-xl font-semibold">
                {isLoading
                  ? "Loading..."
                  : user?.email?.split("@")[0] ?? "Account"}
              </h2>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {isLoading
                  ? "Loading account information..."
                  : user?.email ?? "Unable to load account"}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <BadgeCheck className="size-3.5" />
              Active
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Account information */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">
            Account information
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            Information associated with your Clario account.
          </p>
        </div>

        <Card>
          <CardContent className="divide-y divide-border p-0">
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <Mail className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Email address
                </p>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {isLoading
                    ? "Loading..."
                    : user?.email ?? "Unavailable"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <ShieldCheck className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Account security
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your account is protected by Clario authentication.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() =>
                  toast.info("Coming soon", {
                    description:
                      "Security management is currently under development.",
                  })
                }
              >
                Manage
              </Button>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                <CalendarDays className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Account activity
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Account activity and history management.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() =>
                  toast.info("Coming soon", {
                    description:
                      "Account activity is currently under development.",
                  })
                }
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Profile preferences */}
      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">
            Profile preferences
          </h2>

          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            Personalize how your Clario account works.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4 text-primary" />
              Personal information
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">
                Profile details
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add and manage your name, avatar, and other profile
                information.
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() =>
                toast.info("Coming soon", {
                  description:
                    "Profile customization is currently under development.",
                })
              }
            >
              Edit profile
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <Card className="border-dashed">
        <CardContent className="p-5 sm:p-6">
          <p className="text-sm font-medium">
            More profile features are coming soon
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
            Profile customization, security controls, and account
            activity tools will be added in future Clario updates.
          </p>
        </CardContent>
      </Card>

      {isError && (
        <p className="text-center text-xs text-muted-foreground">
          Some account information could not be loaded.
        </p>
      )}
    </div>
  );
}