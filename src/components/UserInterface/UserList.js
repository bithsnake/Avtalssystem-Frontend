import React from 'react';
import User from "./User";
import "./UserList.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { InputGroup } from 'react-bootstrap';

const UserList = (props) => {
  // context
  const ctx = useContext(AuthContext);

  // states
  const [showAmountOfUsers, setShowAmountOfUsers] = useState(2);
  const [filteredUsers, setFilteredUsers] = useState(Object.entries(ctx.users).length === 0 ? {} : ctx.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [newArray, setNewArray] = useState([0]);

  // destructed props
  const { userdata } = props;


  let tempArray = [];

  //set new array
  useEffect(() => {
    setFilteredUsers(() => ctx.users);
  }, []);
  
  useEffect(() => {

  }, [showAmountOfUsers]);

    //Search
    useEffect(() => {
      if (ctx.users.length > 0) {
        setFilteredUsers(() =>
          ctx.users.filter((user) => user.firstName.toLowerCase().match(searchTerm.toLowerCase()))
        );
      }
    }, [ctx.users,searchTerm]);
  
  //Spara
  // var letters = /^[A-Za-z]+$/;
  const searchChangeHandler = (e) => {setSearchTerm( () => e.target.value);};
  
  
  const showAmountHandler = (e) => {
    e.preventDefault();
    setShowAmountOfUsers(() => parseInt(e.target.value));
  
    tempArray = [];
    //console.log("amount of users:", showAmountOfUsers);
    for (let i = 0; i < showAmountOfUsers-1; i++) {
      filteredUsers[i] !== undefined &&
        tempArray.push(filteredUsers[i]);
    };
    setNewArray((prev) => prev.splice(0, prev.length));
    //console.log("array after splice: ", newArray);
    setNewArray( ()=> tempArray );
    console.table("new filtered users: ", newArray);
    
  };

  if (userdata.length === 0) {
    return <h2 className="user-list-fallback">Hittade inga användare.</h2>;
  }

  const deleteUserClickHandler = (userId) => {
    ctx.apiOnDeleteUser(userId);
    return;
  };

  return (
    <>
      {/* Header */}
      <div className="card-header py-3"> <h1 className="m-0 font text-primary">Användare</h1> </div>

      {/* Body */}
      <div className="card card-body shadow mb-4 overflow-scroll">
        {/* Show amount of users */}
        <div className="col-md-6">
          <div id="datatableLength"></div>
          <label htmlFor="userAmountList">Visa antal användare</label>
          <select
            name="datatableLength"
            aria-controls="dataTable"
            className="custom-select custom-select-sm form-control form-control-sm"
            id="userAmountList"
            defaultValue={showAmountOfUsers}
            onChange={showAmountHandler}
          >
            <option value="1" onChange={showAmountHandler}>
              1
            </option>
            <option value="2" onChange={showAmountHandler}>
              2
            </option>
            <option value="5" onChange={showAmountHandler}>
              5
            </option>
            <option value="10" onChange={showAmountHandler}>
              10
            </option>
            <option value="15" onChange={showAmountHandler}>
              15
            </option>
          </select>
        </div>
        {/* Search Filter */}
        <div className="col-md-6">
          <div className="dataTable_filter" id="dataTable_filter">
            <label htmlFor="">
              Sök:
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text as="input" type="search" placeholder="sök.." onChange={searchChangeHandler}/>
                </InputGroup.Prepend>
              </InputGroup>
            </label>
          </div>
        </div>
        {/* Users */}
        {
        filteredUsers.filter(user => user !== null).map( user  => (
          <div  key={user.id}>
            <User
              key={user.id}
              textColor="black"
              userdata={user}
              permission={ctx.permission}
              onDeleteUser={deleteUserClickHandler}
            />
          </div>
          
        ))}
      </div>
    </>
  );
};
export default UserList;