import Button from "../InteractiveComponents/Buttons/Button";
import { Image, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/TestLogo.svg";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const NavMenu = (props) => {
  // state
  const [show, setShow] = useState(false);
  const [hasAccess, setHasAccess] = useState(true);
  const [loggedInUserName, setLoggedInUser] = useState('');
  const ctx = useContext(AuthContext);
  const history = useHistory();
  // effect
  useEffect(() => {
    setTimeout(() => {
      if (ctx.bypassLogin === false && ctx.loggedInUserID === -1) {
        //console.log("no user in store");
        history.push("/");
      } else {
        setHasAccess(() => true);
      }
    }, 100);

  }, []);
  useEffect(() => {
    if (ctx.loggedInUserID !== -1) {
      ctx.apiOnGetUser(ctx.loggedInUserID);
    }
  }, [ctx.loggedInUserID]);

  useEffect(() => {

    setTimeout(() => {
      setShow(() => true);
      if (Object.entries(ctx.loggedInUserObject) !== 0) {
        setLoggedInUser(() => `${ctx.loggedInUserObject.firstName} ${ctx.loggedInUserObject.lastName}`);      
      }
    }, 300);

  }, [ctx.loggedInUserObject]);

  // functions
  const checkScreenWidth = () => {
    return window.matchMedia("(max-width: 600px)").matches;
  };

  const chooseMenuHandler = (e) => {
    ctx.onChooseMenu(e.target.value);
  };

    //new location
    const redirectToUserProfileHandler = (e) => {
      e.preventDefault();
      localStorage.setItem("selectedUserId", localStorage.getItem("userId"));
      ctx.onChooseMenu("profile", `${localStorage.getItem("userId")}`);
  }
  
  //vars
  const chosenClass = checkScreenWidth() ? "nav-menu-container" : "";
  return (
    <>
      {
         hasAccess &&
        <Collapse  dimension="height" in={show}>
        {
            <div style={{alignContent : "center"}} className={chosenClass}>
            <div className="company-logo"><Image className="align-self-center" fluid src={logo}></Image></div>
            
            <section style={{ textAlign: "center" }}>
              <p> {`Inloggad som`}</p>
              <Link style={{ textDecorationLine: "blink" }} onClick={redirectToUserProfileHandler} >{`${loggedInUserName}`}</Link>
            </section>
 
            <h1 style={{ textAlign: "center", color: "white" }}>{props.title}</h1>
 
            <hr />
            <>
                <Button backgroundColor={"#17a2b8"} buttonTitle="" showText="Användare" onClick={ chooseMenuHandler} value="users"/>
                <Button className="isActive" backgroundColor="#17a2b8" buttonTitle="" showText="Bolag" onClick={chooseMenuHandler} value="companies"/>
                <Button className="isActive" backgroundColor="#17a2b8" buttonTitle="" showText="Avdelningar" onClick={chooseMenuHandler} value="departments" />
                <Button className="isActive" backgroundColor="#17a2b8" buttonTitle="" showText="Avtal" onClick={chooseMenuHandler} value="contracts" />
            </>
            {
              ctx.testMode &&
              <>
                <Button backgroundColor="lightpink" buttonTitle="TEST" showText="Post Request Test" onClick={ctx.apiPostRequestTest} />
                <Button backgroundColor="wheat" buttonTitle="" showText="Get Request Test" onClick={ctx.apiGetRequestTest}/>
              </>
            }
            <Button className="mt-1" backgroundColor="deepskyblue" buttonTitle="" showText="Logga ut" onClick={ctx.onLogout} />
          </div>
        }
      </Collapse>
      }
    </>
  );
};
export default NavMenu;