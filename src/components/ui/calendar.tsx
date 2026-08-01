"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center items-center h-9 relative",
        caption_label: "text-md font-semibold text-primary",
        nav: "flex items-center gap-1 absolute inset-x-0 justify-between px-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "size-7 p-0 text-tertiary",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "size-7 p-0 text-tertiary",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-tertiary w-9 font-normal text-xs",
        week: "flex w-full mt-1",
        day: "size-9 text-center p-0 relative",
        day_button: cn(
          "size-9 rounded-md p-0 font-normal text-md text-primary transition-colors",
          "hover:bg-surface-raised focus-visible:outline-none focus-visible:shadow-focus",
        ),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected:
          "[&>button]:bg-accent [&>button]:text-white [&>button]:hover:bg-accent-hover",
        today: "[&>button]:border [&>button]:border-accent",
        outside: "[&>button]:text-disabled",
        disabled: "[&>button]:text-disabled [&>button]:opacity-45 [&>button]:pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
