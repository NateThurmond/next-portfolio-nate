import { useEffect } from "react";

// Define the expected props, just an array of the projects
type ProjectTilesProps = {
  projects?: any[];
};

export default function ProjectTiles({projects}: ProjectTilesProps) {
    const tiles = [
      { title: "Project 1", link: "#" },
      { title: "Project 2", link: "#" },
      { title: "Project 3", link: "#" },
      { title: "Project 4", link: "#" },
      { title: "Project 5", link: "#" },
      { title: "Project 6", link: "#" },
    ];

    useEffect(() => {
      console.log('Projects available', projects);
    }, [projects]);

    return (
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8 w-full mx-auto">
        {projects && projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            className="text-gray-700 bg-gray-200 p-6 rounded-md shadow-md text-center text-lg font-bold transition-transform duration-200 hover:scale-105"
          >
            {project.name}
          </a>
        ))}
      </section>
    );
  }
