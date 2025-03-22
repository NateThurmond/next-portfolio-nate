import { useEffect } from "react";

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
            <a
              href={project.url}
              className="text-gray-700 text-center text-lg font-bold transition-transform duration-200 hover:scale-105 block"
            >
              {project.name}
            </a>
            <div className="w-80 h-60 bg-gray-900 flex items-center justify-center mt-4">
              <img src={project.repoDemoGifAbsolute} alt="Demo" className="object-contain max-w-full max-h-full block" />
            </div>
          </div>
        ))}
      </section>
    );
  }
