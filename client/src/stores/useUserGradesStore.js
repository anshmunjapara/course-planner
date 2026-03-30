import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      partialize: (state) => ({ userGrades: state.userGrades }),
    },
  ),
);
