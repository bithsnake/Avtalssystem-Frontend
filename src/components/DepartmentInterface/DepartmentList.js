import Department from "./Department";
import "../UserInterface/UserList.css";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { InputGroup } from 'react-bootstrap';

const DepartmentList = (props) => {
  // const {departmentdata}  = props;
  const ctx = useContext(AuthContext);
  const [showAmountOfDepartments, setShowAmountOfDepartments] = useState(10);
  const [filteredDepartments, setFilteredDepartments] = useState(Object.entries(ctx.departments).length === 0 ? {} : ctx.departments);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredDepartments(() => ctx.departments);
  }, []);

    //Search
    useEffect(() => {
      if (ctx.departments.length > 0) {
        setFilteredDepartments(() =>
        // { return run.filterdata(userdata, userdata.firstName, searchTerm);}
        ctx.departments.filter((company) => company.name.toLowerCase().match(searchTerm.toLowerCase()))
        );
      }
    }, [ctx.departments,searchTerm]);
  const showAmountHandler = (e) => {
    e.preventDefault();
    setShowAmountOfDepartments(e.target.value);
    //console.log("amount of companies shown: ", showAmountOfDepartments);
  };

  // Spara till senare
  // var letters = /^[A-Za-z]+$/;
  const searchChangeHandler = (e) => {setSearchTerm( () => e.target.value);};


  if (ctx.departments.length === 0) {
    return <h2 className="user-list-fallback">Hittade inga avdelningar.</h2>;
  }

  const deleteDepartmentClickHandler = (department) => {
    ctx.apiOnDeleteDepartment(department);
    return;
  };

  return (
    <>
      {/* Header */}
      <div className="card-header py-3"> <h1 className="m-0 font text-primary">Avdelningar</h1> </div>

      {/* Body */}
      <div className="card card-body shadow mb-4 overflow-scroll">
        {/* Show amount of companies */}
        <div className="col-md-6">
          <div id="datatableLength"></div>
          <label htmlFor="userAmountList">Visa antal avdelningar</label>
          <select
            name="datatableLength"
            aria-controls="dataTable"
            className="custom-select custom-select-sm form-control form-control-sm"
            id="userAmountList"
            onChange={showAmountHandler}
          >
            <option value="1" onChange={showAmountHandler}>
              1
            </option>
            <option value="2" onChange={showAmountHandler}>
              2
            </option>
            <option value="5" onChange={showAmountHandler}>
              5
            </option>
            <option value="10" onChange={showAmountHandler}>
              10
            </option>
            <option value="15" onChange={showAmountHandler}>
              15
            </option>
          </select>
        </div>
        {/* Search Filter */}
        <div className="col-md-6">
          <div className="dataTable_filter" id="dataTable_filter">
            <label htmlFor="">
              Sök:
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text as="input" type="search" placeholder="sök.." onChange={searchChangeHandler}/>
                </InputGroup.Prepend>
              </InputGroup>
            </label>
          </div>
        </div>
        {/* Departments */}
        {filteredDepartments.filter(department => department !== null).map((department) => (
          <div  key={department.id}>
            <Department
              key={department.id}
              textColor="black"
              departmentdata={department}
              permission={ctx.permission}
              onDeleteDepartment={deleteDepartmentClickHandler}
            />
            </div>
        ))}
      </div>
    </>
  );
};
export default DepartmentList;