import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.devsecrets' });
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'NateThurmond';
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

// Path to static JSON fallback file
const PROJECTS_JSON_PATH = path.resolve(process.cwd(), 'data', 'projects.json');

export async function fetchGitHubProjects() {
  const headers: Record<string, string> = {};
  // Used to extract demo use gifs from project readmes
  const repoDemoGifRegMatch = /<img\s+[^>]*src=["']([^"']+)["']/i;

  // Use auth token for dev work (higher rate limits)
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const bytesToPercentages = (record: Record<string, number>): Record<string, number> => {
    const result: Record<string, number> = {};
    let totalBytes = 0;

    // Get total bytes
    Object.values(record).forEach((bytes) => { totalBytes += bytes;})

    for (const [lang, bytes] of Object.entries(record)) {
      result[lang] = parseFloat(((bytes / totalBytes) * 100).toFixed(2));
    }

    return result;
  };

  try {
    const repoRequests = REPO_NAMES.map(async (repo) => {
      // Fetch metadata on repo
      const response = await fetch(`${GITHUB_API_BASE}/${GITHUB_USERNAME}/${repo}`, { headers });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${repo}: ${response.statusText}`);
      }

      const data = await response.json();

      // Fetch README.md
      const readmeResponse = await fetch(`${GITHUB_API_BASE}/${GITHUB_USERNAME}/${repo}/readme`, { headers });
      let readmeContent = "";
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        const decoded = atob(readmeData.content); // Decode Base64
        readmeContent = decoded;
      }

      // Fetch languages used in project
      const languagesUsed = await fetch(`${GITHUB_API_BASE}/${GITHUB_USERNAME}/${repo}/languages`, { headers });
      let languages: Record<string, number> = {};
      if (languagesUsed.ok) {
        const languagesUsedData = await languagesUsed.json();
        languages = bytesToPercentages(languagesUsedData);
      } else {
        // Fallback to primary language if languages API call fails
        languages[String(data.language || 'JavaScript')] = 100;
      }

      // Extract readme demo video/gif if we can
      let repoDemoGifRelative = '';
      let repoDemoGifAbsolute = '';
      const repoDemoGifMatch = readmeContent.match(repoDemoGifRegMatch);
      if (repoDemoGifMatch && repoDemoGifMatch[1]) {
        repoDemoGifRelative = repoDemoGifMatch[1];
        if (repoDemoGifRelative) {
          repoDemoGifAbsolute = `https://raw.githubusercontent.com/`
            + `${GITHUB_USERNAME}/${repo}/${data.default_branch}/${repoDemoGifMatch[1]}`;
        }
      }

      return {
        name: data.name,
        description: data.description || "No description available.",
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        language: data.language || "Unknown",
        languages,
        defaultBranch: data.default_branch,
        readme: readmeContent,
        repoDemoGifRelative,
        repoDemoGifAbsolute,
      };
    });

    const projects = await Promise.all(repoRequests);

    // Save to disk in dev mode OR if a specific env flag is set
    if (process.env.SAVE_PROJECTS_JSON === "true") {
      fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(projects, null, 2), 'utf-8');
      console.log(`Project data saved to ${PROJECTS_JSON_PATH}`);
    }

    return projects;

  } catch (error) {
    console.error("GitHub API error:", error);
    console.warn("Falling back to static JSON file...");

    try {
      const fallbackData = fs.readFileSync(PROJECTS_JSON_PATH, 'utf-8');
      return JSON.parse(fallbackData);
    } catch (fallbackError) {
      console.error("Failed to load fallback JSON file:", fallbackError);
      return null;
    }
  }
}
