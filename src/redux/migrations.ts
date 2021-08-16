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
}
