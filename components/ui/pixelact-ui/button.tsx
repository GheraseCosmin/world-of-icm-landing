import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button";
import "@/components/ui/pixelact-ui/styles/styles.css";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import "./button.css";

const pixelButtonVariants = cva(
  "pixel__button pixel-font cursor-pointer rounded-none w-fit items-center justify-center whitespace-nowrap text-sm transition-colors transition-all duration-100",
  {
    variants: {
      variant: {
        default: "pixel-default__button box-shadow-margin",
        secondary: "pixel-secondary__button box-shadow-margin",
        warning: "pixel-warning__button box-shadow-margin",
        success: "pixel-success__button box-shadow-margin",
        destructive: "pixel-destructive__button box-shadow-margin",
        link: "pixel-link__button bg-transparent text-link underline-offset-4 underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PixelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pixelButtonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  React.ComponentRef<typeof ShadcnButton>,
  PixelButtonProps
>(({ className, variant, ...props }, ref) => {
  // Map pixelact variants to shadcn variants
  const getShadcnVariant = (pixelVariant: string | null | undefined) => {
    switch (pixelVariant) {
      case "warning":
      case "success":
        return "default"; // Map custom variants to default
      case "link":
        return "link";
      case "secondary":
        return "secondary";
      case "destructive":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <ShadcnButton
      className={cn(
        buttonVariants({ variant: getShadcnVariant(variant) }),
        pixelButtonVariants({ variant }),
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "PixelButton";

export { Button };
