<div align="center">
  <br />
  <a href="https://github.com/Sandeep010-hub/archive-insight">
    <img src="https://img.shields.io/badge/PlagioSense-v2.0-indigo?style=for-the-badge&logo=appveyor" alt="PlagioSense Logo">
  </a>
  
  <h1 align="center">Archive Insight</h1>

  <p align="center">
    <strong>Advanced Semantic Analysis & Academic Integrity Platform</strong>
  </p>

  <p align="center">
    <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react" alt="React 18" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite" alt="Vite" />
    </a>
    <a href="https://ui.shadcn.com/">
      <img src="https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=flat-square&logo=shadcnui" alt="shadcn/ui" />
    </a>
  </p>
</div>

<br />

## 📋 Overview

**Archive Insight** (formerly PlagioSense) is an enterprise-grade academic project explorer designed to redefine how research originality is verified. Moving beyond simple keyword matching, it leverages a sophisticated **Semantic Analysis Engine** to detect idea-level duplication, assess project novelty, and provide actionable intelligence for researchers and evaluators.

Built with a "Mastery through Curiosity" philosophy, the platform combines a high-fidelity **Editorial Design System** with powerful analytics to create a transparent, explainable, and visually stunning audit experience.

---

## ✨ Key Features

### 🧠 **Intelligent Discovery Engine**
- **Semantic Layer Analysis:** Analyzes abstracts and project descriptions using advanced NLP techniques (Cosine Similarity, Vector Embeddings) to understand *intent* not just keywords.
- **Context-Aware Chatbot:** An integrated AI assistant that provides real-time feedback on document structure, citation quality, and originality probability.

### 🎨 **Premium User Experience**
- **Editorial Design System:** A clean, heuristic-driven UI inspired by top-tier academic journals, featuring crisp typography (Geist/Inter) and a minimalist 1px border aesthetic.
- **Interactive Visualizations:** 
    - **Particle Canvas Hero:** A dynamic, physics-based entry point that responds to user interaction.
    - **Bento Grid Explorer:** A responsive, high-performance project directory with "Quick View" hover states and smooth Framer Motion transitions.

### 🛡️ **Academic Integrity Tools**
- **Originality Scoring:** Real-time calculation of a "Uniqueness Score" based on comparison with a global archive of 1.2M+ projects.
- **Tech Stack Recommendations:** AI-driven suggestions for modernizing project architectures to foster genuine innovation.

---

## 🛠️ Technical Architecture

This project is built on a modern, type-safe stack designed for performance and scalability.

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | React 18, TypeScript 5.8 |
| **Build Tooling** | Vite 5 (SWC) |
| **Styling & Design** | Tailwind CSS 3, shadcn/ui, Lucide React |
| **Animation** | Framer Motion (Declarative animations) |
| **State Management** | Context API (Scalable to Zustand/Redux) |
| **Navigation** | React Router DOM v6 |

---

## 🚀 Getting Started

Follow these steps to set up the development environment locally.

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher) or **Bun** (optional)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Sandeep010-hub/archive-insight.git
    cd archive-insight
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or if you use bun
    bun install
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

The codebase follows a scalable **Feature-Based** architecture:

```
src/
├── components/
│   ├── ui/           # Reusable atomic components (shadcn/ui)
│   ├── landing/      # Specific landing page sections (Hero, Chatbot)
│   ├── scanner/      # Core scanning engine components
│   └── explorer/     # Project discovery and filtering tools
├── pages/            # Page-level route components (Home, Scanner, About)
├── hooks/            # Custom React hooks for logic reuse
├── lib/              # Utility functions and cn helpers
└── assets/           # Static assets and global styles
```

---

## 📝 License

This project is developed for the **Computer Science & Engineering Department Academic Year 2025–26**. All rights reserved.

<br />

<div align="center">
  <p>Built with ❤️ by the Archive Insight Team</p>
</div>