import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, ElementType, JSX } from "react";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary-foreground",
      accent: "text-accent",
      success: "text-green-500",
      error: "text-destructive",
      warning: "text-amber-500",
      info: "text-blue-500",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    variant: "default",
    align: "left",
    leading: "normal",
  },
});

// Map `as` prop to corresponding HTML element types
type ElementTypeMap = {
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  div: HTMLDivElement;
  label: HTMLLabelElement;
  small: HTMLElement; // HTMLSmallElement is not widely used, so using HTMLElement
};

// Define props with generic type for the element
export interface TextProps<T extends ElementType = "p">
  extends HTMLAttributes<T>,
    VariantProps<typeof textVariants> {
  as?: T;
  truncate?: boolean;
}

const Text = forwardRef(
  function Text<T extends keyof ElementTypeMap>(
    {
      as: Component = "p" as T,
      className,
      size,
      weight,
      variant,
      align,
      leading,
      truncate = false,
      children,
      ...props
    }: TextProps<T>,
    ref: React.Ref<ElementTypeMap[T]>
  ) {
    const Comp = Component as ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(
          textVariants({ size, weight, variant, align, leading }),
          className,
          truncate && "truncate"
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
) as unknown as (<T extends keyof ElementTypeMap>(
  props: TextProps<T> & { ref?: React.Ref<ElementTypeMap[T]> }
) => JSX.Element) & { displayName?: string };

Text.displayName = "Text";

export { Text };

// Usage Examples:
// <Text>Default text</Text>
// <Text as="span" size="lg" weight="semibold" variant="accent">Highlighted text</Text>
// <Text variant="muted" align="center">Muted centered text</Text>
// <Text truncate>This text will be truncated with an ellipsis if it's too long</Text>