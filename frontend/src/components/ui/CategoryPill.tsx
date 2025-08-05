import React from "react";
import { getCategoryColors } from "../../utils/categoryColors";
import { twMerge } from "tailwind-merge";

export default function CategoryPill({ category, disabled, selected = false }) {
  const disabledColor =
    "opacity-50 bg-light-primary/10 dark:bg-dark-primary/10 dark:text-dark-primary/50 cursor-not-allowed";

  const [defaultColor, selectedColor] = getCategoryColors(category);

  const getSelectedColor = (selected) => {
    return selected ? selectedColor : defaultColor;
  };

  return (
    <span
      className={twMerge(
        "cursor-pointer overflow-hidden truncate whitespace-nowrap rounded-3xl px-3 py-1 text-xs font-medium text-light-primary/80 dark:text-dark-primary/80",
        disabled ? disabledColor : getSelectedColor(selected)
      )}
    >
      {category}
    </span>
  );
}
