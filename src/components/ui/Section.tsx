import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const sectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "py-20 md:py-24 lg:py-28",
      hero: "min-h-screen flex items-center py-20 md:py-24 lg:py-28",
      narrow: "py-16 md:py-20 lg:py-24",
      wide: "py-24 md:py-28 lg:py-32",
      full: "min-h-screen py-0",
    },
    bg: {
      default: "bg-background",
      muted: "bg-muted/50",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary/50",
      accent: "bg-accent text-accent-foreground",
      gradient: "bg-gradient-to-br from-background via-background to-muted/50",
    },
  },
  defaultVariants: {
    variant: "default",
    bg: "default",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: React.ElementType;
  innerClassName?: string;
  container?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = "section",
      className,
      innerClassName,
      variant,
      bg,
      container = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(sectionVariants({ variant, bg, className }))}
        {...props}
      >
        {container ? (
          <div className={cn("container px-4 mx-auto", innerClassName)}>
            {children}
          </div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Section.displayName = "Section";

export { Section };

// Usage Example:
// <Section variant="hero" bg="gradient">
//   <h1>Hero Section</h1>
// </Section>
