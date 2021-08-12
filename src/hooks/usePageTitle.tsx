import React from 'react'

/**
 * Effect that sets the title of the page to a specified string.
 * Really small utility hook that saves a few lines.
 */
export function usePageTitle(title: string) {
  React.useEffect(() => {
    document.title = title
  }, [title])
}
