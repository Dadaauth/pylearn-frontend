import React from "react";
import Link from "next/link";
import { Code, Snippet } from "@nextui-org/react";

export function CustomH2({ children }:{ children: React.ReactNode }) {
    return <h2 className='my-4 text-xl font-bold text-[#3776AB]'>{children}</h2>
}

export function CustomP({ children }: { children: React.ReactNode }) {
    return <p className="text-small text-[#2B2D42] font-medium max-w-xl">{children}</p>
}

export function CustomUL({ children }: { children: React.ReactNode }) {
    return <ul className="mt-4 text-small text-[#2B2D42] font-medium max-w-xl list-disc list-inside">{children}</ul>
}

export const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isInternalLink = href.startsWith("/");
  
    if (isInternalLink) {
      return (
        <Link href={href} className="hover:underline">{children}</Link>
      );
    }
  
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className="hover:underline">
        {children}
      </Link>
    );
};

export function CustomPRE({ children }: { children: React.ReactNode }) {
    const content = React.Children.map(children, (child: React.ReactNode) => {
        if (typeof child === "string") {
          return child;
        }
        if (React.isValidElement(child) && typeof child.props.children === "string") {
          return child.props.children;
        }
    })?.join("") || "";

    // Split the content by newlines
    const lines = content.split("\n");
    // Remove trailing empty string in array
    lines.pop();
    return <Snippet>
        {lines.map((line: string, index: number) => (
            <span key={index}>
            {line}
            </span>
        ))}
    </Snippet>
}

export const CustomCODE = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <code {...props}>{props.children}</code>;
};
