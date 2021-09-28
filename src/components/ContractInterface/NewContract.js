import { useContext } from 'react';
import ContractForm from './ContractForm';
import '../UserInterface/NewUser.css';
import AuthContext from '../../store/auth-context';

const NewContract = (props) => {
  const ctx = useContext(AuthContext);
    const saveContractDataHandler = (enteredContractData) => {
        const contractData = {
            ...enteredContractData,
      };
      //console.log("Adding following contract data from Contract.js: ", contractData);
      ctx.apiOnAddContract(contractData);
      props.onAddedContract();
    };


    return (
      <div className="new-user" >
        <ContractForm
          contractdata={props.contractdata}
          onGetContract={props.contractdata}
          onGetCompany={props.companydata}
          departmentdata={props.departmentdata}
          onSaveContractData={saveContractDataHandler}
          onFormClose={props.onFormClose}
        />
      </div>
    );
}

export default NewContract;