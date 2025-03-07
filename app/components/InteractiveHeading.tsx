"use client";

import "../styles/animations.css";
import Link from "next/link";

// Define the expected props
type InteractiveHeadingProps = {
    headingText?: string; // Optional string prop
    onHeadingClick?: (event: React.MouseEvent<HTMLHeadingElement>) => void; // Function prop (optional)
    withLink?: string; // Optional boolean prop
};

export default function InteractiveHeading({ headingText, onHeadingClick, withLink }: InteractiveHeadingProps) {
  const Header = <h1 className="hover-drop cursor-pointer [text-shadow:1px_1px_0px_white] hover:tracking-wide"
      onClick={onHeadingClick}>{headingText || ''}</h1>;

  return withLink ? <Link href={withLink}>{Header}</Link> : Header;
}