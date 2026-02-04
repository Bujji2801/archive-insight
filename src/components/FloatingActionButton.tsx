import { Brain } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
  className?: string;
}

const FloatingActionButton = ({ onClick, className }: FloatingActionButtonProps) => {
  return (
    <Button
      variant="accent"
      size="icon"
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-sentinel-xl animate-pulse-subtle z-50",
        "lg:hidden", // Only show on mobile/tablet
        className
      )}
    >
      <Brain className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
