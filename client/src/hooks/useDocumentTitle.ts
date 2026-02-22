import { useEffect } from 'react';

/**
 * Custom hook to set document title dynamically
 * @param title - The title to set for the document
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
