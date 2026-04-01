import { create } from "zustand";
import { useUserGradesStore } from "./useUserGradesStore";
import { useSelectedOptionalCourseIdStore } from "./useSelectedOptionalCourseIdStore";

export const usePlannerUIStore = create((set) => ({
  selectedNode: null,
  selectedNodeId: null,
  showCoursePicker: false,

  setSelectedNode: (node) => set({ selectedNode: node }),
  setSelectedNodeId: (id) =>
    set((state) => ({
      selectedNodeId: state.selectedNodeId === id ? null : id,
    })),
  setShowCoursePicker: (newState) => {
    set((state) => ({
      showCoursePicker:
        newState !== undefined ? newState : !state.showCoursePicker,
    }));
  },
  closePanels: () =>
    set({ selectedNode: null, selectedNodeId: null, showCoursePicker: false }),
  resetUI: () => {
    useUserGradesStore.getState().resetGrades();
    useSelectedOptionalCourseIdStore.getState().resetSelectedOptionalCourses();
    set({
      selectedNode: null,
      selectedNodeId: null,
      showCoursePicker: false,
    });
  },
}));
