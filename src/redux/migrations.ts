export const migrations = {
  // Delete reader state
  278: (state: any) => {
    return {
      ...state,
      reader: undefined,
    }
  },
  // Add autoscroll delay
  279: (state: any) => {
    return {
      ...state,
      preferences: {
        ...state.preferences,
        autoscrollDelay: 10,
      },
    }
  },
  // Removed electric theme
  285: (state: any) => {
    if (state.preferences.themeId === 'electric') {
      return {
        ...state,
        preferences: {
          ...state.preferences,
          themeId: 'deepsea',
        },
      }
    } else {
      return state
    }
  },
}
