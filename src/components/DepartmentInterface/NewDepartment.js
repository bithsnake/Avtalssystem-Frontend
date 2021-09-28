import DepartmentForm from "./DepartmentForm";
import "../UserInterface/NewUser.css";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const NewDepartment = (props) => {
  const ctx = useContext(AuthContext);

  const saveDepartmentDataHandler = (enteredDepartmentData) => {
    //Department object
    //console.log("companyid: ", ctx.companyId);
    const departmentData = {
      ...enteredDepartmentData,
      companyId: ctx.companyId,
    };
    //Add department
    ctx.apiOnAddDepartment(departmentData);
    props.onAddedDepartment();
  };
  return (
    <div className="new-user">
      <DepartmentForm
        onGetDepartment={props.departmentData}
        onSaveDepartmentData={saveDepartmentDataHandler}
      />
    </div>
  );
};

export default NewDepartment;
