import React from 'react'

const ContractCategoryOption = (props) => {
    return <option key={Math.random() * 1000 + 1} value={props.contractdata.category}>{props.contractdata.category}</option>;
}
export default ContractCategoryOption;