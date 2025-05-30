import { useEffect, useState } from "react";
import InteractiveHeading from "../components/InteractiveHeading";
import ReactMarkdown from "react-markdown";

// Define the expected props, just an array of the projects
type ProjectTilesProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects?: any[];
};

export default function ProjectTiles({projects}: ProjectTilesProps) {
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

    // Specific to my situation, define your own as needed
    const priorityOrder = [
      "MechDesign",
      "SuperShop",
      "MechDesign-php",
      "MechMarkup",
      "RemoteView",
      "EnphasePyGraph",
    ]

    // List the projects out in such a way that they look okay for my specific repos
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function sortProjects(projects: any[]) {
      return [...projects].sort((a, b) => {
        const indexA = priorityOrder.indexOf(a.name);
        const indexB = priorityOrder.indexOf(b.name);

        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    }

    // Since we already show the project demo img, remove that here in the desc. popup
    function standardizeReadme(readme: string) {
      // Match the first <img ...> tag (self-closing or not)
      const imgRegex = /<img\b[^>]*?>/i;
      const imgMatch = readme.match(imgRegex);

      if (!imgMatch) return readme;

      const [fullMatch] = imgMatch;
      const index = readme.indexOf(fullMatch);

      let before = readme.slice(0, index);
      let after = readme.slice(index + fullMatch.length);

      before = before.replace(/(^|\n)#{1,6} .*(\n[\s\S]*)?$/, '');

      // Add hr line if one is not present
      after = after.trim();
      after = (after.slice(0, 3) !== '---') ? `---\n${after}` : after;

      return [before.trim(), after].join("\n");
    }

    function handleExpandReadme(index: number) {
      if (selectedTileIndex === index) {
        handleCloseReadme();
        return;
      }
      const timeout = setTimeout(() => setSelectedTileIndex(index), 300); // 300ms delay
      setHoverTimeout(timeout);
    }

    function handleCloseReadme() {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      setSelectedTileIndex(null);
    }

    useEffect(() => {
      console.log('Projects available', projects);
    }, [projects]);

    useEffect(() => {
      // Doc event listener function to close the readme popup when clicking outside of it
      function docClickList(event: MouseEvent) {
        const popup = document.getElementById('readMePopup');
        if (popup && !popup.contains(event.target as Node)) {
          setSelectedTileIndex(null);
        }
      }

      // Doc click event listener to close the readme popup on outside clicks
      document.addEventListener('click', docClickList);
      return () => {
        document.removeEventListener('click', docClickList);
      };
    }, []);

    return (
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8 w-full mx-auto">
        {projects && sortProjects(projects).map((project, index) => (
          <div
            key={index}
            className="p-6 rounded-md shadow-md flex flex-col items-center relative [background-color:rgba(30,30,30,0.95)]"
          >

            {/* Just a more stylized link with a drop effect */}
            <InteractiveHeading
              headingText={project.name}
              withLink={project.url}
              classAdditional={'text-xl [text-shadow:1px_1px_0px_white]'}
            />

            {/* Button to expand the readme content for the project */}
            <button
              className="readme-popup-close-button"
              onClick={() => handleExpandReadme(index)}
            >⛶
            </button>

            {/* This is the preview image/gif pulled from the project readme displayed as a thumbnail here */}
            <div className="w-full max-w-full h-60 bg-gray-900 flex items-center justify-center mt-4 overflow-hidden rounded">
              <img
                src={project.repoDemoGifAbsolute}
                alt="Demo"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Readme popup */}
            {selectedTileIndex === index && (
              <div
                id="readMePopup"
                className={`
                  unstyle-all absolute top-0 translate-y-[10%] z-999
                  p-4 rounded shadow-lg
                  ${selectedTileIndex === index ? 'readme-popup' : 'hidden'}
                `}
              >

                {/* A simple X button to close the readme */}
                <button
                  className="readme-popup-close-button"
                  onClick={() => handleCloseReadme()}
                >𐔧
                </button>
                <br/>

                {/* The actual Readme Content */}
                <ReactMarkdown>
                  {standardizeReadme(project.readme)}
                </ReactMarkdown>
              </div>
            )}

            {/* Languages used in project (top 3) */}
            <br />
            <p className="w-full max-w-full whitespace-nowrap overflow-hidden text-ellipsis text-center">
              {Object.entries(project.languages)
                .slice(0, 3)
                .map(([lang, perc]) => `${lang}: ${Math.round(perc as number)}%`)
                .join(' • ')
              }
            </p>
          </div>
        ))}
      </section>
    );
  }
