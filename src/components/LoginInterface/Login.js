import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Image, Button } from "react-bootstrap";
import logo from "../../images/TestLogo.svg";
import ErrorModal from "../GlobalUI/ErrorModal";
import AuthContext from "../../store/auth-context";

const Login = (props) => {
  const ctx = useContext(AuthContext);


  const [enteredMailAdress, setMailAdress] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [bypass, setBypass] = useState(ctx.bypassLogin);
  
  const history = useHistory();
  const inputRef = useRef();
  //Clear localstorage on mount
  useEffect(() => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("companyId");
    localStorage.removeItem("CustomerId");
    localStorage.removeItem("selectedUserId");
    sessionStorage.removeItem("path");
    
    // if (props.bypassLogin) {
    //   history.push("/home");
    // }
    
  }, []);

  useEffect(() => {
    // //console.log(ctx.tokenString);
    // localStorage.clear();
    inputRef.current.focus();
  }, [ctx.tokenString]);

  useEffect(() => {
    // //console.log("And then this runs");
    const identifier = setTimeout(() => {
      setPasswordIsValid(enteredPassword.trim().length > 3);
      setEmailIsValid(enteredMailAdress.includes("@"));
    }, 300);

    return () => {
      // //console.log("this runs first");
      clearTimeout(identifier);
    };
  }, [enteredMailAdress, enteredPassword]);

  useEffect(() => {
    if (ctx.tokenString !== "") {
      // //console.log("Something happened with tokenString : " + ctx.tokenString);
      // //console.log("Something happened with responseStatusobject : " + ctx.responseData);
    }

    checkBypass();

  }, [ctx.responseStatus, ctx.tokenString, bypass]);
  
  const checkBypass = () => {
    return bypass;
  };
  
  const switchBypass = () => {
    setBypass(() => bypass === true ? false : true);
  };
  const mailAdressInputHandler = (event) => {
    setMailAdress(() => event.target.value);
  };
  
  const passwordInputHandler = (event) => {
    setPassword(() => event.target.value);
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    if(bypass){
      ctx.apiLogin(
        "test@test.com",
        "test123"
      )      
    } else {
      if (enteredPassword === "") return;

        ctx.apiLogin(
          enteredMailAdress,
          enteredPassword
        )     
    }
  };
  const spinnerStyling = {
    display: "flex",
    position: "absolute",
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "42%",
    marginTop: "50%",
    marginBottom: "50%"
  }
  return (
    <>
      {ctx.formIsValid === false && (
        <ErrorModal
          onPressButton={ctx.onLoginError}
          message={"Ogiltigt användarnamn eller lösenord."}
          onConfirm={ctx.onLoginError}
        />
      )}

      <div className="login-to-center">
        <Image className="align-self-center" fluid src={logo}></Image>
        <h1 style={{ textAlign: "center", fontSize: "5rem" }}>Tract</h1>{" "}
        <span>
          <h3>
            <p></p>
          </h3>
        </span>
        <Label>Logga in</Label>
        <Form id="loginform" onSubmit={submitHandler}>
          <FormGroup id="loginform">
            {/* <Label for="loginForm">Mailadress</Label> */}
            {
              bypass ?
              <Input
                bsSize="sm"
                autoFocus={true}
                ref={inputRef}
                form="loginform"
                name="email"
                formTarget="loginform"
                required={true}
                type="email"
                placeholder="test@test.com"
                value = "test@test.com"
                onChange={mailAdressInputHandler}
                />
                :
                <Input
                  bsSize="sm"
                  autoFocus={true}
                  ref={inputRef}
                  form="loginform"
                  name="email"
                  formTarget="loginform"
                  required={true}
                  type="email"
                  placeholder="mailadress"
                  onChange={mailAdressInputHandler}
                  />
            }
          </FormGroup>

          <FormGroup>
            {/* <Label for="loginForm">Lösenord</Label> */}
            {
              bypass ?
              <Input
                bsSize="sm"
                form="loginform"
                name="password"
                formTarget="loginform"
                required={true}
                type="password"
                placeholder="test123"
                value = "test123"
                onChange={passwordInputHandler}
              />              
              :
              <Input
                bsSize="sm"
                form="loginform"
                name="password"
                formTarget="loginform"
                required={true}
                type="password"
                placeholder= "lösenord"

                onChange={passwordInputHandler}
              />
                
            }
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" /> Kom ihåg mig
            </Label>
          </FormGroup>
          <Button
            role="alert"
            className="btn border-blue"
            disabled={ bypass ? false : !passwordIsValid || !emailIsValid}
            variant={`${
              bypass ? "primary" : passwordIsValid && emailIsValid ? "primary" : "secondary"
            }`}
            form="loginform"
            type="submit"
          >
            Logga in
          </Button>
        </Form>
      </div>

      <Button className={`m-0 p-0 float-left w-25 ${checkBypass() ? "btn-primary" : "btn-danger"} `} onClick={switchBypass}>Bypass Login</Button>
    </>
  );
};
export default Login;