import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CardText } from "reactstrap";

//Manages the entire login and logout state
const AuthContext = React.createContext({
  url: '',
  bypassLogin : false,
  isLoggedIn: false,
  testMode: false,
  loggedInUserObject: '',
  formIsValid: true,
  permission : false,
  isLoading: true,
  startTimer: false,
  loggedInUserID: -1,
  companyId: -1,
  customerId: -1,
  responseData: {},
  tokenString: "",
  users: [],
  user : {},
  userProfile : {},
  userProfileId : -1,
  allowedUsers : [],
  allowedCompanies : [],
  companies: [],
  contracts: [],
  departments: [],
  dummyusers : [],
  //Get specific
  apiOnGetUser: (userId) => {},
  apiOnGetUserId: () =>{},
  apiOnGetCompanyId: () => { },
  apiOnGetAllowedUsers: () => {},
  apiOnGetAllowedCompanies: (profileId) => {},
  apiOnGetUserProfile: () => {},
  apiOnGetUserProfileId: (userid) => {},
  apiGetLoggedInUserData: (userid) => {},
  //GetAll
  apiOnGetAllUsers: () => { },
  apiOnGetAllCompanies: () => { },
  apiOnGetAllDepartments: () => {},
  apiOnGetAllContracts: () => { },
  //Add
  apiOnAddUser: () => { },
  apiOnAddCompany: () => { },
  apiOnAddDepartment: () => { },
  apiOnAddContract: () => { },
  //Delete
  apiOnDeleteUser: () => { },
  apiOnDeleteCompany: () => { },
  apiOnDeleteDepartment: () => { },
  apiOnDeleteContract: () => { },
  //Edit
  apiOnEditUser: () => { },
  apiOnEditCompany: () => { },
  apiOnEditDepartment: () => { },
  apiOnEditContract: () => { },
  checkIsAlive: () => {},
  onLogout: () => {},
  onSetUserIsAdmin: () => {},
  onLoginError: () => {},
  onLogin: (token) => {},
  apiLoginHandler: (
    mailAdress = "",
    password = ""
  ) => {},
  onChooseMenu: () => {},
  apiPostRequestTest: (url = "") => {},
  apiGetRequestTest: (url = "") => {},
  redirect: [<Redirect to="/" />],
});

