
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  document.title = "Show da Manhã";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = "/favicon.png";
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);

createRoot(document.getElementById("root")!).render(<App />);
  createRoot(document.getElementById("root")!).render(<App />);
  