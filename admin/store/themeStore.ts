import { create } from "zustand";

interface ThemeStore {
  sidebarCollapsed: boolean;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleMobile: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  sidebarCollapsed: false,
  mobileOpen: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleMobile: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
  setMobileOpen: (open) => set({ mobileOpen: open }),
}));
