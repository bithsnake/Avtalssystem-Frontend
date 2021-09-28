import { useEffect, useContext} from 'react';
import UserForm from "./UserForm";
import "./NewUser.css";
import AuthContext from '../../store/auth-context';
const NewUser = (props) => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    // ctx.apiOnGetAllowedUsers(1);
    ctx.apiOnGetAllCompanies();
    // console.log("customer id from new user: ", ctx.user.customerId);
  },[])
  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData, 
    };
    //console.log("newUserObject: ", userData);
    ctx.apiOnAddUser(userData);
    props.onAddedUser();
  };
  return (
    <div className="new-user">
      {
        props.companydata.length > 0 &&
      <UserForm
        companydata={props.companydata}
        onSaveUserData={saveUserDataHandler}
        customerId = {ctx.user.customerId !== undefined ? ctx.user.customerId : localStorage.getItem("customerId")}
      />
      }
    </div>
  );
};

export default NewUser;
