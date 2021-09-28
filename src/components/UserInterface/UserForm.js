import { useRef, useContext, useEffect } from 'react';
import '../UserInterface/UserFilter.css';
import './UserForm.scss';
import { Button } from 'react-bootstrap';
import AuthContext from '../../store/auth-context'
// import DepartmentOption from '../DepartmentInterface/DepartmentOption';
import CompanyOption from '../CompanyInterface/CompanyOption';

const UserForm = (props) => {
  const { companydata } = props;
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const companyInputRef = useRef();
  // const descriptionInputRef = useRef();
  const mailadressInputRef = useRef();
  const passwordInputRef = useRef();
  const persmissionLevelRef = useRef();
  
  const ctx = useContext(AuthContext);

  useEffect(() => {
    //console.log("allowedusers from userform: ", ctx.allowedUsers);
  },[])


    //Submit event
    const  submitHandler = (event) => {
        //Prevent reloading of page
        event.preventDefault();
        const enteredFirstName = firstNameInputRef.current.value;
        const enteredLastName = lastNameInputRef.current.value;
        const enteredCompany = companyInputRef.current.value;
        // const enteredDescription = descriptionInputRef.current.value;
        const enteredEmailAddress = mailadressInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredPermissionLevel = persmissionLevelRef.current.value;

        const userData = {
            FirstName:          enteredFirstName,
            LastName:           enteredLastName,
            EmailAddress:       enteredEmailAddress,
            // company:            enteredCompany,
            Password:           enteredPassword,
            Permission:         parseInt(enteredPermissionLevel),
            CustomerId:         props.customerId
        };
        let passedTest = true;

        //Lift this data up to the NewUser Compontent!
        if (!passedTest) {
            alert("Du måste fylla information i alla fält.");
        } else {
            props.onSaveUserData(userData); //Excecute the "parent" function in this component, since we pass in a pointer to the function inside here

            //Reset data
          resetForm();
        }
    };

    const resetForm = () => {
        //Reset data
        firstNameInputRef.current.value = '';
        lastNameInputRef.current.value = '';
        companyInputRef.current.value = '';
        mailadressInputRef.current.value = '';
        passwordInputRef.current.value = '';
        persmissionLevelRef.current.value = '';

    }
    return (
      <div className="container centre md-col-2 pad2x toast-body">
        <form
          id="userform0"
          action=""
          autoComplete="on"
          onSubmit={submitHandler}
        >
          <div className="new-user-controls">
            <div className="new-user-control">
              <label htmlFor="">Förnamn: </label>
              <input
                ref={firstNameInputRef}
                required
                type="text"
                placeholder="förnamn"
                autoComplete="on"
              />
            </div>

            <div className="new-user-control">
              <label htmlFor="">Efternamn: </label>
              <input
                ref={lastNameInputRef}
                required
                type="text"
                placeholder="efternamn"
                autoComplete="on"
              />
            </div>

            <div className="new-user-control">
              <label htmlFor="">Bolag: </label>
              <select required ref={companyInputRef}>
                {companydata.map( (companyoptions) => (
                  <CompanyOption
                    key={companyoptions.id}
                    companydata={companyoptions}
                  />
                ))}
              </select>
            </div> 

            {/* <div className="new-user-control">
              <label htmlFor="">Avdelning: </label>
              <select required ref={departmentInputRef}>
                {
                  ctx.departments.length > 0 &&
                  ctx.departments.map((departmentoptions) => (
                  <DepartmentOption
                    key={departmentoptions.id}
                    departmentdata={departmentoptions.name}
                  />
                  ))
                }
              </select>
              </div>*/}

            <div className="new-user-control">
              <label htmlFor="">Mailadress: </label>
              <input
                required
                ref={mailadressInputRef}
                type="email"
                placeholder="epostadress"
              />
            </div>
            <div className="new-user-control">
              <label htmlFor="">Lösenord: </label>
              <input
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                ref={passwordInputRef}
                type="password"
                placeholder="lösenord.."
              />
            </div>

            {/* <div className="new-user-control">
              <label htmlFor="">Beskrivning: </label>
              <textarea
                name="user_description"
                ref={descriptionInputRef}
                wrap="soft"
                autoFocus={false}
                form="userform0"
                placeholder="beskrivning.."
              />
            </div> */}

            <div className="new-user-control">
              <label htmlFor="userpermission">Rättighetsnivå: </label>
              <select
                ref={persmissionLevelRef}
                name="userpermission"
                id="userpermission"
                required
                type=""
                placeholder="efternamn"
                autoComplete="on"
              >
              <option value={0}>Användare</option>
              <option value={1}>Administratör</option>
              </select>
            </div>

          </div>
          <div className="new-user-actions">
            <Button type="submit" formTarget="_self">
              Spara / Lägg till
            </Button>
          </div>
          <div className="new-user-actions">
            <Button type="reset" formTarget="_self">
              Ångra
            </Button>
          </div>
        </form>
      </div>
    );
}
export default UserForm;
