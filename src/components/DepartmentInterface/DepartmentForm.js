import { useRef } from 'react';
import '../UserInterface/UserForm.scss';
import '../UserInterface/UserFilter.css';
import { Button } from 'react-bootstrap';

const DepartmentForm = (props) => {
    const departmentNameRef = useRef();
    const descriptionRef = useRef();

    //Submit event
    const  submitHandler = (event) => {
        //Prevent reloading of page
        event.preventDefault();
        const enteredDepartmentName   = departmentNameRef.current.value;
        const enteredDescription    = descriptionRef.current.value;
        
        
        const departmentData = {
            name: enteredDepartmentName,
            description:    enteredDescription
        };

        let passedTest = true;

        //Lift this data up to the NewUser Compontent!
        if (!passedTest) {
            alert("Du måste fylla information i alla fält.");
        } else {
            props.onSaveDepartmentData(departmentData); //Excecute the "parent" function in this component, since we pass in a pointer to the function inside here

            //Reset data
            departmentNameRef.current.value = '';
            descriptionRef.current.value = '';     
        }
    };

    const resetForm = (event) => {
        //Reset data
        event.preventDefault(); 
            //Reset data
            departmentNameRef.current.value = '';
            descriptionRef.current.value = '';  
             
    }
    return (
        <div className ="form-container form-container-slide-in">
            <form id ="userform0" action="" autoComplete ="on" onSubmit = {submitHandler}  >
                <div className="new-user-controls">
                    <div className="new-user-control" >
                        <label htmlFor="">Namn på avdelning</label>
                        <input ref ={departmentNameRef} required type="text"  placeholder="namn.." autoComplete="on" />
                    </div>

                    <div className="new-user-control">
                        <label htmlFor="">Beskrivning</label>
                        <textarea name="user_description" ref={descriptionRef} wrap="soft" autoFocus={ false } form="userform0" placeholder ="beskrivning.." />
                    </div>

                </div>
                
                <div className="new-user-actions">
                    <Button type="submit" formTarget ="_self">Spara / Lägg till</Button>
                </div>
                <div className="new-user-actions">
                    <Button type="reset" formTarget="_self">Ångra</Button>
                </div>

            </form>
        </div>
    )
}
export default DepartmentForm;
