import { useState } from "react";
const Button = ({
  activeColor = "#0FFFFF",
  buttonTitle = "",
  showText = "input text",
  onClick,
  backgroundColor = "black",
  onFocusColor = "#56e472",
  value,
}) => {
  const [buttonIsFocused, setButtonIsFocused] = useState(false);

  // const buttonFocusHandler = (e) => {
  //   e.preventDefault();
  //   setButtonIsFocused((prevButtonIsFocused) => !prevButtonIsFocused);
  //   console.log("button is focused: " + buttonIsFocused);
  // };

  return (
    <div>
      <h2>{buttonTitle}</h2>
      <button
        type="button"
        role="button"
        className="btn "
        aria-pressed="true"
        onClick={onClick}
        style={{ color : "white", borderTopColor: backgroundColor, borderBottomColor : backgroundColor, borderInlineColor: backgroundColor, borderInlineWidth: "2px" }}
        value={value}
      >
        {showText}
      </button>
    </div>
  );
};
export default Button;
