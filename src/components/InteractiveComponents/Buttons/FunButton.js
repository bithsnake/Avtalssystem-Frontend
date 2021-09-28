import classes from "./FunButton.module.css";

const FunButton = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button"}
      onClick={props.onClick}
      >
          {props.children /**get content from in between FunButton tags */} 
    </button>
  );
};

export default FunButton;
