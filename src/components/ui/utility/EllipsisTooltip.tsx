import * as React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ClassNameValue } from 'tailwind-merge';

type EllipsisTooltipProps = {
  text: string;
  className?: ClassNameValue;
};

export const EllipsisTooltip = ({ text, className }: EllipsisTooltipProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const [isEllipsized, setIsEllipsized] = React.useState(false);

  React.useLayoutEffect(() => {
    const checkEllipsized = () => {
      if (textRef.current && containerRef.current) {
        const textScrollWidth = textRef.current.scrollWidth;
        const containerClientWidth = containerRef.current.clientWidth;
        setIsEllipsized(textScrollWidth > containerClientWidth);
      }
    };

    requestAnimationFrame(checkEllipsized);
    window.addEventListener('resize', checkEllipsized);

    return () => {
      window.removeEventListener('resize', checkEllipsized);
    };
  }, [text]);

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden">
      {isEllipsized ? (
        <Tooltip>
          <TooltipTrigger asChild className="w-full">
            <p ref={textRef} className={`truncate text-left ${className}`}>
              {text}
            </p>
          </TooltipTrigger>
          <TooltipContent>{text}</TooltipContent>
        </Tooltip>
      ) : (
        <p
          ref={textRef}
          className={`truncate text-left whitespace-nowrap ${className}`}
        >
          {text}
        </p>
      )}
    </div>
  );
};
