
// Temporary test file to run the seed function
import { seedProjects } from './scripts/seedProjects';

console.log("Starting seed process...");
seedProjects()
    .then(() => console.log("Done."))
    .catch(err => console.error("Fatal:", err));
