import { createClient } from '@supabase/supabase-js';
import { generateProjects } from './generateProjects'; // Import generator
import dotenv from 'dotenv';
import path from 'path';

// Load env vars from root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables in .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const seedProjects = async () => {
    console.log('🌱 Generating and Seeding projects...');

    // Generate 54 projects (9 per page * 6 pages)
    const projects = generateProjects(54);

    for (const project of projects) {
        const dbProject = {
            title: project.title,
            year: project.year,
            branch: project.branch,
            tech_stack: project.techStack,
            hashtags: project.hashtags,
            description: project.description,
            problem_statement: project.problemStatement,
            objective: project.objective,
            approach: project.approach,
            expected_outcome: project.expectedOutcome,
            keywords: project.keywords,
            technologies: project.technologies,
            conclusion: project.conclusion,
            user_id: project.userId
        };

        const { error } = await supabase
            .from('projects')
            .insert(dbProject);

        if (error) {
            console.error(`Error seeding ${project.title}:`, error);
        } else {
            console.log(`✅ Seeded: ${project.title}`);
        }
    }
    console.log(`✨ Seeding complete! Added ${projects.length} projects.`);
};
