import React from "react";
import { Brain } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
  className?: string;
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ onClick, className }, ref) => {
    return (
      <Button
        ref={ref}
        variant="accent"
        size="icon"
        onClick={onClick}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-sentinel-xl animate-pulse-subtle z-50",
          "lg:hidden",
          className
        )}
      >
        <Brain className="h-6 w-6" />
      </Button>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export default FloatingActionButton;
