import { useState } from "react";
import "./App.css";
import json from "./data.json";
import Checkboxes from "./Checkboxes";

function App() {
  const [data, setData] = useState(json);
  const [isChecked, setIsChecked] = useState({});
  return (
    <div>
      <h1 className="heading">Nested Checkboxes</h1>

      <Checkboxes data={data} rootData={data} isChecked={isChecked} setIsChecked={setIsChecked} />
    </div>
  );
}

export default App;
