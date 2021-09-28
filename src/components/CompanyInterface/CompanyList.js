import { useState, useEffect, useContext} from 'react';
import Company from "./Company";
import "../UserInterface/UserList.css";
import "react-bootstrap";
import {Card,InputGroup} from 'react-bootstrap';
import AuthContext from '../../store/auth-context'


const CompanyList = (props) => {
  const ctx = useContext(AuthContext);
  const [showAmountOfCompanies, setShowAmountOfCompanies] = useState(10);
  const [filteredCompanies, setFilteredCompanies] = useState(Object.entries(ctx.companies).length === 0 ? {} : ctx.companies);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    setFilteredCompanies(() => ctx.companies);
  }, []);

    //Search
    useEffect(() => {
      if (ctx.companies.length > 0) {
        setFilteredCompanies(() =>
        ctx.companies.filter((company) => company.name.toLowerCase().match(searchTerm.toLowerCase()))
        );
      }
    }, [ctx.companies,searchTerm]);
  
  
  const showAmountHandler = (e) => {
    e.preventDefault();
    setShowAmountOfCompanies(() => parseInt(e.target.value));
  };

  //Spara
  var letters = /^[A-Za-z]+$/;
  const searchChangeHandler = (e) => {setSearchTerm( () => e.target.value);};

  if (props.companydata.length === 0) {
    return <h2 className="user-list-fallback">Hittade inga bolag.</h2>;
    }
    
  const deleteCompanyClickHandler = (company) => {
    ctx.apiOnDeleteCompany(company);
    return;
  };
  
  return (
    <>
      {/* Header */}
      <div className="card-header py-3"> <h1 className="m-0 font text-primary">Bolag</h1> </div>
      {/* Body */}
      <div className="card card-body shadow mb-4 overflow-scroll">
      {/* Show amount of companies */}
      <div className="col-md-6">
          <div id="datatableLength"></div>
          <label htmlFor="userAmountList">Visa antal bolag</label>
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
      <ul className="user-list">
        {filteredCompanies.filter(company => company !== null).map((company) => (
          <Card key={company.id}>
            <Company
              textColor="black"
              editCompany={props.editCompany}
              companydata={company}
              permission={ctx.permission}
              onDeleteCompany={deleteCompanyClickHandler}
            />
          </Card>
        ))}
          </ul>
      </div>
    </>
  );
};

export default CompanyList;