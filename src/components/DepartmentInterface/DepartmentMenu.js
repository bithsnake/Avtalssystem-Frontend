import DepartmentList from "./DepartmentList";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext} from "react";
import NewDepartment from "./NewDepartment";
import AuthContext from '../../store/auth-context';

const DepartmentMenu = (props) => {
  const ctx = useContext(AuthContext);
  const [switchNewDepartmentInterface, setSwitchNewDepartmentInterface] = useState(false);
  const [currentDepartments, setCurrentDepartments] = useState(ctx.departments);

  useEffect(() => {
    ctx.onSetUserIsAdmin();
    return ctx.apiOnGetAllDepartments();
  }, []);

  useEffect(() => {
    //console.log("departments changed");
    setCurrentDepartments( (prev) => prev.length !== ctx.departments.length ? ctx.departments : prev);
  }, [ctx.departments]);


  let buttonText = switchNewDepartmentInterface === true ? "Tillbaka" : "Lägg till avdelning";
  
  const toggleAddDepartmentForm = () => {
    setSwitchNewDepartmentInterface( !switchNewDepartmentInterface);
  };

  const onAddDepartmentHandler = (newdepartment) => {
    props.onAddDepartment(newdepartment);
  };

  const deleteDepartmentClickHandler = (department) => {
    return props.onDeleteDepartment(department);
  };

  const updateDepartmentList = () => {
    toggleAddDepartmentForm();
  }

  return (
    <>
    <div className="container-fluid">
      {
        ctx.user.permission > 0 &&
        <Button
        className="btn-group-toggle"
        type="button"
        onClick={toggleAddDepartmentForm}
      >
        {buttonText}
      </Button>
      }
      {switchNewDepartmentInterface && (
        <NewDepartment
          departmentdata={ctx.departments}
          key={ctx.departments.id}
          companydata={ctx.companies}
            onAddDepartment={onAddDepartmentHandler}
            onAddedDepartment={updateDepartmentList}
        />
        )}
        {
          ctx.departments.length > 0 &&
          (
            <DepartmentList
              key={ctx.departments.id}
              onDeleteDepartment={deleteDepartmentClickHandler}
              departmentdata={currentDepartments}
            />
          )
        }
      </div>
      </>
  );
};
export default DepartmentMenu;