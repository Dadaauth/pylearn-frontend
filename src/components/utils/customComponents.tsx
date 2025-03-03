import React from "react";
import Link from "next/link";
import { Snippet } from "@heroui/react";
import { MDXComponents } from "mdx/types";


export const overrideComponents: MDXComponents = {
  h2: (props) => <CustomH2 {...props}>{props.children}</CustomH2>,
  p: (props) => <CustomP {...props}>{props.children}</CustomP>,
  ul: (props) => <CustomUL {...props}>{props.children}</CustomUL>,
  a: (props) => <CustomLink {...props} href={props.href || "#"}>{props.children}</CustomLink>,
  code: (props) => <CustomCODE {...props}>{props.children}</CustomCODE>,
  pre: (props) => <CustomPRE {...props}>{props.children}</CustomPRE>,
}



function CustomH2({ children }:{ children: React.ReactNode }) {
    return <h2 className='my-4 text-xl font-bold text-[#3776AB]'>{children}</h2>
}

function CustomP({ children }: { children: React.ReactNode }) {
    return <p className="text-small text-[#2B2D42] font-medium max-w-xl">{children}</p>
}

function CustomUL({ children }: { children: React.ReactNode }) {
    return <ul className="mt-4 text-small text-[#2B2D42] font-medium max-w-xl list-disc list-inside">{children}</ul>
}

const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
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

function CustomPRE({ children }: { children: React.ReactNode }) {
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

const CustomCODE = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return <code {...props}>{props.children}</code>;
};
