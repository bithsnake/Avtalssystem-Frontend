import { useState, useEffect, useContext, useRef } from "react";
import ConfirmModal from '../GlobalUI/ConfirmModal';
import { useHistory } from 'react-router-dom';
import "./UserList.css";
import "./UserProfile.scss";
import AuthContext from "../../store/auth-context";
import { Link } from 'react-router-dom';
import { Card, Tabs, Tab, Button,Toast,Spinner,InputGroup,Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
  

const UserProfile = () => {

  const ctx = useContext(AuthContext);
  const history = useHistory();
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loggedInUserPermission, setLoggedInUserPermission] = useState(0);
  const [allowedCompanies, setAllowedCompanies] = useState(Object.entries(ctx.allowedCompanies).length === 0 ? [] : ctx.allowedCompanies);
  // const [allowedDepartments, setAllowedDepartments] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [pictureSource, setPictureSource] = useState('');
  const [userProfileId, setUserProfileId] = useState(-1);

  // Userdata
  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentPermission, setCurrentPermission] = useState(ctx.permission);
  const [userProfileCustomerId, setUserProfileCustomerId] = useState(-1);

  const firstNameRef = useRef(ctx.userProfile.firstName);
  const lastNameRef = useRef(ctx.userProfile.lastName);
  // const companyNameRef = useRef(ctx.allowedUser.lastName);
  const permissionRef = useRef(ctx.userProfile.Permission);
  
  let pictureContent;
  let userContent;
  let companyContent;
  // let departmentContent;

  const getUserProfileIdhandler = () => {
    const splittedLocationPath = history.location.pathname.split("/");
    const profileId = parseInt(splittedLocationPath[splittedLocationPath.length - 1]);
    return profileId;
  }
  //######################### Effects #########################//
  //On mount get set user, if we can
  useEffect(() => {
    ctx.apiOnGetUser(localStorage.getItem("userId"));
    //kolla url och ta id därifrån
    const splittedLocationPath = history.location.pathname.split("/");
    const profileId = parseInt(splittedLocationPath[splittedLocationPath.length - 1]);
    setUserProfileId( () => profileId );
    localStorage.setItem("selectedUserId", profileId);
    ctx.apiOnGetUserProfile(profileId);
    ctx.apiOnGetAllowedCompanies(profileId);
    ctx.onSetUserIsAdmin();
    // console.log("loggedIndUser: ", ctx.user);
    // console.log("loggedIndUserId: ", ctx.loggedInUserID);

    if ( Object.entries(ctx.userProfile).length !== 0) {
        setUser(() => ctx.userProfile);
    }
  }, []);

  useEffect(() => {
    // console.log("alloewdCompanies changed");
    // console.table("allowedCompanies from userProfile: " , allowedCompanies);
    setAllowedCompanies( (prev) => prev.length !== ctx.allowedCompanies.length ? ctx.allowedCompanies : prev);
  }, [ctx.allowedCompanies]);


  useEffect(() => {
    if (userProfileId !== localStorage.getItem("selectedUserId")) {
      setUserProfileId(() => getUserProfileIdhandler())
    }
  }, [localStorage.getItem("selectedUserId")]);

  // Set userProfile it there is a userProfile
  useEffect(() => {
      if (Object.entries(ctx.userProfile).length !== 0) {
          setUser(() => ctx.userProfile);
        // console.log("ctx.userProfileChanged from userprofile.js: ", ctx.userProfile);
        setCurrentFirstName(()=> ctx.userProfile.firstName);
        setCurrentLastName(() => ctx.userProfile.lastName);
        setUserProfileCustomerId(() => ctx.userProfile.customerId);
        setPictureSource(() => '');
        setLoggedInUserPermission(() => ctx.permission);
      }
  }, [ctx.userProfile]);
  //Set company profile
  useEffect(() => {
    if (Object.entries(ctx.allowedCompanies).length !== 0) {
        setAllowedCompanies(() => ctx.allowedCompanies);
        // console.log("ctx.userProfileChanged from userprofile.js: ", ctx.allowedCompanies);
      // setPictureSource(() => '');
    }
  }, [ctx.allowedCompanies]);
  
  useEffect(() => {
      if (userProfileId!== -1) {
        ctx.apiOnGetUserProfile(userProfileId);
        setLoggedInUserPermission(() => ctx.permission);
      };
  }, [userProfileId]);


    //If edit user, make field editable
  useEffect(() => {
    // console.log("edit user bool: ", editUser);
    }, [editUser]);
  
  //set user
  useEffect(() => {
      if (Object.entries(user).length !== 0) {
          setUser((prev) => prev);
          // console.log("user object info from UserProfile.js: ", user);
        // console.log("user permission level: ", user.permission);
    }

  }, [user]);

  //changes on firstname and last name fields
  useEffect(() => {
    // console.log("changes happened on firstName and lastName");
  },[currentFirstName,currentLastName])

  //######################### Functions #########################//
  // return to previous page
  const goBackHandler = (e) => {
    e.preventDefault();
    history.goBack();
  };


  const changeContentHandler = () => {
    setEditUser((prev) => !prev)
  };
  const canSavehandler = () => {
    setCanSave( () => true);
    // console.log("can save: ", canSave);
  };
  const resetFormHandler = (e) => {
    // console.log("resetting form");
    switch (e.target.value) {
      case "user":
        // console.log("resetting user");
        setTimeout(() => {
          setEditUser(() => false);
          setCanSave(() => false);        
        }, 50);

        // ctx.apiOnEditUser();
        break;
      case "company":
        
        break;
    
      default:
        break;
    }
  };
  
  //save changes
  const saveUserChangesHandler = (e) => {
    e.preventDefault();
    // console.log("saving changes form");
    const enteredFirstName = firstNameRef.current.value.trim().replace(' ','');
    const enteredLastName = lastNameRef.current.value.trim().replace(' ', '');
    const enteredPermission = e.target[2].validity.valid;

    const newUserObject = {
      FirstName: enteredFirstName != currentFirstName && enteredFirstName != '' ? enteredFirstName : currentFirstName,
      LastName: enteredLastName != currentLastName && enteredLastName != ''  ? enteredLastName : currentLastName,
      EmailAddress: user.emailAddress,
      Permission: enteredPermission,
      CustomerId: userProfileCustomerId,
      id: user.id
    }
    // console.log("user id: ", user.id);
    // console.table("changed user object: ", newUserObject);
    ctx.apiOnEditUser(ctx.loggedInUserID !== -1 ? ctx.loggedInUserID : localStorage.getItem("userId"),newUserObject);
  };

  const saveCompanyChangesHandler = (e) => {
    e.preventDefault();
    // console.log("saving company changes form");
    // const enteredCompanyName = companyNameRef.current.value;
    // const enteredLastName = lastNameRef.current.value;
    // const enteredPermission = e.target[2].validity.valid;
    // const newCompanyobject = {
    //   // FirstName: enteredFirstName.trim().replace(' ',''),
    //   // LastName: enteredLastName.trim().replace(' ', ''),
    //   // EmailAddress: user.emailAddress,
    //   // Password: user.Password,
    //   // LastLoginDate: user.LastLoginDate,
    //   // LastLoginIPAddress: user.LastLoginIPAddress,
    //   // Permission: enteredPermission,
    //   // CustomerId: user.CustomerId
    // }
    // console.log("user id: ", user.id);
    // console.log("changed company object: ", newCompanyObject);
    // ctx.apiOnEditUser(ctx.loggedInUserID !== -1 ? ctx.loggedInUserID : localStorage.getItem("userId"),newUserObject);
  };


  const openDeleteUserConfirmModal = (e) => {
    e.preventDefault();
    setShowModal(() => true);
  };

  const deleteUserHandler = (e) => {
    if (e === 'true') {
      ctx.apiOnDeleteUser(userProfileId);
    }
    setShowModal(() => false);
  };


  //######################### Variables #########################//
  const checkifSameUser = (ctx.permission > 0 && (user.id !== parseInt(localStorage.getItem("userId"))));

  if (pictureSource === '') {
    pictureContent = <div style={{fontSize:"2rem", textAlign: "center"}}><strong >Bild saknas</strong></div>
  }
  if (pictureSource !== '') {
    pictureContent = <Card.Img sizes="sm" src={pictureSource}/>;
  }
  const editableContenStyling = {
    color: editUser ?  canSave ? "black" : "gray" : "black",
    border: editUser ? "1px solid #bcbcbc" : "0",
    borderRadius: editUser ? "4px 4px" : "none",
    borderColor: editUser ? "lightblue" : "none",
    outline: editUser ? "initial" : "none",
    textAlignLast: "left",
    // width: "auto"
  }

  //#region Userprofile
  if (ctx.isLoading) {
    userContent = <Spinner style={{textAlign:"center", justifySelf:"center", placeSelf:"center"}}animation="border" variant="primary" />;
  }
  if (!ctx.isLoading && Object.entries(user).length !== 0) {
    userContent =
      <form onSubmit={saveUserChangesHandler}>
      <Card>
        <Card.Body>
      {/* Ändra knapp */}
          {
            loggedInUserPermission > 0 &&
            <Card.Text onClick={changeContentHandler} style={{ color: "blue", pointerEvents: "painted", cursor: "pointer" }}>Ändra</Card.Text>
          }
      {/* Namn */}
        <InputGroup >
          <InputGroup.Prepend>
            <input disabled={!editUser} style={editableContenStyling} type="text" placeholder={`${currentFirstName}`} ref={firstNameRef} className="my-inputgroup-text" onInput={canSavehandler} />
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <input disabled={!editUser} style={editableContenStyling} type="text" placeholder={`${currentLastName}`} ref={lastNameRef} className="my-inputgroup-text" onInput={canSavehandler} />
            </InputGroup.Prepend>
          </InputGroup>
          <hr />
      {/* Innehåll */}
      <InputGroup styl={{justifyContent: "space-between",alignSelf: "center"}}>
        <Card.Subtitle style={{ alignSelf: "center", marginTop: "-0.2rem" }}>Administratör</Card.Subtitle>
        <InputGroup.Prepend style={{ marginLeft: "1rem", alignSelf: "center", placeSelf: "center" }}>
              <Form.Check ref={permissionRef } aria-label="option 1" defaultChecked={user.permission > 0} isValid={user.permission > 0} onClick={canSavehandler} disabled={ !checkifSameUser}/>
        </InputGroup.Prepend>
      </InputGroup>
      <hr />
          <Card.Text><img src="https://icons.iconarchive.com/icons/uiconstock/socialmedia/24/Email-icon.png" />{user.emailAddress}</Card.Text>
          {/* Spara Knapp */}
          <Button value="user" type="submit" disabled={!canSave} variant="primary">Spara</Button>
          {/* Ångra knapp */}
        {
          canSave &&
          <Button value="user" type="reset" onClick={resetFormHandler} variant="primary">Ångra</Button>
        }
          {/* Ta bort användare knapp */}
          {
            checkifSameUser && <Button value="user" type="submit" onClick={openDeleteUserConfirmModal} disabled={ctx.permission === 0} variant="primary">Ta bort</Button>
          }
          </Card.Body>
      </Card>
      </form>
  }
  // Om det inte finns någon data att hämta, visa text
  if (!ctx.isLoading && Object.entries(user).length === 0) {
    userContent = <><Card.Title>Finns ingen data att hämta</Card.Title></>
  }
  //#endregion

  //#region Companies
  if (!ctx.isLoading && Object.entries(allowedCompanies).length !== 0) {
    companyContent =
      <form onSubmit={saveCompanyChangesHandler}>
      <Card>
        <Card.Body>
          {/* Ändra knapp */}
          {
            loggedInUserPermission > 0 &&
            <Card.Text onClick={changeContentHandler} style={{ color: "blue", pointerEvents: "painted", cursor: "pointer" }}>Ändra</Card.Text>
          }
          {/* Företag */}
          {
            ctx.allowedCompanies.length > 0 &&
            ctx.allowedCompanies.map(company => (
              
              <InputGroup >
                <InputGroup.Prepend>
                  
                  <Card.Text style={{ display: "flex", alignItems: "center", outlineColor: "007BFF", marginBottom: "1rem" }}>
                    <FontAwesomeIcon icon={faBuilding} color="#007BFF" />
                    <input style={editableContenStyling} type="text" placeholder={`${company.name}`} className="my-inputgroup-text" onInput={canSavehandler} />
                  </Card.Text>
                </InputGroup.Prepend>
              {/* <InputGroup.Prepend>
                <input disabled={!editUser} style={editableContenStyling} type="text" placeholder={`${lastName}`} ref={lastNameRef} className="my-inputgroup-text" onInput={canSavehandler} />
                </InputGroup.Prepend> */}
             </InputGroup>          
            ))
          }

          {/* Innehåll */}
          <hr />
          {/* Spara Knapp */}
          <Button value="user" type="submit" disabled={!canSave} variant="primary">Spara</Button>
          {/* Ångra knapp */}
          {
            canSave &&
            <Button value="user" type="reset" onClick={resetFormHandler} variant="primary">Ångra</Button>
          }
          {/* Ta bort användare knapp */}
          {
            checkifSameUser && <Button value="user" type="submit" onClick={openDeleteUserConfirmModal} disabled={ctx.permission === 0} variant="primary">Ta bort</Button>
          }
          </Card.Body>
      </Card>
      </form>
  }
  // Om det inte finns någon data att hämta, visa text
  if (!ctx.isLoading && Object.entries(allowedCompanies).length === 0) {
    userContent = <><Card.Title>Finns ingen data att hämta</Card.Title></>
  }
  //#endregion
  
  

    return (
      <>
        {
          showModal === true && (
        <ConfirmModal
          message={"Vill du ta bort användaren?"}
          onConfirm={deleteUserHandler}
        />
        )}
        
        <Link style={{ textDecorationLine: "none", height :"max-content" }} onClick={goBackHandler}>
          <Button className="text-center text-capitalize" onClick={goBackHandler}>Tillbaka</Button>
        </Link>
        <>
          <Toast>
            <Tabs defaultActiveKey="profil" id="uncontrolled-tab-example">
              <Tab eventKey="profil" title="Profil">
                <Card>
                  <>{pictureContent}</>
                  <>{userContent}</>
                </Card>
              </Tab>
              <Tab eventKey="bolag" title="Bolag">
                <Card>
                  <>{pictureContent}</>
                  <>{companyContent}</>
                </Card>
              </Tab>
              <Tab eventKey="avdelning" title="Avdelning">
              <Card>
                  <>{pictureContent}</>
                  <>{"Avdelningar kommer snart"}</>
                </Card>
              </Tab>
            </Tabs>
          </Toast>
        </>
      </>
    );
}

export default UserProfile;
