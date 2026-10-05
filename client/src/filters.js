// Each filter has a label for the UI and a test for which todos it shows
export const FILTERS = {
  all: { label: "All tasks", test: () => true },
  active: { label: "Active", test: (t) => !t.completed },
  done: { label: "Completed", test: (t) => t.completed },
};