//Named component export
export const AuthContextProvider = (props) => {

  const [testMode, setTestMode] = useState(false);
  const [bypassLogin, setBypassLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserObject, setLoggedInUserObject] = useState({});
  const [redirect, setRedirection] = useState([]);
  const [isAlive, setIsAvlive] = useState(false);
  const [startTimer, setStartTimer] = useState(true);
  const [loggedInUserID, setLoggedInUserID] = useState(-1);
  const [companyId, setCompanyId] = useState(-1);
  const [customerId, setCustomerId] = useState(-1);
  const [tokenString, setTokenString] = useState("");
  const [permission, setPermission] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [formIsValid, setFormIsValid] = useState(true);
  const [users, setUsers] = useState({});
  const [user, setUser] = useState({});
  const [userProfileId, setUserProfileId] = useState(-1);
  const [userProfile, setUserProfile] = useState({});
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [allowedUsers, setAllowedUsers] = useState([]);
  const [allowedCompanies, setAllowedCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [DUMMY_USERS, SET_DUMMY_USERS] = useState([]);
  const history = useHistory();
  const url = 'http://testapi.asuscomm.com';
  

  useEffect(() => {
    //Bypass the login here
    setBypassLogin(() => true);


    if (bypassLogin === true) {

      SET_DUMMY_USERS(() => [...DUMMY_USERS,
      
      
      ]);
    }
    // console.log("From auth-context isLoggedIn has changed");
    // setRedirection([<Redirect to="/home" />]);
    // history.push("/home");
  }, [isLoggedIn]);

  const logoutHandler = () => {
    // console.log("logged out");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRedirection([<Redirect to="/" />]);
    history.push("/");
  };

  const isUserAdminHandler = () => {
    baseHandler(`${url}/users/${loggedInUserID === -1 ? localStorage.getItem("userId") :loggedInUserID}`, 'GET', null,null, (res) => {
      res.json().then((usersData) => {
        // console.log("setting userpermission from authcontext: " , usersData.permission);
        setPermission( ()=> usersData.permission);
      });
    });
  };

  const loginErrorHandler = () => {
    setFormIsValid(true);
  };

  //Misc
  const checkMovementHandler = () => {
    setIsAvlive(true);
    // console.log("IsAlive");
  };

  //ChooseMenu
  const chooseMenuHandler = (key,id="") => {
    switch (key) {
      case "home":
        history.push("/home");
        sessionStorage.setItem("path", "/home");
        break;
      case "users":
        history.push("/home/users");
        sessionStorage.setItem("path", "/home/users");
        break;
      case "companies":
        history.push("/home/companies");
        sessionStorage.setItem("path", "/home/companies");
        break;
      case "departments":
        history.push("/home/departments");
        sessionStorage.setItem("path", "/home/departments");
        break;
      case "contracts":
        history.push("/home/contracts");
        sessionStorage.setItem("path", "/home/contracts");
        break;
      case "users":
        history.push("/home/users");
        sessionStorage.setItem("path", "/home/users");
        break;
      case "profile":
        history.push(`/home/users/profile/${id}`);
        sessionStorage.setItem("path", `/home/users/profile/${id}`);
        break;
    
      default:
        break;
    }
  }

  //API TEST
  const apiGetTestHandler = (url = "") => {
    apiGetAllUsersHandler();
  };

  const apiPostTestHandler = () => {
    const data = {
      emailAddress: "kimmo.savilampi@gmail.com",
      password: "0391ddb7f",
    };
    fetch(`${url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log("login test sucessful: ", response);
    });
  };


  //########################### BASE HANDLER ##################################//
  const baseHandler = async(url, method, userId = null, dataBody = null, res) => {
    const token = localStorage.getItem("token");
    setIsLoading(() => true);
    
    if (method !== 'GET') {
      fetch(`${url}`, {
        method: method,
        mode: "cors",
        headers: { "Content-Type": "application/json", "token": token },
        body: JSON.stringify(dataBody)
      })
        .then(res)
        .catch((error) => {
          console.log(error);
          setIsLoading(() => false);
        });
    } else {
      fetch(`${url}`, {
        method: method,
        mode: "cors",
        headers: { "Content-Type": "application/json", "token": token },  
    })
      .then(res)
      .catch((error) => {
      console.log(error);
      setIsLoading(() => false);
    });    
   }       

  };
  //########################### BASE HANDLER ##################################//
  
  //Logged in user
  
  
  //#region api GET

  const apiGetLoggedInUserDataHandler = (userId) => {
    baseHandler(`${url}/users/${userId}`, 'GET', null, null, (res) => {
      res.json().then((userData) => {
        const nameData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
        }
        // console.table("apiGetLoggedInUserDataHandler: " ,userData);
        setLoggedInUserObject(() => nameData);
      }
      );
    });
  };
  //Users
  const apiGetAllUsersHandler = () => {
    baseHandler(`${url}/users`, 'GET', null,null, (res) => {
      res.json().then((usersData) => {
          if (res.status === 200) {
            // console.table("apiGetAllUsersHandler: ", usersData);
            setUsers(() => usersData);
            setIsLoading(() => false);
          }
        }
      );
    });
  };
  const apiGetUserHandler = (userId) => {
    baseHandler(`${url}/users/${userId}`, 'GET', userId,null, (res) => {
      if (res.status === 200)
      {
        res.json().then((userData) =>
        {
          // console.table("userData from apiGetUserHandler",userData);
          setUser(() => userData);
          }
        );
      }
    });      
  };
  const apiGetUserIdHandler = () => {
    baseHandler(`${url}/users/${localStorage.getItem("userId")}`, 'GET', null,null, (res) => {
      if (res.status === 200) {
        res.json().then((usersData) => {
          // console.table("userId from apiGetUserHandler", usersData.id);
          setLoggedInUserID(usersData.id)
          setIsLoading(() => false);
        }
        );
      }
    });
  };
  const apiGetUserProfileHandler = (userId) => {
    baseHandler(`${url}/users/${userId}`, 'GET', userId,null, (res) => {
      res.json().then( (userProfileData) => {
        if (res.status === 200) {
          // console.table("apiGetUserProfileHandler: getting userid was succesful: ", userProfileData);
          setUserProfile(() => userProfileData);
          setUserProfileId(() => userProfileData.id);
          setIsLoading(() => false);
        };
      });
    });
  };
  const apiGetUserProfileIdHandler = (userId) => {
    baseHandler(`${url}/users/${userId}`, 'GET', userId,null, (res) => {
      res.json().then( (userProfileData) => {
        if (res.status === 200) {
          // console.table("apiGetUserProfileIdHandler : getting userid was succesful: ", res);
          setUserProfileId(() => userProfileData.id);
          setIsLoading(() => false);
        };
      });
    });
  };

  //Companies
  const apiGetCompanyIdHandler = (userId) => {
    baseHandler(`${url}/companies/${loggedInUserID !== -1 ? loggedInUserID : localStorage.getItem("userId")}`, 'GET', userId,null, (res) => {
      res.json().then( (companyData) => {
        if (res.status === 200) {
          // console.table("apiGetCompanyIdHandler: getting companyId was succesful: ", companyData);
          setCompanyId(companyData.id);
          setIsLoading(() => false);
        };
      });
    });
  };
  const apiGetAllowedUsers = () => {
    const comID = companyId !== -1 ? companyId : localStorage.getItem("companyId");
    baseHandler(`${url}/companies/${comID}/allowedusers`, 'GET', null,null, (res) => {
      res.json().then( (allowedUsers) => {
        if (res.status === 200) {
          // console.table("apiGetAllowedUsers: allowed users from function apiGetAllowedUsers: ", allowedUsers);
          setAllowedUsers(() => allowedUsers);
          setIsLoading(() => false);
        };
      });
    });
  };
  const apiGetAllCompaniesHandler = () => {
    baseHandler(`${url}/companies`, 'GET', null,null, (res) => {
      res.json().then((companies) => {
        if (res.status === 200) {
            setCompanies(() => companies);
            // console.table("apiGetAllCompaniesHandler :", companies);
            setIsLoading(() => false);    
        };
      });
    });
  };
  
  const apiGetAllowedCompanies = () => {
    baseHandler(`${url}/companies?userId=${ userProfileId !== -1 ? userProfileId :  localStorage.getItem("selectedUserId")}`, 'GET', null,null, (res) => {
      res.json().then( (companies) => {
        if (res.status === 200) {
          // console.table("apiGetAllowedUsers: allowed users from function apiGetAllowedUsers: ", companies);
          setAllowedCompanies(() => companies);
          setIsLoading(() => false);
        };
      });
    });
  };

  //Departments
  const apiGetAllDepartmentsHandler = () => {
    baseHandler(`${url}/departments`, 'GET', null,null, (res) => {
      res.json().then( (departments) => {
        if (res.status === 200) {
            setDepartments(() => departments);
            // console.table("apiGetAllDepartmentsHandler :", departments);
            apiGetCompanyIdHandler();
            setIsLoading(() => false);
          };
      });
    });
  };

  //Contracts
  const apiGetAllContractsHandler = () => {
    baseHandler(`${url}/contracts`, 'GET', null,null,(res) => {
      res.json().then( (contracts) => {
        if (res.status === 200) {
            setContracts(() => contracts);
            // console.table("apiGetAllContractsHandler :", contracts);
            setIsLoading(() => false);
          };
      });
    });
  };



  //#endregion

  //#region api POST
  //Login
  const apiLoginHandler = (mailAddress = "", password = "") => {
    if (bypassLogin === true && mailAddress === "test@test.com" && password === "test123") {
      chooseMenuHandler("home");
    }
    const data = {
          emailAddress: mailAddress,
          password: password,
    };

    baseHandler(`${url}/login`, 'POST', null, data, (res) => {
      res.json().then((data) => {
        
        if (res.status === 201) {
          //TokenString
          setTokenString( () => data.tokenString);
          localStorage.setItem("token", data.tokenString);
          //Save user
          apiGetLoggedInUserDataHandler(data.userId);
          //Response data
          // console.log("response data when logged in from auth context: ", data);
          setResponseData(() => data);
          //permission
          setPermission(() => data.permission);
          //UserId
          localStorage.setItem("userId", data.userId);
          setLoggedInUserID(() => data.userId);
          //CustomerId
          setCustomerId( ()=> data.customerId);
          localStorage.setItem("CustomerId", data.customerId);
          //GetAllUsers (Test)
          apiGetAllUsersHandler();
          apiGetAllCompaniesHandler();
          apiGetAllDepartmentsHandler();
          apiGetAllContractsHandler();
          apiGetUserHandler(data.userId);
          setUserProfileId(() => data.userId);
          // history.push("/home");
          setIsLoading(() => false);
          setStartTimer(() => true);
          chooseMenuHandler("home");
          return;
        };

        if (res.status === 401) {
          console.log(res.status);
          console.log("non valid form, 401 unauthorized: ", res);
          setIsLoading(() => false);
          setFormIsValid(false);
          return;
        };

      }).catch((error) => {
        console.log(error);
        setIsLoading(() => false);
      });
  });
  
  };

  //ADD
  const apiAddCompanyHandler = (companyObject) => {

    baseHandler(`${url}/companies`, 'POST', null, companyObject, (res) => {      
      if (res.status === 201) {
        apiGetAllCompaniesHandler();
        setIsLoading(() => false);
        // console.log("success:", res);
      }
      if (res.status === 401) {
        console.log("add company 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiAddDepartmentHandler = (departmentObject) => {
    baseHandler(`${url}/departments`, 'POST', null, departmentObject, (res) => {      
      if (res.status === 201) {
        apiGetAllDepartmentsHandler();
        setIsLoading(() => false);
        // console.log("success:", res);
      }
      if (res.status === 401) {
        console.log("add department 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiAddUserHandler = (userObject) => {
    baseHandler(`${url}/users`, 'POST', null, userObject, (res) => {      
      if (res.status === 201) {
        apiGetAllUsersHandler();
        // console.log("success:", res);
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("add user 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("add user 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiAddContractHandler = (contractObject) => {
    baseHandler(`${url}/contracts`, 'POST', null, contractObject, (res) => {      
      if (res.status === 201) {
        // console.log("success:", res);
        apiGetAllContractsHandler();
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("add contract 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("add contract 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  //#endregion

  //#region api DELETE
  const apiDeleteUserHandler = (userid) => {
    baseHandler(`${url}/users/${userid}`, 'DELETE', null, null, (res) => {      
      if (res.status === 204) {
        apiGetAllUsersHandler();
        // console.log("deletion was a success:", res);
        history.push("/home/users");
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("delete user 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("delete user 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiDeleteCompanyHandler = (customerid) => {
    baseHandler(`${url}/companies/${customerid}`, 'DELETE', null, null, (res) => {      
      if (res.status === 204) {
        apiGetAllCompaniesHandler();
        // console.log("success:", res);
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("delete company 401: ", res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("delete company 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiDeleteDepartmentHandler = (companyid) => {
    baseHandler(`${url}/departments/${companyid}`, 'DELETE', null, null, (res) => {      
      if (res.status === 204) {
        apiGetAllDepartmentsHandler();
        // console.log("success:", res);
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("delete department 401 unauthorized: " , res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("delete department 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  const apiDeleteContractHandler = (companyid) => {
    baseHandler(`${url}/contracts/${companyid}`, 'DELETE', null, null, (res) => {      
      if (res.status === 201) {
        apiGetAllUsersHandler();
        // console.log("success:", res);
        setIsLoading(() => false);
      }
      if (res.status === 401) {
        console.log("delete contract 401 unauthorized: ", res);
        setIsLoading(() => false);
      }
      if (res.status === 400) {
        console.log("delete contract 400 bad request: ", res);
        setIsLoading(() => false);
      }
    });
  };
  //#endregion

  //#region api PUT
  const apiEditUserHandler = (userid, object) => {
    baseHandler(`${url}/users/${userid}`, 'PUT', null, object, (res) => {      
      // console.log("from authcontext: response from api when editing a user:", res);
      if (res.status === 204) {
        apiGetAllUsersHandler();
        // console.log("useredit was a success:", res);
      }
      if (res.status === 401) {console.log("edit user 401 unauthorized: " , res);}
      if (res.status === 400) {console.log("edit user 400 bad request: " , res);}
    });
  };
  const apiEditCompanyHandler = (companyId,object) => {
    baseHandler(`${url}/companies/${companyId}`, 'PUT', null, object, (res) => {      
      // console.log("from authcontext: response from api when editing a company:", res);
      if (res.status === 204) {
        apiGetAllCompaniesHandler();
        // console.log("companyedit was a success:", res);
      }
      if (res.status === 401) {console.log("edit company 401 unauthorized: " , res);}
      if (res.status === 400) {console.log("edit company 400 bad request: " , res);}
    });
  };
  const apiEditDepartmentHandler = (departmendId,object) => {
    baseHandler(`${url}/departments/${departmendId}`, 'PUT', null, object, (res) => {      
      // console.log("from authcontext: response from api when editing a company:", res);
      if (res.status === 204) {
        apiGetAllDepartmentsHandler();
        console.log("editdepartments was a success:", res);
      }
      if (res.status === 401) {console.log("edit department 401 unauthorized: " , res);}
      if (res.status === 400) {console.log("edit department 400 bad request: " , res);}
    });
  };
  const apiEditContractHandler = (contractId,object) => {
    baseHandler(`${url}/departments/${contractId}`, 'PUT', null, object, (res) => {      
      // console.log("from authcontext: response from api when editing a company:", res);
      if (res.status === 204) {
        apiGetAllDepartmentsHandler();
        // console.log("editdepartments was a success:", res);
      }
      if (res.status === 401) {console.log("edit contract 401 unauthorized: " , res);}
      if (res.status === 400) {console.log("edit contract 400 bad request: " , res);}
    });
  };
  //#endregion

  return (
    <AuthContext.Provider
      value={{
        url: url,
        bypassLogin: bypassLogin,
        testMode: testMode,
        isLoggedIn: isLoggedIn,
        loggedInUserObject: loggedInUserObject,
        permission : permission,
        isLoading: isLoading,
        startTimer : startTimer,
        loggedInUserID: loggedInUserID,
        companyId: companyId,
        customerId: customerId,
        formIsValid: formIsValid,
        redirect: redirect,
        isAlive: isAlive,
        responseData: responseData,
        tokenString: tokenString,
        users: users,
        user: user,
        userProfile: userProfile,
        userProfileId: userProfileId,
        allowedUsers: allowedUsers,
        allowedCompanies: allowedCompanies,
        companies: companies,
        contracts: contracts,
        departments: departments,
        dummyusers: DUMMY_USERS,
        //Get specific
        apiLogin: apiLoginHandler,
        onLoginError: loginErrorHandler,
        onSetUserIsAdmin: isUserAdminHandler,
        apiOnGetUserId: apiGetUserIdHandler,
        apiOnGetCompanyId: apiGetCompanyIdHandler,
        apiOnGetAllowedUsers: apiGetAllowedUsers,
        apiOnGetAllowedCompanies: apiGetAllowedCompanies,
        apiOnGetUserProfile: apiGetUserProfileHandler,
        apiOnGetUserProfileId: apiGetUserProfileIdHandler,
        apiGetLoggedInUserData: apiGetLoggedInUserDataHandler,
        apiOnGetUser: apiGetUserHandler,
        //Get all
        apiOnGetAllUsers: apiGetAllUsersHandler,
        apiOnGetAllCompanies: apiGetAllCompaniesHandler,
        apiOnGetAllDepartments: apiGetAllDepartmentsHandler,
        apiOnGetAllContracts: apiGetAllContractsHandler,
        //Add
        apiOnAddUser: apiAddUserHandler,
        apiOnAddCompany: apiAddCompanyHandler,
        apiOnAddDepartment: apiAddDepartmentHandler,
        apiOnAddContract: apiAddContractHandler,
        //Delete
        apiOnDeleteUser: apiDeleteUserHandler,
        apiOnDeleteCompany: apiDeleteCompanyHandler,
        apiOnDeleteDepartment: apiDeleteDepartmentHandler,
        apiOnDeleteContract: apiDeleteContractHandler,
        //Edit
        apiOnEditUser: apiEditUserHandler,
        apiOnEditCompany: apiEditCompanyHandler,
        apiOnEditDepartment: apiEditDepartmentHandler,
        apiOnEditContract: apiEditContractHandler,

        //local
        onChooseMenu : chooseMenuHandler,
        checkIsAlive: checkMovementHandler,
        onLogout: logoutHandler,
        apiPostRequestTest: apiPostTestHandler,
        apiGetRequestTest: apiGetTestHandler,
      }}
    >
      {/* Display all child compontents */}
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;