import ContractList from "./ContractList";
import NewContract from "./NewContract";
import AuthContext from "../../store/auth-context";
import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";

const ContractMenu = () => {
  const ctx = useContext(AuthContext);
  const [switchAddNewContractInterface, setSwitchAddNewContractInterface] = useState(false);
  const [currentContracts, setCurrentContracts] = useState(ctx.contracts);

  useEffect(() => {
    ctx.apiOnGetAllDepartments();
    ctx.apiOnGetUser(localStorage.getItem("userId"));
    ctx.onSetUserIsAdmin();
    return ctx.apiOnGetAllContracts();
  }, []);

  useEffect(() => {
    //console.log("contracts changed");
    setCurrentContracts( (prev) => prev.length !== ctx.contracts.length ? ctx.contracts : prev);
  }, [ctx.contracts]);


  let buttonText = switchAddNewContractInterface === true ? "Tillbaka" : "Lägg till avtal";

  const toggleAddContractForm = () => {
    setSwitchAddNewContractInterface(!switchAddNewContractInterface);
  };

  const updateCompanyList = () => {

    toggleAddContractForm();
  }
  
  return (
    <>
    <div className="container-fluid">
      {
        ctx.user.permission > 0 && (
        <Button
          className="btn-group-toggle"
          type="button"
          onClick={toggleAddContractForm}
        >
          {buttonText}
        </Button>
      )}
      {switchAddNewContractInterface && (
        <NewContract
          contractdata={ctx.contracts}
            onFormClose={toggleAddContractForm}
            onAddedContract={updateCompanyList}
        />
        )}
        {
          ctx.contracts.length > 0 &&
          (
            <ContractList
              departmentdata={ctx.departments}
              contractdata={currentContracts}
            />
          )
        }
      </div>
      // </>
  );
};
export default ContractMenu;