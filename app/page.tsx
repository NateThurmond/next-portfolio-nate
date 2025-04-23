"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import InteractiveHeading from "./components/InteractiveHeading";
import Header from "./components/Header";
import ProjectTiles from "./components/ProjectTiles";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [projectReady, setProjectReady] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/projects');
      const myProjects = await res.json();
      setProjects(myProjects);
      setProjectReady('Projects Ready');
    })();
  }, []); // Similar to componentDidMount, only fire once

  // Keeping as an example of how to use useEffect (componentDidUpdate)
  useEffect(() => {
    console.log('setProjectReady has been updated:', projectReady);
  }, [projectReady]); // Listen for changes to state vars

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-6xl mx-auto">
        <Header />
        <InteractiveHeading headingText="Nathan Thurmond Project Repositories" withLink="/projects"
          onHeadingClick={(e) => { console.log('interactive heading clicked', e); }} />
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <p className="inline mx-2">Built using</p>
            <Image
              className="dark:invert inline mx-2"
              src="/next.svg"
              alt="Next.js logo"
              width={60}
              height={38}
              priority
            />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="tbdLoadProjectSitePotentially"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="http://www.linkedin.com/in/nathanthurmond"
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect
          </a>
        </div>
        <ProjectTiles projects={projects}/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/NateThurmond/next-portfolio-nt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/gear.svg"
            alt="File icon"
            width={25}
            height={25}
          />
          Stack
        </a>
        <a
          className="flex items-center gap-2"
          href="https://www.facebook.com/nathan.thurmond.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/logo-n.svg"
            alt="Meet Me"
            width={18}
            height={18}
          />
          →
        </a>
      </footer>
    </div>
  );
}
