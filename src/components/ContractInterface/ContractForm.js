import { useRef ,useState,useContext,useEffect } from 'react';
import {Button, ButtonGroup, ButtonToolbar, Modal} from 'react-bootstrap'
import '../UserInterface/UserForm.scss';
import '../UserInterface/UserFilter.css';
import AuthContext from '../../store/auth-context';

const ContractForm = (props) => {
  const ctx = useContext(AuthContext);
  const [users,setUsers] = useState([])
  const [buttonColor, setButtonColor] = useState("bg-primary");
  useEffect(() => {
    ctx.apiOnGetAllDepartments();
    ctx.apiOnGetAllCompanies();
    setUsers(() => [...users, ctx.users]);
    //console.log("users from ContractForm: ", ctx.users);
    return ctx.apiOnGetAllUsers();
  },[]);
    
    const contractTitleRef = useRef();
    const contractCounterpartNameRef = useRef();
    const contractCounterpartOrgNumberRef = useRef();
    const contractCompanyOwnerRef = useRef();
    const contractDescriptionRef = useRef();
    const contractNumberRef = useRef();
    const contractCategoryRef = useRef();
    const contractDepartmentRef = useRef();
    const contractStartDateRef = useRef();
    const contractEndDateRef = useRef();
    const contractNoticePeriodMonthsRef = useRef(null);
    const contractExtensionTimeMonthsRef = useRef(null);
    const contractResponsibleUserRef = useRef();
    const contractPersonalDataResponsibilityRef = useRef();
    const contractRelatedContractsRef = useRef(null);
    const [extensionPeriodValue,setExtensionPeriodValue]= useState(0);
    const [noticePeriodValue,setNoticePeriodValue]= useState(0);
  
  const updateExtensionPeriodValue = (e) => {
    setExtensionPeriodValue( () => e.target.value);

  }
  const updateNoticePeriodValue = (e) => {
    setNoticePeriodValue( () => e.target.value);

  }

  useEffect(() => {
    //console.log("values on periods: ", extensionPeriodValue, noticePeriodValue);
  },[updateExtensionPeriodValue, updateNoticePeriodValue])
  
    //Reset data
    const ResetData = () => {
        contractTitleRef.current.value                      = '';
        contractCounterpartNameRef.current.value            = '';
        contractCounterpartOrgNumberRef.current.value       = '';
        contractCompanyOwnerRef.current.value               = '';
        contractDescriptionRef.current.value                = '';
        contractNumberRef.current.value                     = '';
        contractCategoryRef.current.value                   = '';
        contractDepartmentRef.current.value                 = '';
        contractStartDateRef.current.value                  = '';
        contractEndDateRef.current.value                    = '';
        contractNoticePeriodMonthsRef.current.value         = '';
        contractExtensionTimeMonthsRef.current.value        = '';
        contractResponsibleUserRef.current.value            = '';
        contractPersonalDataResponsibilityRef.current.value = '';
        // contractRelatedContractsRef.current.value           = '';
    };

    //Submit event
    const  submitHandler = (event) => {
        //Prevent page reload
        event.preventDefault();
        //Set field value to the current entered value
        const enteredContractTitle                      = contractTitleRef.current.value;
        const enteredContractCounterpartName            = contractCounterpartNameRef.current.value;
        const enteredContractCounterpartOrgNumber       = contractCounterpartOrgNumberRef.current.value;
        const enteredContractCompanOwner                = contractCompanyOwnerRef.current.value;
        const enteredContractDescription                = contractDescriptionRef.current.value;
        const enteredContractNumber                     = contractNumberRef.current.value;
        const enteredContractCategory                   = contractCategoryRef.current.value;
        const enteredContractDepartment                 = contractDepartmentRef.current.value;
        const enteredContractStartDate                  = contractStartDateRef.current.value;
        const enteredContractEndDate                    = contractEndDateRef.current.value;
        const enteredContractExtensionTimeMonths        = contractExtensionTimeMonthsRef.current.value;
        const enteredContractNoticePeriodMonths         = contractNoticePeriodMonthsRef.current.value;
        const enteredContractResponsibleUser            = contractResponsibleUserRef.current.value;
        const enteredContractPersonalDataResponsibility = contractPersonalDataResponsibilityRef.current.value;
        const enteredContractRelatedContracts           = "no relation";
      
        //Save for later
        //DTO 
        // const contractData = {
        //     name:                      enteredContractTitle,
        //     externalReference:            enteredContractCounterpartName,
        //     counterpartorgnumber:       enteredContractCounterpartOrgNumber,
        //     companyId:                parseInt(enteredContractCompanOwner),
        //     description:                enteredContractDescription,
        //     contractnumber:             enteredContractNumber,
        //     category:                   enteredContractCategory,
        //     departmentId:                 parseInt(enteredContractDepartment),
        //     startDate:                  enteredContractStartDate,
        //     endDate:                    enteredContractEndDate,
        //     noticeperiodmonths:         parseInt(enteredContractNoticePeriodMonths),
        //     extensionperiodmonths:      parseInt(enteredContractExtensionTimeMonths),
        //     internalReference:          enteredContractResponsibleUser,
        //     personaldataresponsibility: enteredContractPersonalDataResponsibility,
        //     relatedcontracts:           enteredContractRelatedContracts,
        // };
        const contractData = {
            departmentId:                 parseInt(enteredContractDepartment),
            name:                      enteredContractTitle,
            startDate:                  enteredContractStartDate,
            endDate:                    enteredContractEndDate,
            description:                enteredContractDescription,
            internalReference:          enteredContractResponsibleUser,
            externalReference:            enteredContractCounterpartName,
            // counterpartorgnumber:       enteredContractCounterpartOrgNumber,
            // companyId:                parseInt(enteredContractCompanOwner),
            // contractnumber:             enteredContractNumber,
            // category:                   enteredContractCategory,
            // noticeperiodmonths:         parseInt(enteredContractNoticePeriodMonths),
            // extensionperiodmonths:      parseInt(enteredContractExtensionTimeMonths),
            // personaldataresponsibility: enteredContractPersonalDataResponsibility,
            // relatedcontracts:           enteredContractRelatedContracts,
        };
        let passedTest = true;

        //Lift this data up to the NewUser Compontent!
        if (!passedTest) {
            alert("Du måste fylla information i alla fält.");
        } else {
            props.onSaveContractData(contractData); //Excecute the "parent" function pasing the DTO
            //Reset data
            ResetData();
        }
    };

  const setColorHandler = (e) => {
    switch (e.target.value) {
      case "add": 
        setButtonColor("bg-success");
        break;
      case "cancel": 
        setButtonColor("bg-danger");
        break;
    
      default: setButtonColor("bg-primary");
        break;
    }
  }

  
  const setColorToPrimary = () => {
    setButtonColor("bg-primary");
    return;
  }
  const setColorToSuccess = () => {
    setButtonColor("bg-success");
    return;
  }
  const setColorToDanger = () => {
    setButtonColor("bg-danger");
    return;
  }
    return (
      //   <div className="form-container form-container-slide-in">
      <Modal
        show={true}
        centered
        onHide={props.onFormClose}
        backdrop={true}
        keyboard
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Avtalsformulär
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className=" order-6">
          <form
            id="contractform0"
            action=""
            autoComplete="on"
            onSubmit={submitHandler}
          >
            <div className="new-user-controls">
              {/* Titel */}
              <div className="new-user-control">
                <label htmlFor="">Titel</label>
                <input
                  ref={contractTitleRef}
                  autoFocus={true}
                  required
                  type="text"
                  placeholder="titel.."
                  autoComplete="on"
                  value="TestAvtal"
                />
              </div>

              {/* Motpartens namn */}
              <div className="new-user-control">
                <label htmlFor="">Motpartens namn</label>
                <input
                  ref={contractCounterpartNameRef}
                  required
                  type="text"
                  placeholder="motpartens namn.."
                  autoComplete="on"
                  value="Alltid Svantte"
                />
              </div>

              {/* Motpartens organisationsnummer */}
              <div className="new-user-control">
                <label htmlFor="">Motpartens organisationsnummer</label>
                <input
                  ref={contractCounterpartOrgNumberRef}
                  required
                  type="text"
                  placeholder="motpartens organisationsnummer.."
                  autoComplete="on"
                  value="89289829-88992"
                />
              </div>

              {/* Bolag */}
              <div>
                <label htmlFor="">Bolag</label>
                <select required ref={contractCompanyOwnerRef}>
                  {ctx.companies.map((companyoptions) => (
                    <option value={companyoptions.id}>
                      {companyoptions.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kort info om kontraktet */}
              <div className="new-user-control">
                <label htmlFor="">Kort info om avtalet</label>
                <textarea
                  name="contract_description"
                  ref={contractDescriptionRef}
                  wrap="soft"
                  autoFocus={false}
                  form="contractform0"
                  placeholder="beskrivning.."
                  value="Test description"
                />
              </div>

              {/* Avtalsnummer */}
              <div className="new-user-control">
                <label htmlFor="">Avtalsnummer</label>
                <input
                  pattern="[^\s-]\d{1,}"
                  ref={contractNumberRef}
                  required
                  type="text"
                  placeholder="avtalsnummer.."
                  autoComplete="on"
                  value="13123123"
                />
              </div>

              {/* Kategori */}
              <div className="new-user-control">
                <label htmlFor="">Kategori</label>
                <input
                  ref={contractCategoryRef}
                  required
                  type="text"
                  placeholder="kategori.."
                  autoComplete="on"
                  value="ITP"
                />
              </div>

              {/* Avdelning */}
              <div>
                <label htmlFor="">Avdelning</label>
                <select required ref={contractDepartmentRef}>
                  {ctx.departments.map((departmentoptions) => (
                    <option value={departmentoptions.id}>
                      {departmentoptions.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Startdatum */}
              <div className="new-user-control">
                <label htmlFor="">Startdatum</label>
                <input
                  ref={contractStartDateRef}
                  required
                  type="date"
                  placeholder="startdatum.."
                  autoComplete="on"
                />
              </div>

              {/* Slutdatum */}
              <div className="new-user-control">
                <label htmlFor="">Slutdatum</label>
                <input
                  ref={contractEndDateRef}
                  required
                  type="date"
                  placeholder="slutdatum.."
                  autoComplete="on"
                />
              </div>
              {/* Uppsägningstid */}
              <div className="new-user-control">
                <label htmlFor="">Uppsägningstid i månader</label>
                <input
                  ref={contractExtensionTimeMonthsRef}
                  required
                  type="range"
                  min="0"
                  max="6"
                  onChange={updateExtensionPeriodValue}
                  placeholder="uppsägningstid.."
                  autoComplete="on"
                  value={extensionPeriodValue}
                />
                <span>
                  {" "}
                  <strong>{`${extensionPeriodValue} månader`}</strong>
                </span>
              </div>

              {/* Förlängningstid */}
              <div className="new-user-control">
                <label htmlFor="">Förlängningstid i månader</label>
                <input
                  ref={contractNoticePeriodMonthsRef}
                  required
                  type="range"
                  min="0"
                  max="6"
                  onChange={updateNoticePeriodValue}
                  placeholder="förlängningstid.."
                  autoComplete="on"
                  value={noticePeriodValue}
                />
                <span>
                  {" "}
                  <strong>{`${noticePeriodValue} månader`}</strong>
                </span>
              </div>

              {/* Ansvarig användare */}
              <div>
                <label htmlFor="">Ansvarig för avtalet</label>
                <select required ref={contractResponsibleUserRef}>
                  {ctx.users.length > 0 &&
                    ctx.users.map((useroptions) => (
                      <option
                        value={`${useroptions.firstName} ${useroptions.lastName}`}
                      >{`${useroptions.firstName} ${useroptions.lastName}`}</option>
                    ))}
                </select>
              </div>

              {/* Personuppgiftsansvar */}
              <div>
                <label for="ansvar" htmlFor="">
                  Personuppgiftsansvar
                </label>
                <select
                  id="ansvar"
                  required
                  ref={contractPersonalDataResponsibilityRef}
                >
                  <option value="Ansvar">Ansvar</option>
                  <option value="Biträde">Biträde</option>
                  <option value="Inget">Inget</option>
                </select>
              </div>

              {/* Relaterade avtal */}
              {/* <div>
                <label htmlFor="">Relaterade avtal</label>
                <select required ref={contractRelatedContractsRef}>
                  {
                    props.contractdata.length > 0 &&
                    props.contractdata.map((contractoptions) => (
                    <ContractOption
                      key={contractoptions.id}
                      contractdata={contractoptions.title}
                    />
                  ))}
                </select>
              </div> */}
            </div>
            <div className="mb-1">
              <ButtonToolbar displayName="Välj" aria-label="Välj">
                <ButtonGroup style={{ justifyContent: "space-evenly" }}>
                  <Button
                    value="cancel"
                    onMouseOver={setColorToDanger}
                    onMouseOut={setColorToPrimary}
                    className={
                      buttonColor === "bg-success" ? "bg-primary" : buttonColor
                    }
                    size="sm"
                    type="reset"
                    formTarget="_self"
                  >
                    Ångra
                  </Button>
                  <Button
                    value="add"
                    onMouseOver={setColorToSuccess}
                    onMouseOut={setColorToPrimary}
                    className={
                      buttonColor === "bg-danger" ? "bg-primary" : buttonColor
                    }
                    size="lg"
                    type="submit"
                    formTarget="_self"
                  >
                    Spara / Lägg till
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
              <label id="contract_file" htmlFor=""></label>
              <input type="file" name="contract_file" id="contract_file" />
            </div>
          </form>
          {/* </div> */}
        </Modal.Body>
      </Modal>
    );
}
export default ContractForm;