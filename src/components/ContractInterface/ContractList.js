import React from 'react';
import Contract from "./Contract";
import "../UserInterface/UserList.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { InputGroup } from 'react-bootstrap';


const ContractList = (props) => {
  const ctx = useContext(AuthContext);
  const {contractdata} = props;
  const [showAmountOfContracts, setShowAmountOfContracts] = useState(10);
  const [filteredContracts, setFilteredContracts] = useState(Object.entries(ctx.contracts).length === 0 ? {} : ctx.contracts);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredContracts(() => ctx.contracts);
  }, []);
    //Search
    useEffect(() => {
      if (ctx.contracts.length > 0) {
        setFilteredContracts(() =>
        ctx.contracts.filter((contract) => contract.name.toLowerCase().match(searchTerm.toLowerCase()))
        );
      }
    }, [ctx.contracts,searchTerm]);
  
  const showAmountHandler = (e) => {
    e.preventDefault();
    setShowAmountOfContracts( parseInt(e.target.value));
    //console.log("amount of contracts shown: ", showAmountOfContracts);
  };

  //Spara
  var letters = /^[A-Za-z]+$/;
  const searchChangeHandler = (e) => {setSearchTerm( () => e.target.value);};

  if (contractdata.length === 0) {
    return <h2 className="user-list-fallback">Hittade inga avtal.</h2>;
  }

  const deleteContractClickHandler = (contract) => {
    // return props.onDeleteContract(contract);
  };


  return (
    <>
      {/* Header */}
      <div className="card-header py-3"> <h1 className="m-0 font text-primary">Avtal</h1> </div>

      {/* Body */}
      <div className="card card-body shadow mb-4 overflow-scroll">
        {/* Show amount of users */}
        <div className="col-md-6">
          <div id="datatableLength"></div>
          <label htmlFor="userAmountList">Visa antal avtal</label>
          <select
            name="datatableLength"
            aria-controls="dataTable"
            className="custom-select custom-select-sm form-control form-control-sm"
            id="userAmountList"
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
        {filteredContracts.filter(contract => contract !== null).map((contract) => (
          <div >
            <Contract
              key={contract.id}
              textColor="black"
              contractdata={contract}
              departmentName={"Avdelning"}
              permission={ctx.permission}
              onDeleteContract={deleteContractClickHandler}
            />
            </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(ContractList);
