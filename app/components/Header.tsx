"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate shrinking effect (caps at 50px height)
  const maxHeaderSize = 65; // As tall as it gets
  const headerSize = Math.max(50, maxHeaderSize - scrollY * 0.5);
  const opacity = Math.max(0, 1 - scrollY / (maxHeaderSize * 2)); // Fades out completely after 300px

  return (
    <header
      className="fixed top-0 left-0 w-full px-8 py-4 bg-white shadow-md transition-all duration-200"
      style={{ height: `${headerSize}px`, opacity }}
    >
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-700">Nathan Thurmond</h1>
        <nav className="space-x-4">
          <a href="https://github.com/NateThurmond" className="text-gray-700 hover:text-black">GitHub</a>
          <a href="/Nathan_Resume_Short.pdf" download target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">Resume</a>
        </nav>
      </div>
    </header>
  );
}
