import React, { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Tree task`;
  }, [title]);
  return null;
};
