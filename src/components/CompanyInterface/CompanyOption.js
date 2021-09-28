import React from 'react'

const CompanyOption = (props) => {
    const { companydata } = props;
    return(
        <>
            <option value={companydata.id}>{companydata.name}</option>;
        </>
    )
}
export default CompanyOption;