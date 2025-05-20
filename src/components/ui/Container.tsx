import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const containerVariants = cva("w-full mx-auto px-4", {
  variants: {
    size: {
      sm: "max-w-3xl",
      default: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[90rem]",
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-4 sm:px-6",
      default: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "default",
    padding: "default",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  innerClassName?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = "div",
      className,
      innerClassName,
      size,
      padding,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding, className }))}
        {...props}
      >
        {innerClassName ? (
          <div className={cn(innerClassName)}>{children}</div>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Container.displayName = "Container";

export { Container };

// Usage Example:
// <Container size="lg" className="py-12">
//   <h1>Content</h1>
// </Container>
