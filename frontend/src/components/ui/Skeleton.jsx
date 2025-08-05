// Custom Skeleton Component (replace your shadcn skeleton)
import React from "react";

// Utility function to merge classNames (replaces cn from shadcn)
const mergeClassNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

function Skeleton({ className, ...props }) {
  return (
    <div
      className={mergeClassNames(
        "bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md",
        className
      )}
      {...props}
    />
  );
}
export default Skeleton;
