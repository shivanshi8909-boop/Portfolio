import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "../components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHIVANSHI — AI & Data Science Portfolio" },
      { name: "description", content: "Portfolio of SHIVANSHI, a B.Tech Artificial Intelligence & Data Science student in Bengaluru." },
      { property: "og:title", content: "SHIVANSHI — AI & Data Science Portfolio" },
      { property: "og:description", content: "Explore SHIVANSHI's education, skills, projects, certificates, and career objective." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});