import React, { useState } from "react";
import { Synthesizer } from "./Synthesizer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Synthesizer />
    </div>
  );
}

export default App;
