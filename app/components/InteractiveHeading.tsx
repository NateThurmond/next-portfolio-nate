"use client";

import "../styles/animations.css";
import Link from "next/link";
import { twMerge } from 'tailwind-merge';

// Define the expected props
type InteractiveHeadingProps = {
    headingText?: string; // Optional string prop
    onHeadingClick?: (event: React.MouseEvent<HTMLHeadingElement>) => void; // Function prop (optional)
    withLink?: string; // Optional boolean prop
    classAdditional?: string; // Optional addl styling for h1
};

export default function InteractiveHeading({
  headingText,
  onHeadingClick,
  withLink,
  classAdditional = ''
}: InteractiveHeadingProps) {

  const baseHeaderClass = "hover-drop-wrapper cursor-pointer [text-shadow:1px_1px_0px_white] hover:tracking-wide";

  const Header = (
    <h1 className={twMerge(baseHeaderClass, classAdditional)} onClick={onHeadingClick}>
      <span className="hover-drop-inner">
        {headingText || ""}
      </span>
    </h1>
  );

  return withLink ? <Link href={withLink} target="_blank">{Header}</Link> : Header;
}