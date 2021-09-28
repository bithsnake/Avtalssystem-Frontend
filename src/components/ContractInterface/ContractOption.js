import React from 'react'
const ContractOption = (props) => {
    return <option value={props.contractdata.id}>{props.contractdata}</option>;
}
export default ContractOption;