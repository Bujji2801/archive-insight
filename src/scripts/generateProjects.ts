
import { Project } from '../data/projects';
import { v4 as uuidv4 } from 'uuid';

const YEARS = [2021, 2022, 2023, 2024];
const DEPARTMENTS = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical Engineering",
    "Software Engineering",
    "Cybersecurity"
];
const TECH_STACKS = [
    "Python", "JavaScript", "React", "TensorFlow", "PyTorch", "Java", "Spring Boot", "Kubernetes", "Blockchain"
];

const TITLES_PREFIX = [
    "Advanced", "Smart", "AI-Powered", "Blockchain-Based", "IoT-Enabled", "Decentralized", "Automated", "Intelligent", "Next-Gen", "Sustainable"
];

const TITLES_SUBJECT = [
    "Traffic Management", "Healthcare System", "Supply Chain", "Voting System", "Energy Grid", "Waste Management",
    "E-Learning Platform", "Fraud Detection", "Cyber Threat Analysis", "Crop Monitoring", "Home Automation", "Drone Delivery",
    "Financial Forecasting", "Patient Monitoring", "Network Security", "Image Recognition"
];

const TITLES_SUFFIX = [
    "System", "Framework", "Platform", "Solution", "Architecture", "Network", "Application", "Interface"
];

const DESCRIPTIONS_START = [
    "A comprehensive system designed to",
    "An innovative approach to",
    "This project aims to",
    "A scalable platform that",
    "Leveraging modern technologies to"
];

const DESCRIPTIONS_ACTION = [
    "optimize", "enhance", "revolutionize", "streamline", "automate", "secure", "monitor", "analyze"
];

const DESCRIPTIONS_OBJECT = [
    "complex workflows", "data processing", "security protocols", "user interactions", "resource allocation", "energy consumption", "real-time analytics"
];

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export function generateProjects(count: number = 54): Project[] {
    const projects: Project[] = [];

    for (let i = 0; i < count; i++) {
        const year = getRandomItem(YEARS);
        const branch = getRandomItem(DEPARTMENTS);
        // Ensure primary tech stack relates somewhat to branch? For now random is fine as per request to cover all.
        const techStack = getRandomItems(TECH_STACKS, Math.floor(Math.random() * 3) + 2); // 2-4 techs

        // Construct Title
        const title = `${getRandomItem(TITLES_PREFIX)} ${getRandomItem(TITLES_SUBJECT)} ${getRandomItem(TITLES_SUFFIX)}`;

        // Construct Description
        const description = `${getRandomItem(DESCRIPTIONS_START)} ${getRandomItem(DESCRIPTIONS_ACTION)} ${getRandomItem(DESCRIPTIONS_OBJECT)} using ${techStack.join(' and ')}.`;

        const project: Project = {
            id: uuidv4(),
            title,
            year,
            branch,
            techStack,
            hashtags: [`#${techStack[0]}`, `#${branch.replace(' ', '')}`, `#${year}`],
            description,
            problemStatement: `Existing solutions for ${title.toLowerCase()} lack scalability and efficiency.`,
            objective: `To build a ${title.toLowerCase()} that addresses current limitations.`,
            approach: "We utilize an agile methodology combined with state-of-the-art algorithms.",
            expectedOutcome: "Improvement in efficiency by 40% and reduction in costs.",
            keywords: [branch, ...techStack],
            technologies: techStack,
            conclusion: "The project successfully demonstrates the feasibility of the proposed approach.",
            userId: `user-${Math.floor(Math.random() * 1000)}`
        };

        projects.push(project);
    }

    return projects;
}
