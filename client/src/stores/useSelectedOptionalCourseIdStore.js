import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSelectedOptionalCourseIdStore = create(
  persist(
    (set) => ({
      selectedOptionalCourseIds: [],

      setSelectedOptionalCourseIds: (ids) =>
        set({ selectedOptionalCourseIds: Array.from(new Set(ids)) }),

      toggleOptionalCourse: (courseId) =>
        set((state) => {
          const setIds = new Set(state.selectedOptionalCourseIds);
          if (setIds.has(courseId)) setIds.delete(courseId);
          else setIds.add(courseId);
          return { selectedOptionalCourseIds: Array.from(setIds) };
        }),

      resetSelectedOptionalCourses: () =>
        set({ selectedOptionalCourseIds: [] }),
    }),
    {
      name: "selectedOptionalCourses",
      partialize: (state) => ({
        selectedOptionalCourseIds: state.selectedOptionalCourseIds,
      }),
    },
  ),
);
