import { create } from 'zustand';

interface AdminState {
  /**
   * Админский пароль. Хранится только в памяти: после перезагрузки страницы вводится заново.
   * Страница публичная (GitHub Pages), поэтому пароль нельзя класть ни в код, ни в localStorage.
   */
  adminPassword: string | null;
  setAdminPassword: (password: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  adminPassword: null,
  setAdminPassword: (password) => set({ adminPassword: password }),
  logout: () => set({ adminPassword: null }),
}));
