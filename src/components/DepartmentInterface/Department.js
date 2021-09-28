import "../UserInterface/User.scss";
import { Button, Table, Card } from "react-bootstrap";
import { useState,useContext } from "react";
import AuthContext from '../../store/auth-context';

const Department = (props) => {
  const ctx = useContext(AuthContext);
  const [editDepartment, setToggleEditDepartment] = useState(false);

  const deleteDepartmentDataHandler = () => {
    return props.onDeleteDepartment(props.departmentdata.id);
  };

  return (
    <Card key={props.departmentdata.id} style={{backgroundColor: editDepartment ? "lightblue" : "white", outlineWidth: editDepartment ? "thick" : "none", borderRadius: editDepartment ? "0.4rem,0.4rem,0,0" : "0", boxShadow: editDepartment ? "black" : "none"}}>
      <Table
        className="mytable"
        responsive
        variant=""
        striped={true}
        hover={editDepartment}
        size="sm"
        borderless
        key={props.departmentdata.id}
      >
          {editDepartment && (
          <Button
              className="remove-button"
              onClick={deleteDepartmentDataHandler}
              type="submit"
            ></Button>
          )}

      <thead>
            <tr>
              <th>Avdelning</th>
              <th>Deskrivning</th>
              <th></th>
            </tr>
        </thead>
        
        <tbody className="">
            <tr style={{ color: props.textColor }}>
              <td contentEditable={editDepartment}>
                {props.departmentdata.name}
              </td>
              <td contentEditable={editDepartment}> {props.departmentdata.description}</td>
            </tr>
          </tbody>
        </Table>
    </Card>
  );
};
export default Department;