import { CoursePlanner } from "./CoursePlanner";
import { Analytics } from "@vercel/analytics/react";

import "./App.css";

function App() {
  return (
    <>
      <CoursePlanner />
      <Analytics />
    </>
  );
}

export default App;
