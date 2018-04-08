export const ACTION_TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export function toggleSidebar(isOpen: boolean) {
  return {
    type: ACTION_TOGGLE_SIDEBAR,
    isOpen,
  };
}
