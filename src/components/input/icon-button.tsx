import React from 'react';

type IconButtonProps = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`${
          className ?? ''
        } inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-2 transition hover:bg-slate-100/[0.2]`}
      >
        {children}
      </div>
    );
  },
);
IconButton.displayName = 'IconButton';

export default IconButton;
