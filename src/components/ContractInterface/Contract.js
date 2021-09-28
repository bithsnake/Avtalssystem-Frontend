import React from 'react';
import "../UserInterface/User.scss";
import { useState, useContext } from 'react';
import { Button, Table, Card } from "react-bootstrap";
import AuthContext from '../../store/auth-context'
const Contract = (props) => {
  const { contractdata } = props;
  const [editContract, setToggleEditContract] = useState(false);
  const ctx = useContext(AuthContext);

  const deleteContractDataHandler = () => {
    return props.onDeleteContract(props.contractdata.id);
  };
  return (
    <Card
      style={{
        backgroundColor: editContract ? "lightblue" : "white",
        outlineWidth: editContract ? "thick" : "none",
        borderRadius: editContract ? "0.4rem,0.4rem,0,0" : "0",
        boxShadow: editContract ? "black" : "none",
      }}
    >
      <Table
        className="mytable"
        responsive
        variant=""
        striped={true}
        bordereless
        hover={editContract}
        size="sm"
        key={props.contractdata.id}
      >
        {editContract && (
          <Button
            className="remove-button"
            onClick={deleteContractDataHandler}
            type="submit"
          ></Button>
        )}
        <thead>
          <tr>
            {/* <th>Titel</th>
            <th>Morpartens namn</th>
            <th>Kategori</th>
            <th>Avdelning</th>
            <th>Startdatum</th>
            <th>Slutdatum</th>
            <th>Ansvarig</th> */}
            <th>Avdelning</th>
            <th>Titel</th>
            <th>Startdatum</th>
            <th>Slutdatum</th>
            <th>Beskrivning</th>
            <th>Ansvarig</th>
            <th>Motparten namn</th>

          </tr>
        </thead>

        <tbody className="">
          <tr style={{ color: props.textColor }}>
            <td contentEditable={editContract}>{contractdata.departmentId}</td>
            <td contentEditable={editContract}>{contractdata.name}</td>
            <td contentEditable={editContract}>{contractdata.startDate}</td>
            <td contentEditable={editContract}>{contractdata.endDate}</td>
            <td contentEditable={editContract}>{contractdata.description}</td>
            <td contentEditable={editContract}>{contractdata.internalReference}</td>
            <td contentEditable={editContract}>{contractdata.externalReference}</td>
            {/* <td contentEditable={editContract}>{props.contractdata.category}</td> */}

          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
export default Contract;