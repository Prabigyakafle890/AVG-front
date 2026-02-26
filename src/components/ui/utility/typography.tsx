// WIP component. Will flesh out more as we develop

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('m-0 self-center p-0', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      xs: 'text-xs',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    colour: {
      default: 'text-neutral-900 dark:text-neutral-100',
      muted: 'text-muted-foreground dark:text-muted-foreground',
      accent: 'text-accent dark:text-accent-foreground',
      inverted: 'text-background dark:text-foreground',
      grey: '!text-neutral-700 !dark:text-neutral-700',
    },
  },
  defaultVariants: {
    variant: 'p',
    size: 'default',
    colour: 'default',
  },
});

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  children: React.ReactNode;
}

const Typography = ({
  variant,
  size,
  colour,
  className,
  children,
  ...rest
}: TypographyProps) => {
  let HeadingComponent: React.ElementType = 'div';

  switch (variant) {
    case 'h1':
      HeadingComponent = 'h1';
      break;
    case 'h2':
      HeadingComponent = 'h2';
      break;
    case 'h3':
      HeadingComponent = 'h3';
      break;
    case 'h4':
      HeadingComponent = 'h4';
      break;
    case 'p':
      HeadingComponent = 'p';
      break;
    case 'code':
      HeadingComponent = 'code';
      break;
  }

  return (
    <HeadingComponent
      className={cn(typographyVariants({ variant, size, className, colour }))}
      {...rest}
    >
      {children}
    </HeadingComponent>
  );
};

export { Typography, typographyVariants as buttonVariants };
