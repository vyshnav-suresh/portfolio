import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    size: {
      display: "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
      h1: "text-3xl md:text-4xl lg:text-5xl",
      h2: "text-2xl md:text-3xl lg:text-4xl",
      h3: "text-xl md:text-2xl lg:text-3xl",
      h4: "text-lg md:text-xl lg:text-2xl",
      h5: "text-base md:text-lg lg:text-xl",
      h6: "text-sm md:text-base lg:text-lg",
    },
    variant: {
      default: "",
      gradient: "bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500",
      muted: "text-muted-foreground",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center mx-auto",
      right: "text-right ml-auto",
    },
  },
  defaultVariants: {
    size: "h2",
    variant: "default",
    weight: "bold",
    align: "left",
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = "h2",
      className,
      size,
      variant,
      weight,
      align,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({ size, variant, weight, align, className })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading };

// Usage Examples:
// <Heading as="h1" size="display" variant="gradient">Display Heading</Heading>
// <Heading as="h2" size="h2">Section Title</Heading>
// <Heading as="h3" size="h3" variant="muted">Subsection Title</Heading>
