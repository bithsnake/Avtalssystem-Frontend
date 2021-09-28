import React from 'react';
import CompanyOption from '../CompanyInterface/CompanyOption';
import '../UserInterface/UserFilter.css';
const DepartmentFilter = (props) => {

  const dropDownChangehandler = (event) => {
    props.onChangeFilter(event.target.value);
    // console.log(event.target.value);
  }

  return (
    <div className='user-filter'>
      <div className='user-filter user-filter__control'>
          <label  color ="black" htmlFor="companyfilter"></label>
            <select name="companyfilter" id="companyfilter" value={props.selected} onChange={dropDownChangehandler}>
              {
                // WORKS
                  props.companydata.map( (companyoptions) => (
                  <CompanyOption key={companyoptions.id } companydata={companyoptions} />
                ))
              }
            </select>
      </div>
    </div>
  );
};

export default DepartmentFilter;