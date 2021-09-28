import UserList from "./UserList";
import React from 'react';
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext} from "react";
import NewUser from "./NewUser";
import AuthContext from '../../store/auth-context';

const UserMenu = (props) => {
  const ctx = useContext(AuthContext);
  const [switchAddNewUserInterface, setSwitchAddNewUserInterface] = useState(false);
  const [currentUsers, setCurrentUsers] = useState(ctx.bypassLogin === false ? ctx.dummyusers : ctx.users);

  let buttonText = switchAddNewUserInterface ? "Tillbaka" : "Lägg till användare";
  //Init
  useEffect(() => {
    ctx.apiOnGetUser(ctx.user.id === -1 ? ctx.user.id : localStorage.getItem("userId"));
    ctx.onSetUserIsAdmin();
    return ctx.apiOnGetAllUsers();
  }, []);


  useEffect(() => {
    // console.log("users changed");
    setCurrentUsers( (prev) => prev.length !== ctx.users.length ? ctx.users : prev);
  }, [ctx.users]);
  
  const updateUserList = () => {
    // ctx.apiOnGetAllUsers();
    toggleAddUserForm();
  }
  //Toggle user form
  const toggleAddUserForm = () => { setSwitchAddNewUserInterface(!switchAddNewUserInterface); };
  
  return (
    <>
      <div className="container-fluid">
        {ctx.permission > 0 && (
          <Button
            className="btn-group-toggle"
            type="button"
            onClick={toggleAddUserForm}
          >
            {buttonText}
          </Button>
        )}
        {switchAddNewUserInterface && (
          <NewUser
            users={props.userdata}
            key={ctx.user.id}
            companydata={ctx.companies}
            onAddedUser={updateUserList}
          />
        )}
        {
          ctx.users.length > 0 && (
          <UserList userdata={currentUsers}/>
        )}
      </div>
    </>
  );
};
export default UserMenu;