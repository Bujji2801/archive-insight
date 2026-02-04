export interface Project {
  id: string;
  title: string;
  year: number;
  branch: string;
  techStack: string[];
  hashtags: string[];
  description: string;
  problemStatement: string;
  objective: string;
  approach: string;
  expectedOutcome: string;
  keywords: string[];
  technologies: string[];
  conclusion: string;
  userId: string;
}

export const projects: Project[] = [
  {
    id: "proj-001",
    title: "Smart Traffic Management System Using Deep Learning",
    year: 2024,
    branch: "Computer Science",
    techStack: ["Python", "TensorFlow", "OpenCV", "Flask"],
    hashtags: ["#DeepLearning", "#ComputerVision", "#SmartCity"],
    description: "An AI-powered system that optimizes traffic flow in urban areas using real-time video analysis and adaptive signal control.",
    problemStatement: "Urban traffic congestion leads to significant economic losses, increased pollution, and reduced quality of life. Traditional traffic management systems rely on fixed timing patterns that cannot adapt to real-time traffic conditions.",
    objective: "To develop an intelligent traffic management system that uses deep learning to analyze real-time traffic data and optimize signal timing for improved traffic flow and reduced congestion.",
    approach: "The system employs convolutional neural networks trained on traffic camera feeds to detect and count vehicles, estimate traffic density, and predict traffic patterns. An adaptive algorithm adjusts signal timing based on current and predicted traffic conditions.",
    expectedOutcome: "30% reduction in average wait times at intersections, 25% improvement in traffic throughput, and 20% reduction in vehicle emissions due to reduced idling time.",
    keywords: ["traffic management", "deep learning", "computer vision", "smart city", "CNN", "real-time analysis"],
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "YOLO", "PostgreSQL"],
    conclusion: "The proposed system demonstrates significant potential for improving urban traffic management through AI-driven optimization, offering a scalable solution for smart city infrastructure.",
    userId: "user-101"
  },
  {
    id: "proj-002",
    title: "Blockchain-Based Academic Credential Verification",
    year: 2024,
    branch: "Information Technology",
    techStack: ["Solidity", "Ethereum", "React", "Node.js"],
    hashtags: ["#Blockchain", "#EdTech", "#Security"],
    description: "A decentralized platform for issuing, storing, and verifying academic credentials using blockchain technology.",
    problemStatement: "Academic credential fraud is a growing problem worldwide, with forged degrees and certificates undermining trust in educational qualifications and causing significant economic and social harm.",
    objective: "To create a tamper-proof, decentralized system for academic credential verification that eliminates fraud and streamlines the verification process for employers and institutions.",
    approach: "Smart contracts on the Ethereum blockchain store cryptographic hashes of academic credentials. Educational institutions act as verified issuers, while employers and other verifiers can instantly validate credentials without intermediaries.",
    expectedOutcome: "Near-instant credential verification, elimination of document forgery, reduced administrative overhead for institutions, and increased trust in academic qualifications.",
    keywords: ["blockchain", "credentials", "verification", "smart contracts", "Ethereum", "education"],
    technologies: ["Solidity", "Ethereum", "React", "Node.js", "IPFS", "Web3.js"],
    conclusion: "Blockchain technology offers a robust solution for academic credential verification, providing immutable records and decentralized trust that traditional systems cannot match.",
    userId: "user-102"
  },
  {
    id: "proj-003",
    title: "Natural Language Processing for Mental Health Support",
    year: 2023,
    branch: "Computer Science",
    techStack: ["Python", "BERT", "FastAPI", "React"],
    hashtags: ["#NLP", "#MentalHealth", "#AI"],
    description: "An AI chatbot that provides preliminary mental health support through empathetic conversation and resource recommendations.",
    problemStatement: "Mental health services are overwhelmed globally, with long wait times and limited accessibility preventing many individuals from receiving timely support during psychological distress.",
    objective: "To develop an NLP-powered chatbot that can provide 24/7 preliminary mental health support, detect signs of distress, and guide users to appropriate professional resources.",
    approach: "Fine-tuned BERT models analyze user messages for emotional content and distress indicators. The system generates empathetic responses using a combination of retrieval and generation techniques, while maintaining appropriate boundaries and escalation protocols.",
    expectedOutcome: "Improved accessibility to mental health support, reduced barrier to seeking help, early detection of mental health crises, and better triage for professional services.",
    keywords: ["NLP", "mental health", "chatbot", "BERT", "sentiment analysis", "healthcare"],
    technologies: ["Python", "BERT", "FastAPI", "React", "PostgreSQL", "Redis"],
    conclusion: "AI-assisted mental health support shows promise as a complement to professional services, providing immediate access to resources while maintaining ethical boundaries.",
    userId: "user-103"
  },
  {
    id: "proj-004",
    title: "IoT-Based Precision Agriculture Monitoring System",
    year: 2023,
    branch: "Electronics",
    techStack: ["Arduino", "Raspberry Pi", "Python", "AWS IoT"],
    hashtags: ["#IoT", "#Agriculture", "#Sustainability"],
    description: "A comprehensive sensor network for monitoring soil conditions, weather, and crop health to optimize agricultural practices.",
    problemStatement: "Traditional farming methods often lead to inefficient resource usage, with over-irrigation, excessive fertilizer application, and delayed response to pest infestations causing economic and environmental harm.",
    objective: "To implement an IoT-based monitoring system that provides real-time data on agricultural conditions, enabling data-driven decisions for optimal crop management.",
    approach: "Distributed sensor nodes collect data on soil moisture, temperature, humidity, and nutrient levels. Edge computing devices process local data while a cloud platform aggregates information for analysis and predictive modeling.",
    expectedOutcome: "20% reduction in water usage, 15% decrease in fertilizer costs, early pest detection, and 25% improvement in crop yield through optimized growing conditions.",
    keywords: ["IoT", "precision agriculture", "sensors", "sustainability", "edge computing", "monitoring"],
    technologies: ["Arduino", "Raspberry Pi", "Python", "AWS IoT", "TensorFlow Lite", "InfluxDB"],
    conclusion: "IoT-based precision agriculture represents a significant advancement in sustainable farming, offering scalable solutions for optimizing resource usage and improving yields.",
    userId: "user-104"
  },
  {
    id: "proj-005",
    title: "Federated Learning for Privacy-Preserving Healthcare Analytics",
    year: 2024,
    branch: "Computer Science",
    techStack: ["Python", "TensorFlow Federated", "Flask", "Docker"],
    hashtags: ["#FederatedLearning", "#Healthcare", "#Privacy"],
    description: "A distributed machine learning framework that enables collaborative healthcare research while keeping patient data at local institutions.",
    problemStatement: "Healthcare institutions hold valuable patient data that could advance medical research, but privacy regulations and data protection concerns prevent data sharing and centralized analysis.",
    objective: "To develop a federated learning framework that allows multiple healthcare institutions to collaboratively train machine learning models without sharing raw patient data.",
    approach: "Local models are trained on patient data at each institution, with only model updates shared to a central aggregator. Differential privacy techniques add additional protection against potential information leakage.",
    expectedOutcome: "Enable collaborative research across institutions, maintain patient privacy, achieve model performance comparable to centralized training, and accelerate medical AI development.",
    keywords: ["federated learning", "healthcare", "privacy", "machine learning", "differential privacy", "distributed computing"],
    technologies: ["Python", "TensorFlow Federated", "Flask", "Docker", "gRPC", "MongoDB"],
    conclusion: "Federated learning offers a viable path forward for healthcare AI research, balancing the need for large-scale data analysis with stringent privacy requirements.",
    userId: "user-105"
  },
  {
    id: "proj-006",
    title: "Augmented Reality Navigation for Visually Impaired",
    year: 2023,
    branch: "Computer Science",
    techStack: ["Unity", "ARCore", "TensorFlow", "Android"],
    hashtags: ["#AR", "#Accessibility", "#MobileApp"],
    description: "A smartphone application using AR and computer vision to assist visually impaired individuals with indoor navigation and obstacle detection.",
    problemStatement: "Visually impaired individuals face significant challenges navigating unfamiliar indoor environments, where GPS is ineffective and traditional assistive tools provide limited spatial awareness.",
    objective: "To create an AR-based navigation system that provides real-time audio guidance for indoor navigation, obstacle detection, and point-of-interest identification.",
    approach: "The system uses ARCore for spatial mapping and object detection models identify obstacles, doorways, and signage. Audio and haptic feedback guide users through environments with 3D spatial audio cues.",
    expectedOutcome: "Improved independence for visually impaired users, reduced navigation errors, faster travel times in unfamiliar buildings, and enhanced safety through proactive obstacle detection.",
    keywords: ["augmented reality", "accessibility", "navigation", "computer vision", "spatial audio", "mobile"],
    technologies: ["Unity", "ARCore", "TensorFlow", "Android", "Firebase", "Text-to-Speech API"],
    conclusion: "AR-assisted navigation shows significant potential for improving accessibility, with users reporting increased confidence and independence in indoor environments.",
    userId: "user-106"
  },
  {
    id: "proj-007",
    title: "Quantum-Resistant Cryptographic Protocol Implementation",
    year: 2024,
    branch: "Cybersecurity",
    techStack: ["Rust", "Python", "OpenSSL", "Lattice Crypto"],
    hashtags: ["#Cryptography", "#QuantumSafe", "#Security"],
    description: "Implementation and analysis of post-quantum cryptographic algorithms for securing communications against future quantum computing threats.",
    problemStatement: "Current public-key cryptographic systems are vulnerable to attacks by quantum computers, threatening the security of encrypted communications and digital signatures in the near future.",
    objective: "To implement and evaluate post-quantum cryptographic algorithms, providing a practical framework for transitioning existing systems to quantum-resistant encryption.",
    approach: "Implementation of NIST-selected post-quantum algorithms including CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures. Performance analysis compares classical and post-quantum approaches.",
    expectedOutcome: "Production-ready implementations of quantum-resistant algorithms, comprehensive performance benchmarks, and migration guidelines for existing cryptographic infrastructure.",
    keywords: ["post-quantum cryptography", "lattice cryptography", "key encapsulation", "digital signatures", "NIST", "security"],
    technologies: ["Rust", "Python", "OpenSSL", "liboqs", "CRYSTALS-Kyber", "CRYSTALS-Dilithium"],
    conclusion: "Post-quantum cryptographic algorithms are now mature enough for practical deployment, with acceptable performance trade-offs that justify early adoption for high-security applications.",
    userId: "user-107"
  },
  {
    id: "proj-008",
    title: "Microservices-Based E-Learning Platform Architecture",
    year: 2023,
    branch: "Software Engineering",
    techStack: ["Java", "Spring Boot", "Kubernetes", "React"],
    hashtags: ["#Microservices", "#EdTech", "#CloudNative"],
    description: "A scalable e-learning platform designed with microservices architecture to handle variable workloads and enable rapid feature development.",
    problemStatement: "Traditional monolithic e-learning platforms struggle to scale during peak usage periods and require extensive downtime for updates, limiting their ability to serve growing user bases.",
    objective: "To design and implement a microservices-based e-learning architecture that provides horizontal scalability, fault isolation, and continuous deployment capabilities.",
    approach: "The platform is decomposed into independent services for user management, content delivery, assessments, and analytics. Kubernetes orchestration enables automatic scaling and self-healing capabilities.",
    expectedOutcome: "99.9% uptime during peak periods, sub-second page load times, zero-downtime deployments, and reduced time-to-market for new features.",
    keywords: ["microservices", "e-learning", "Kubernetes", "cloud native", "scalability", "DevOps"],
    technologies: ["Java", "Spring Boot", "Kubernetes", "React", "Apache Kafka", "PostgreSQL", "Redis"],
    conclusion: "Microservices architecture provides significant advantages for e-learning platforms, enabling the scalability and agility required for modern educational technology.",
    userId: "user-108"
  },
  {
    id: "proj-009",
    title: "Computer Vision for Manufacturing Quality Control",
    year: 2024,
    branch: "Mechanical Engineering",
    techStack: ["Python", "PyTorch", "OpenCV", "ROS"],
    hashtags: ["#ComputerVision", "#Manufacturing", "#Automation"],
    description: "An automated visual inspection system for detecting defects in manufactured components using deep learning and industrial cameras.",
    problemStatement: "Manual quality inspection in manufacturing is slow, inconsistent, and prone to human error, leading to defective products reaching customers and costly recalls.",
    objective: "To develop an automated visual inspection system that can detect surface defects, dimensional variations, and assembly errors with superhuman accuracy and speed.",
    approach: "High-resolution industrial cameras capture images of components on the production line. Specialized CNN architectures trained on defect datasets classify and localize anomalies in real-time.",
    expectedOutcome: "99.5% defect detection rate, 50% reduction in quality control costs, real-time feedback for process optimization, and traceability through digital records.",
    keywords: ["quality control", "computer vision", "manufacturing", "defect detection", "automation", "deep learning"],
    technologies: ["Python", "PyTorch", "OpenCV", "ROS", "ONNX", "Industrial Cameras"],
    conclusion: "AI-powered visual inspection demonstrates significant improvements over manual methods, providing the consistency and speed required for modern manufacturing.",
    userId: "user-109"
  }
];

export const years = [2021, 2022, 2023, 2024];
export const branches = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical Engineering",
  "Software Engineering",
  "Cybersecurity"
];
export const techStacks = [
  "Python",
  "JavaScript",
  "React",
  "TensorFlow",
  "PyTorch",
  "Java",
  "Spring Boot",
  "Kubernetes",
  "Blockchain",
  "IoT"
];
