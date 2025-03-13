export default function ProjectTiles() {
    const tiles = [
      { title: "Project 1", link: "#" },
      { title: "Project 2", link: "#" },
      { title: "Project 3", link: "#" },
      { title: "Project 4", link: "#" },
      { title: "Project 5", link: "#" },
      { title: "Project 6", link: "#" },
    ];

    return (
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-8 w-full mx-auto">
        {tiles.map((tile, index) => (
          <a
            key={index}
            href={tile.link}
            className="text-gray-700 bg-gray-200 p-6 rounded-md shadow-md text-center text-lg font-bold transition-transform duration-200 hover:scale-105"
          >
            {tile.title}
          </a>
        ))}
      </section>
    );
  }
