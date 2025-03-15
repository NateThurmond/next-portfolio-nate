const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'NateThurmond'; // Your GitHub username
const REPO_NAMES = [
    "SuperShop",
    "MechDesign",
    "MechDesign-php",
    "MechMarkup",
    "RemoteView",
    "EnphasePyGraph",
    // "next-portfolio", // This project - may add later
];
const GITHUB_API_BASE = "https://api.github.com/repos";

/**
 * Fetch GitHub project details for specified repositories.
 * Uses auth token if available (for dev use).
 */
export async function fetchGitHubProjects() {
  const headers: Record<string, string> = {};

  // Use auth token for dev work (higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const repoRequests = REPO_NAMES.map(async (repo) => {
      const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_USERNAME}/${repo}`, { headers });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${repo}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        name: data.name,
        description: data.description || "No description available.",
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language || "Unknown",
      };
    });

    const projects = await Promise.all(repoRequests);
    return projects;
  } catch (error) {
    console.error("GitHub API error:", error);
    // TO-DO: Fallback to static project json that are periodically updated from dev workflow
    return null;
  }
}
