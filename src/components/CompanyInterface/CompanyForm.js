import { useRef } from 'react';
import '../UserInterface/UserForm.scss';
import '../UserInterface/UserFilter.css';
import { Button } from 'react-bootstrap';

const CompanyForm = (props) => {
    const companyNameRef = useRef();
    const companyAdressRef = useRef();
    const companyPostCodeRef = useRef();
    const companyCityName = useRef();
    const companyCountryRef = useRef();
    const companyPhoneNumberRef = useRef();
    // const companyMailAddressRef = useRef();
    // const descriptionRef = useRef();
    
    
    //Submit event
    const  submitHandler = (e) => {
        e.preventDefault();
        const enteredCompanyName = companyNameRef.current.value;
        const enteredAdressRef = companyAdressRef.current.value;
        const enteredPostCodeRef = companyPostCodeRef.current.value;
        const enteredCityName = companyCityName.current.value;
        const enteredCountryRef = companyCountryRef.current.value;
        const enteredPhoneNumberRef = companyPhoneNumberRef.current.value;
        // const enteredMailAddressRef = companyMailAddressRef.current.value;
        // const enteredDescription = descriptionRef.current.value;


        const companyData = {
            name: enteredCompanyName,
            address: enteredAdressRef,
            postCode: enteredPostCodeRef,
            city: enteredCityName,
            country: enteredCountryRef,
            phoneNumber: enteredPhoneNumberRef,
        };
        let passedTest = true;
        
        if (!passedTest) {
            alert("Du måste fylla information i alla fält.");
        } else {
            props.onSaveCompanyData(companyData);
            // companyNameRef.current.value = '';
            // companyAdressRef.current.value = '';
            // companyPostCodeRef.current.value = '';
            // companyCityName.current.value = '';
            // companyCountryRef.current.value = '';
            // companyPhoneNumberRef.current.value = '';
        }
    };

    //Reset form
    const resetForm = (e) => {
        e.preventDefault(); 
        companyNameRef.current.value = '';
        companyAdressRef.current.value = '';
        companyPostCodeRef.current.value = '';
        companyCityName.current.value = '';
        companyCountryRef.current.value = '';
        companyPhoneNumberRef.current.value = '';
        // companyMailAddressRef.current.value = '';
        // descriptionRef.current.value = '';
    }

    return (
        <div className ="form-container form-container-slide-in">
            <form id ="companyform0" action="" autoComplete ="on" onSubmit = {submitHandler}  >
                <div className="new-user-controls">

                    <div className="new-user-control" >
                        <label htmlFor="">Namn</label>
                        <input required ref ={companyNameRef} type="text"  placeholder="namn.." autoComplete="on"  defaultValue="Bolag"/>
                    </div>

                    <div className="new-company-control">
                        <label htmlFor="">Adress</label>
                        <input  required ref={companyAdressRef} type="text"  placeholder="adress.." autoComplete="on" defaultValue="NågonGata 0" />
                    </div>

                    {/* <div className="new-company-control">
                        <label htmlFor="">Lägg till avdelningar</label>
                        <input ref={""} type="select"  />
                    </div> */}

                    <div className="new-company-control">
                        <label htmlFor="">Postnummer</label> 
                        <input required ref={companyPostCodeRef} pattern="[^\s-]\d{4,}" maxLength="7" type="text"  placeholder="postnummer.." autoComplete="on" defaultValue="000000" />
                    </div>

                    <div className="new-company-control">
                        <label htmlFor="">Stad</label>
                        <input required ref={companyCityName}type="text"  placeholder="stad.." autoComplete="on" defaultValue="Västerås"/>
                    </div>

                    <div className="new-company-control">
                        <label htmlFor="">Land</label>
                        <input required ref={companyCountryRef}  pattern ="^[^0-9]+$" type="text"  placeholder="land.." autoComplete="on" defaultValue="Sverige"/>
                    </div>

                    <div className="new-company-control">
                        <label htmlFor="">Telefonnummer</label>
                        <input required ref={companyPhoneNumberRef} pattern="^[^\W]+$" type="tel" maxLength="10" placeholder="telefonnummer.." autoComplete="on" defaultValue="021000000" />
                    </div>

                    {/* <div className="new-company-control">
                        <label htmlFor="">Mailadress</label>
                        <input required ref={companyMailAddressRef} type="email"  placeholder="epostadress.." autoComplete="on" />
                    </div> */}

                    {/* <div className="new-company-control">
                        <label htmlFor="">Beskrivning</label>
                        <textarea name="company_description" ref={descriptionRef} wrap="soft" autoFocus={ false } form="companyform0" placeholder ="beskrivning.." />
                    </div> */}

                </div>
                <div className="new-company-actions">
                    <Button type="submit" formTarget ="_self">Spara / Lägg till</Button>
                </div>
                <div className="new-company-actions">
                    <Button type="reset" formTarget="_self" onClick ={resetForm}>Ångra</Button>
                </div>

            </form>
        </div>
    )
}
export default CompanyForm;
