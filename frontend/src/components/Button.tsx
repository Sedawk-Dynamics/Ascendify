import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export function PrimaryButton({ children, className = "", href, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-8 py-3 rounded-lg text-white font-semibold gradient-primary hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo/30 cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function OutlineButton({ children, className = "", href, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border-2 border-cyan text-cyan hover:bg-cyan hover:text-white transition-all duration-300 cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
