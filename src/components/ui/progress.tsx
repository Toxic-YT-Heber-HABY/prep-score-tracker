
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  value?: number;
}

/**
 * Enhanced Progress component with color indicators based on value
 * Shows different colors depending on the progress value
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, indicatorClassName, ...props }, ref) => {
  // Determine the indicator color based on the value
  const getProgressColor = () => {
    if (!indicatorClassName) {
      // Default color logic if no custom className is provided
      if (value < 60) return "bg-red-500 dark:bg-red-600";
      if (value < 70) return "bg-amber-500 dark:bg-amber-600";
      if (value < 85) return "bg-education-primary dark:bg-education-secondary";
      return "bg-green-500 dark:bg-green-600";
    }
    return indicatorClassName;
  };

  // Animation ref for smooth transitions
  const progressRef = React.useRef<HTMLDivElement>(null);
  
  // Effect to animate progress changes
  React.useEffect(() => {
    if (progressRef.current) {
      // Add a transition if not already present
      const currentTransition = progressRef.current.style.transition;
      if (!currentTransition) {
        progressRef.current.style.transition = "transform 0.5s ease-in-out";
      }
    }
  }, []);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        ref={progressRef}
        className={cn(
          "h-full w-full flex-1 transition-all",
          getProgressColor()
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
