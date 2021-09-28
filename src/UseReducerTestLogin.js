import { useState, useEffect, useReducer,useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import AuthContext from './store/auth-context';
//previous state,
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 3 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 3 };
  }
  return { value: "", isValid: false };
};

const UseReducerTestLogin = (props) => {
  const [formIsValid, setFormIsValid] = useState(true);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const ctx = useContext(AuthContext);
  
  
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const indentifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(indentifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    event.preventDefault();
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = (event) => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validatePasswordHandler = (event) => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card>
      <Form onSubmit={submitFormHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};
export default UseReducerTestLogin;