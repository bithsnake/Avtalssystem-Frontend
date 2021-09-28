import React from 'react';
import CompanyOption from '../CompanyInterface/CompanyOption';
import '../../CSS/filter.css';
const ContractFilter = (props) => {

  const dropDownChangehandler = (event) => {
    props.onChangeFilter(event.target.value);
    // console.log(event.target.value);
  }

  return (
    <div className='user-filter'>
      <div className='user-filter user-filter__control'>
          <label  color ="black" htmlFor="companyfilter"> Sortera på bolag</label>
            <select name="companyfilter" id="companyfilter" value={props.selected} onChange={dropDownChangehandler}>
              {
                  props.companydata.map( (company) => (
                  <CompanyOption key={company.id } companydata={company} />
                ))
              }
            </select>
      </div>
    </div>
  );
};

export default ContractFilter;