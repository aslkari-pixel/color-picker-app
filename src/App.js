import "./App.css";
import colorNames from "colornames";
import { useState } from "react";
import Content from "./components/Content";
import GetColor from "./components/GetColor";

function App() {
  const [ginput, setGinput] = useState("");
  const [hexValue, setHexValue] = useState("");

  const checkValidation = (e) => {
    const nameOfColor = e.trim().split("");
    const noSpaces = nameOfColor.filter((char) => char !== " ").join("");
    setGinput(noSpaces);
    setHexValue(colorNames(noSpaces));
  };

  return (
    <>
      <Content ginput={ginput} hexValue={hexValue} />
      <GetColor ginput={ginput} checkValidation={checkValidation} />
    </>
  );
}

export default App;
