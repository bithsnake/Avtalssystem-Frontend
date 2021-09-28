import React from "react";
import { useState,useRef, useContext} from "react";
import "./User.scss";
import { Link } from 'react-router-dom';
import { Table, Card } from "react-bootstrap";
import AuthContext from '../../store/auth-context';
const User = (props) => {
  const ctx = useContext(AuthContext);
  const [editUser, setToggleEditUser] = useState(false);
  const firstName = useRef("");
  const lastName = useRef("");
  const emailAddress = useRef("");
  const { permission } = props;

  //new location
  const redirectToUserProfileHandler = (e) => {
    e.preventDefault();
    localStorage.setItem("selectedUserId", props.userdata.id);
    ctx.onChooseMenu("profile", `${props.userdata.id}`);
  }

  const submitEditHandler = (e) => {
    e.preventDefault();
    const enteredFirstName =    firstName.current.value;
    const enteredLastName =     lastName.current.value;
    const enteredEmailAddress = emailAddress.current.value;

    const changedUserData = {
        FirstName:          enteredFirstName,
        LastName:           enteredLastName,
        EmailAddress:        enteredEmailAddress,
    };

    //console.log("changed userdata: ", changedUserData);
  };

  return (
    <Card
      style={{
        backgroundColor:  editUser ? "lightblue" : "white",
        outlineWidth:     editUser ? "thick"  : "none",
        borderRadius:     editUser ? "0.4rem,0.4rem,0,0" : "0",
        boxShadow:        editUser ? "black" : "none",
      }}
    >
      <Table
        className="mytable"
        id="userform0"
        responsive
        variant=""
        striped={true}
        bordereless
        hover={editUser}
        size="sm"
        key={props.userdata.id}
        onSubmit={submitEditHandler}
      >
        <thead>
          <tr>
            <th>Namn</th>
            <th>Mailadress</th>
            {/* fyll på mer <th> här */}
          </tr>
        </thead>

        <tbody className="">
          <tr style={{ color: props.textColor }}>
            {
              <>                
                <Link style={{ pointerEvents: permission ? "initial" : "none", color: permission ? "default" : "inherit", textDecorationLine: "blink" }} onClick={redirectToUserProfileHandler} >
                  <td id="name" >{props.userdata.firstName + " " + props.userdata.lastName}</td>
                </Link>
                <td id="mailaddress" > {props.userdata.emailAddress} </td>
                {/* fyll på mer <td> här */}
              </>
            }
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
export default React.memo(User);