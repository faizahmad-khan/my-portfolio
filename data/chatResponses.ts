export type ChatResponse = {
  keywords: string[];
  answer: string;
};

export const chatResponses: ChatResponse[] = [
  {
    keywords: ["project", "projects", "built", "work", "portfolio"],
    answer: "Faiz has built several projects including Project NETRA (an AI traffic management system using YOLOv8), OpportuAI (a collaborative Next.js platform), an AI Virtual Mouse using hand tracking, a Healthcare Portal built with Django, and a collection of 19 browser games. Check out the Projects section for details!",
  },
  {
    keywords: ["netra", "traffic"],
    answer: "Project NETRA is an adaptive traffic management system. It uses YOLOv8 to detect vehicles in real-time and automatically prioritizes emergency vehicles like ambulances by overriding traffic signal logic. Built with Python, YOLOv8, and OpenCV.",
  },
  {
    keywords: ["healthcare", "django", "patient", "hospital", "medical"],
    answer: "The HealthCare Portal is a full-stack Django application managing patient records, doctor profiles, appointments, prescriptions, and pharmacy inventory with automatic stock deduction. Faiz built it specifically to learn Django in depth.",
  },
  {
    keywords: ["game", "games", "ludo", "snake", "castle", "space invaders"],
    answer: "Faiz built a collection of 19 browser games using pure HTML, CSS, and JavaScript — no game engines or libraries. It includes Ludo, Snake & Ladder, Tetris, Pac-Man, Castle Defenders (a tower defense game with A* pathfinding), and Space Invaders. You can play two of them right in the Projects section!",
  },
  {
    keywords: ["mouse", "hand", "gesture", "mediapipe", "virtual mouse"],
    answer: "The AI Virtual Mouse uses MediaPipe's hand landmark detection to let you control your cursor and click using just hand gestures captured through a webcam — no extra hardware needed.",
  },
  {
    keywords: ["skill", "skills", "tech stack", "technology", "languages", "frameworks"],
    answer: "Faiz works across the full stack: React, Next.js, and TypeScript on the frontend; Node.js, Django, and FastAPI on the backend; PostgreSQL, MongoDB, and Redis for databases; plus Python, PyTorch, and OpenCV for machine learning work. Check the Skills section for the complete list.",
  },
  {
    keywords: ["frontend", "react", "next"],
    answer: "On the frontend, Faiz primarily works with React, Next.js, TypeScript, and TailwindCSS.",
  },
  {
    keywords: ["backend", "node", "api", "server"],
    answer: "On the backend, Faiz works with Node.js, Django, FastAPI, and Python — building REST APIs, database-driven applications, and server-side logic.",
  },
  {
    keywords: ["machine learning", "ml", "ai", "yolo", "opencv", "pytorch"],
    answer: "Faiz has hands-on ML experience with YOLOv8 for object detection, OpenCV for computer vision, MediaPipe for hand/pose tracking, and PyTorch for model training — all applied in real projects like Project NETRA and the AI Virtual Mouse.",
  },
  {
    keywords: ["education", "degree", "university", "college", "study"],
    answer: "Faiz is a Computer Science student. For full education details, feel free to ask him directly through the contact form!",
  },
  {
    keywords: ["experience", "internship", "job", "work history"],
    answer: "For details about work experience and internships, check the Experience section on this site, or reach out through the contact form for the full picture.",
  },
  {
    keywords: ["contact", "reach", "email", "hire", "connect"],
    answer: "You can reach Faiz directly through the Contact form on this site, or connect via the GitHub and LinkedIn links in the footer.",
  },
  {
    keywords: ["resume", "cv"],
    answer: "You can download Faiz's resume using the 'Resume & CV' button in the hero section at the top of the homepage.",
  },
  {
    keywords: ["blog", "article", "write", "writing"],
    answer: "Faiz writes technical blog posts about his projects — covering things like training YOLOv8 models, building Django apps, and lessons learned as a student developer. Check out the Blog section!",
  },
  {
    keywords: ["hello", "hi", "hey", "sup"],
    answer: "Hey there! Ask me anything about Faiz's projects, skills, or experience — I'll do my best to help you learn more about his work.",
  },
  {
    keywords: ["thank", "thanks", "thank you"],
    answer: "You're welcome! Let me know if you have any other questions about Faiz's work.",
  },
  {
    keywords: ["ok", "fine"],
    answer: "",
  },
];

export const fallbackResponse =
  "I don't have an answer for that specific question, but you can reach Faiz directly through the Contact form — he'd be happy to help!";

export function findResponse(userInput: string): string {
  const normalized = userInput.toLowerCase();

  let bestMatch: ChatResponse | null = null;
  let maxMatches = 0;

  for (const response of chatResponses) {
    const matches = response.keywords.filter(keyword =>
      normalized.includes(keyword.toLowerCase())
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = response;
    }
  }

  return bestMatch ? bestMatch.answer : fallbackResponse;
}
