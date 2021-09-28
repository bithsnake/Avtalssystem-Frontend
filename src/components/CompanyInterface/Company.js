import React from "react";
import { useState } from "react";
import "../UserInterface/User.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card } from "react-bootstrap";

const Company = (props) => {
  const [editCompany, setToggleEditCompany] = useState(false);

  return (
    <Card
      key={props.companydata.id}
      style={{
        backgroundColor: editCompany ? "lightblue" : "white",
        outlineWidth: editCompany ? "thick" : "none",
        borderRadius: editCompany ? "0.4rem,0.4rem,0,0" : "0",
        boxShadow: editCompany ? "black" : "none",
      }}
    >
      <Table
        className="mytable"
        responsive
        variant=""
        striped={true}
        bordereless
        hover={editCompany}
        size="sm"
        key={props.companydata.id}
      >
        <thead>
          <tr>
            <th>Bolag</th>
            <th>Adress</th>
            <th>Postnummer</th>
            <th>Stad</th>
            <th>Kontor telefon</th>
            <th>Support Telefon</th>
            <th>Support Mailadress</th>
          </tr>
        </thead>

        <tbody className="">
          <tr style={{ color: props.textColor }}>
            <td contentEditable={editCompany}>{props.companydata.name} </td>
            <td contentEditable={editCompany}>{props.companydata.address} </td>
            <td contentEditable={editCompany}>{props.companydata.postCode} </td>
            <td contentEditable={editCompany}>{props.companydata.city} </td>
            <td contentEditable={editCompany}>
              {props.companydata.phoneNumber}{" "}
            </td>
            <td contentEditable={editCompany}>
              {props.companydata.phoneNumber}{" "}
            </td>
            <td contentEditable={editCompany}>
              {`admin@${props.companydata.name
                .trim()
                .replace(/ /g, "")
                .replaceAll("å", "a")
                .replaceAll("ä", "a")
                .replaceAll("ö", "o")
                .toLowerCase()}.se`}{" "}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
export default Company;