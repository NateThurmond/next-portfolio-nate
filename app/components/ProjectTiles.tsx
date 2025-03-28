import { useEffect } from "react";
import InteractiveHeading from "../components/InteractiveHeading";

// Define the expected props, just an array of the projects
type ProjectTilesProps = {
  projects?: any[];
};

export default function ProjectTiles({projects}: ProjectTilesProps) {
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

    useEffect(() => {
      console.log('Projects available', projects);
    }, [projects]);

    return (
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8 w-full mx-auto">
        {projects && sortProjects(projects).map((project, index) => (
          <div key={index} className="bg-gray-200 p-6 rounded-md shadow-md flex flex-col items-center">
            <InteractiveHeading
              headingText={project.name}
              withLink={project.url}
              classAdditional={'text-black text-xl [text-shadow:1px_1px_0px_black]'}
            />
            <div className="w-80 h-60 bg-gray-900 flex items-center justify-center mt-4">
              <img src={project.repoDemoGifAbsolute} alt="Demo" className="object-contain max-w-full max-h-full block" />
            </div>
            <br />
            <p className="text-black whitespace-nowrap overflow-hidden text-ellipsis">
              {Object.entries(project.languages)
                .slice(0, 3)
                .map(([lang, perc]) => `${lang}: ${Math.round(perc as number)}%`)
                .join(' • ')}
            </p>
          </div>
        ))}
      </section>
    );
  }
