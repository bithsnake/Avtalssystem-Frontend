import React from 'react'
const DepartmentOption = (props) => {
    return <option value={props.departmentdata.id}>{props.departmentdata}</option>;
}
export default DepartmentOption;