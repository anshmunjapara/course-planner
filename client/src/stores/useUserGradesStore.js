import { create } from "zustand";
import { persist } from "zustand/middleware";

const userGradesStorage = {
  getItem: (name) => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw);

      // already new zustand persist shape
      if (parsed && typeof parsed === "object" && "state" in parsed) {
        return parsed;
      }

      // old shape: { "CS110": 100, ... }
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const migrated = {
          state: { userGrades: parsed },
          version: 0,
        };

        // rewrite immediately in new format
        localStorage.setItem(name, JSON.stringify(migrated));
        return migrated;
      }

      return null;
    } catch {
      return null;
    }
  },

  setItem: (name, value) => {
    // write new format only
    localStorage.setItem(name, JSON.stringify(value));
  },

  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useUserGradesStore = create(
  persist(
    (set) => ({
      userGrades: {},
      setGrade: (courseId, grade) =>
        set((state) => ({
          userGrades: { ...state.userGrades, [courseId]: grade },
        })),
      resetGrades: () => set({ userGrades: {} }),
    }),
    {
      name: "userGrades",
      storage: userGradesStorage,
      partialize: (state) => ({ userGrades: state.userGrades }),
    },
  ),
);
