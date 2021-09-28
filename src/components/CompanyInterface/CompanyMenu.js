import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import NewCompany from "./NewCompany";
import CompanyList from "./CompanyList";
import AuthContext from "../../store/auth-context";

const CompanyMenu = (props) => {
  const ctx = useContext(AuthContext);
  const [switchCompanyInterface, setSwitchCompanyInterface] = useState(false);
  const [currentCompanies, setCurrentCompanies] = useState(ctx.companies);
  let buttonText = switchCompanyInterface ? "Tillbaka" : "Lägg till bolag";

  useEffect(() => {
    ctx.onSetUserIsAdmin();
    return ctx.apiOnGetAllCompanies();
  }, []);

  useEffect(() => {
    //console.log("companies changed");
    setCurrentCompanies( (prev) => prev.length !== ctx.companies.length ? ctx.companies : prev);
  }, [ctx.companies]);

  const toggleAddCompanyForm = () => {
    setSwitchCompanyInterface(!switchCompanyInterface);
  };

  const deleteCompanyClickHandler = (user) => {
    return props.onDeleteCompany(user);
  };

  const updateCompanyList = () => {
    // ctx.apiOnGetAllUsers();
    toggleAddCompanyForm();
  }


  return (
    <>
    <div className="container-fluid">
      {
        ctx.user.permission > 0 &&
        <Button
        className="btn-group-toggle"
        type="button"
        onClick={toggleAddCompanyForm}
      >
        {buttonText}
      </Button>
      }

        {
          switchCompanyInterface && (
            <NewCompany
              key={ctx.companies.id}
              companydata={ctx.companies}
              onAddedCompany={updateCompanyList}
            />
          )
        }
        
        {
          ctx.companies.length > 0 &&
          (
            <CompanyList
              key={ctx.companies.id}
              onDeleteCompany={deleteCompanyClickHandler}
              editCompany={ctx.permission}
              companydata={currentCompanies}
            />
          )
        }
      </div>
      </>
  );
};
export default React.memo(CompanyMenu);
