"use client";

// ** react
import { ReactNode } from "react";

// ** theme
import ThemeRegistry from "@/theme/ThemeRegistry";
import EmotionRegistry from "@/theme/EmotionRegistry";

// ** context
import SettingsProvider from "@/context/SettingsContext";
import ComponentProvider from "@/context/ComponentContext";

// ** models
import { PaletteMode } from "@/models/enums";

type RegistryProps = {
  children: ReactNode;
  themeMode: PaletteMode;
  adminNavigationOpen?: boolean;
};

export default function Registry({
  children,
  themeMode,
  adminNavigationOpen = true,
}: RegistryProps) {
  return (
    <SettingsProvider
      initialThemeMode={themeMode}
      initialAdminNavigationOpen={adminNavigationOpen}
    >
      <ComponentProvider>
        <EmotionRegistry>
          <ThemeRegistry>{children}</ThemeRegistry>
        </EmotionRegistry>
      </ComponentProvider>
    </SettingsProvider>
  );
}
