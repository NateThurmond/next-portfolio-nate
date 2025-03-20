import { fetchGitHubProjects } from '../lib/fetchGitHubProjects';

fetchGitHubProjects().then(() => {
  console.log('Projects updated and saved to disk!');
  process.exit(0);
}).catch(err => {
  console.error('Failed to update projects:', err);
  process.exit(1);
});
