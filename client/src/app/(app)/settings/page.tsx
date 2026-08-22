"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Languages,
  Lock,
  Monitor,
  Palette,
  Settings2,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function SettingItem({
  icon,
  title,
  description,
}: SettingItemProps) {
  function handleClick() {
    toast.info("Coming soon", {
      description:
        "This setting is currently under development.",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-4 sm:p-4"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 sm:size-11">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">{title}</p>

          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Coming soon
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-2 sm:p-3">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}

function SettingsIntro() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="flex flex-col items-center text-center">
      
        <div className="relative flex size-28 items-center justify-center">
       
          <div className="absolute inset-0 animate-ping rounded-full bg-red-500/10" />

      
          <div className="absolute inset-2 animate-[spin_4s_linear_infinite] rounded-full border border-red-500/20 border-t-red-500/70" />

   
          <div className="absolute inset-5 rounded-full bg-red-500/10 blur-xl" />

          <div className="relative flex size-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.18)]">
            <Wrench className="size-7 animate-pulse text-red-500" />
          </div>
        </div>

      
        <div className="mt-7 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            Under development
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Settings are being prepared
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">
            We're building a better way to manage your AI Video
            Analyzer workspace.
          </p>
        </div>

     
        <div className="mt-7 w-52 overflow-hidden rounded-full bg-muted">
          <div className="h-1 w-1/2 animate-[settings-progress_2s_ease-in-out_infinite] rounded-full bg-red-500" />
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Preparing your workspace...
        </p>

        <style jsx>{`
          @keyframes settings-progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [showIntro, setShowIntro] = useState(true);

  const { data: user, isLoading } = useCurrentUser();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  if (showIntro) {
    return <SettingsIntro />;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
  
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:size-11">
            <Settings2 className="size-5 text-primary" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
              Workspace settings
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Settings
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage your Clario workspace and preferences.
          Some settings are currently being developed.
        </p>
      </div>

     
      <SettingsSection
        title="Account"
        description="Your account information and profile preferences."
      >
        <div className="flex flex-col gap-4 rounded-xl p-3 sm:flex-row sm:items-center sm:p-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
            <User className="size-5 text-muted-foreground" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Email address</p>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {isLoading
                ? "Loading account..."
                : user?.email ?? "Unable to load account"}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full shrink-0 sm:w-auto"
            onClick={() =>
              toast.info("Coming soon", {
                description:
                  "Profile management is currently under development.",
              })
            }
          >
            Manage
          </Button>
        </div>
      </SettingsSection>

   
      <SettingsSection
        title="Appearance"
        description="Customize how Clario looks on your device."
      >
        <SettingItem
          icon={<Palette className="size-5 text-muted-foreground" />}
          title="Theme"
          description="Choose between light, dark, or system appearance."
        />

        <SettingItem
          icon={<Monitor className="size-5 text-muted-foreground" />}
          title="Interface preferences"
          description="Customize the layout and workspace experience."
        />
      </SettingsSection>

    
      <SettingsSection
        title="AI preferences"
        description="Control how AI-powered analysis and answers behave."
      >
        <SettingItem
          icon={<Sparkles className="size-5 text-muted-foreground" />}
          title="Response style"
          description="Choose how concise or detailed AI answers should be."
        />

        <SettingItem
          icon={<Languages className="size-5 text-muted-foreground" />}
          title="Language preferences"
          description="Configure preferred languages for transcripts and AI responses."
        />
      </SettingsSection>

   
      <SettingsSection
        title="Notifications"
        description="Control how you're informed about video processing."
      >
        <SettingItem
          icon={<Bell className="size-5 text-muted-foreground" />}
          title="Processing notifications"
          description="Get notified when video analysis is completed or fails."
        />
      </SettingsSection>

  
      <SettingsSection
        title="Security"
        description="Manage your account security and authentication."
      >
        <SettingItem
          icon={<Lock className="size-5 text-muted-foreground" />}
          title="Change password"
          description="Update your account password and security credentials."
        />
      </SettingsSection>
\
      <Card className="border-dashed">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Check className="size-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium">
              More settings are coming soon
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
              These controls are part of the product roadmap and
              will become available in future updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}