import CompanyForm from "./CompanyForm";
import "../UserInterface/NewUser.css";
import AuthContext from '../../store/auth-context';
import { useContext} from 'react';
const NewCompany = (props) => {
  const ctx = useContext(AuthContext);
  const saveCompanyDataHandler = (enteredCompanyData) => {
    const userId = ctx.loggedInUserID === -1 ? localStorage.getItem("userId") : ctx.loggedInUserID;
    const token = ctx.tokenString !== '' ? ctx.tokenString : localStorage.getItem("token");
    let url = `${ctx.url}/users/${userId}`;
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((response) => response.json())
      .then((data) => {
        const companyData = {
          ...enteredCompanyData,
          CustomerId: ctx.customerId !== -1 ? ctx.customerId : localStorage.getItem("CustomerId"),
        };
        ctx.apiOnAddCompany(companyData);
        props.onAddedCompany();
      })
      .catch((error) => console.log("error log from NewCompany: ", error));
  };
  return (
    <div className="new-user">
      <CompanyForm
        onGetCompany={props.companydata}
        onSaveCompanyData={saveCompanyDataHandler}
      />
    </div>
  );
};
export default NewCompany;