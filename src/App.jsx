import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("BlueViolet");
  const [shake, setShake] = useState(false);

  // Array of colors with their names and values
  const colorsArray = [
    { name: "Red", value: "red" },
    { name: "Green", value: "lawngreen" },
    { name: "Blue", value: "blue" },
    { name: "Yellow", value: "yellow" },
    { name: "Lavender", value: "lavender" },
    { name: "BlueViolet", value: "blueviolet" },
    { name: "Cyan", value: "cyan" },
    { name: "Black", value: "black" },
    { name: "White", value: "white" },
  ];
  //shared button style
  const buttonStyle = "outline-none px-4 py-1 rounded-full shadow-lg";

  const playSound = () => {
    const audio = new Audio("../src/assets/mixkit-happy-bell-alert-601.mp3");
    audio.play();
  };

  const triggerShake = () => {
    setShake(true); //setting shake to true
    setTimeout(() => setShake(false), 500); //remove animation after .5s
  };

  const setRandomColor = () => {
    // 16777215, decimal value for largest possible hex color, #FFFFFF
    // convert random number from base10, decimal to hexicadecimal base16
    //sometimes toString(16) can retrun fewwer than 6 digits, for that we use padStart
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setColor(randomColor);
    playSound();
  };

  useEffect(() => {
    triggerShake();
  }, [color]);

  return (
    <div className="w-full h-screen fade" style={{ backgroundColor: color }}>
      {/* button container */}
      <div className="image h-screen">
        <img
          src="../src/assets/3777-pepecool.png"
          alt="shaking icon"
          className={shake ? "shake-animation" : ""}
        />
      </div>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-md ">
          {/* add buttons here */}
          {/* onClick expects a function,if you pass like setColor, this is a refernce you cannot pass paramter here, and if you want to pass a function with a parameter then this is the syntax, setColor('red'),this would directly execute the function, and this case the returned value will be given to onClick, which onClick does not need, onClick needs a function not return we get from function,
          so what we do is we give a callback, which is a function which onClick needs, this callback is calling setColor with our own parameter
          
          ()=>setColor('red') */}
          {/* generate buttons dynamically */}
          {colorsArray.map(({ name, value }) => (
            <button
              className={buttonStyle}
              key={value}
              style={{
                backgroundColor: value,
                color: value === "black" ? "white" : "black",
              }}
              onClick={() => {
                setColor(value);
                playSound();
              }}
            >
              {name}
            </button>
          ))}
          {/* random Color picker  */}
          <div
            className={buttonStyle}
            style={{ backgroundColor: "Azure" }}
            onClick={setRandomColor}
          >
            Ramdom Color
          </div>
          {/* color picker */}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className=" outline-none h-10 w-10 rounded-md"
          />
          {/* copy color code to clipboard */}
          {/* navigator.clipboard.writeText built-in Web API that takes a string as input (in this case, the color variable) and copies it to the clipboard. */}
          <button
            onClick={() => navigator.clipboard.writeText(color)}
            className="px-4 py-2 bg-black text-yellow-400 font-bold rounded shadow-md"
          >
            Copy Color Code
          </button>
        </div>

        <div
          className="fixed top-4 inset-x-0 text-center text-4xl tracking-normal font-bold "
          style={{
            backgroundColor: "lavenderblush",
            padding:'1rem',
          }}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </div>
      </div>
    </div>
  );
}

export default App;
