import "./NavBar.scss";
import {useState,  useEffect, useContext } from "react";
import { Route , useHistory} from "react-router-dom";
import { ModalFooter } from "react-bootstrap";
import NavMenu from "./components/NavMenu/NavMenu";

import UserMenu       from "./components/UserInterface/UserMenu";
import UserProfile    from "./components/UserInterface/UserProfile";
import CompanyMenu    from "./components/CompanyInterface/CompanyMenu";
import DepartmentMenu from "./components/DepartmentInterface/DepartmentMenu";
import ContractMenu   from "./components/ContractInterface/ContractMenu";
import Login from "./components/LoginInterface/Login";
import AuthContext from "./store/auth-context";

const copyrightYear = new Date();
const App = () => {
  //States
  const [seconds, setSeconds] = useState(0);
  //Context API
  const ctx = useContext(AuthContext);
  const history = useHistory();
  //Effects
  useEffect( () => {
    if (localStorage.getItem("userId")) {
      console.log("userid: ", localStorage.getItem("userId"));
      ctx.apiOnGetUser(localStorage.getItem("userId"));
      ctx.apiGetLoggedInUserData(localStorage.getItem("userId"));
    }
    // setSeconds(() => 0);
  }, []);

  //Log out timer [Disabled]
  useEffect(() => {
    // if (ctx.startTimer) {
    //   const interval = setInterval(() => {
    //     setSeconds( seconds => seconds + 1 );
        
    //   }, 1000);
    //   return () => clearInterval(interval);
    //   }
  }, [ctx.startTimer]);
  //seconds
  useEffect(() => {
    // if (seconds < 120) {
    //   console.log("seconds: ", seconds);
    // } else {
    //   console.log(("Idle for too long"))
    //   ctx.startTimer = false;
    //   history.push("/");
    // }
  }, [seconds]);
  
  return (
    <>
      <main onMouseMove={ctx.checkIsAlive} className="wrapper content-wrapper">
        <Route render={{history}} path="/" exact><div className="login-bg center mx-sm-auto"><Login bypassLogin={ctx.bypassLogin} /></div></Route>
        <Route render={{history}} path="/home"><ul className=" navbar navbar-nav bg-white" onMouseMove={ctx.checkIsAlive}><NavMenu title={`NAMN`}/></ul> </Route>
        <Route render={{history}} path="/home/users" exact><UserMenu/></Route>
        <Route render={{history}} path={`/home/users/profile/:${ctx.userProfile.id}`} exact><UserProfile userdata={ctx.userProfile}/></Route>
        <Route render={{history}} path="/home/companies" exact><CompanyMenu/></Route>
        <Route render={{history}} path="/home/departments/" exact><DepartmentMenu/></Route>
        <Route render={{history}} path="/home/contracts" exact><ContractMenu/></Route>
      </main>
      <ModalFooter  className=" justify-content-center">{`@Kimmo Savilampi ${copyrightYear.getFullYear()}`}</ModalFooter>
    </>
  );
};
export default App;