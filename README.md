# Shuzi Yijing Protocol

A high-precision neural interpretation platform that combines the ancient wisdom of I-Ching (Yi-Jing) with modern AI analysis. This application calculates personal life paths and analyzes numeric strings using numeric Yijing principles, synthesized through Google Gemini.

## Features

- **Layer 1: Static Fate**: Accurate Life Path and Social Mask calculations.
- **Layer 2: Dynamic DNA**: Deep numerical analysis of digital strings (phone numbers, IDs, etc.).
- **Layer 3: Synthesis**: AI-powered strategic guidance and final verdict (Shu).
- **Gemini AI Integration**: Uses the latest `@google/genai` SDK for high-fidelity reasoning.
- **Modern UI**: Built with React, Vite, Tailwind CSS, and Shadcn UI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Yarn](https://yarnpkg.com/) (v1.22+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jerome200020/yi-jing-prediction.git
   cd yi-jing-prediction
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Environement Setup**:
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

### Running the Project

- **Development Mode**:
  ```bash
  yarn dev
  ```
  The app will be available at `http://localhost:5173`.

- **Production Build**:
  ```bash
  yarn build
  ```
  The optimized build will be generated in the `dist` folder.

- **Preview Production Build**:
  ```bash
  yarn preview
  ```

## Tech Stack

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **AI Backend**: [Google Gemini API](https://ai.google.dev/)
