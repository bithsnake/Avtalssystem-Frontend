import React from 'react';
const ContractTypeOption = (props) => {
    return <option value={props.contracttype.type}>{props.contracttype.type}</option>;
}
export default ContractTypeOption;