import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import OldApp from "./OldApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <OldApp />
    </>
  );
}

export default App;
