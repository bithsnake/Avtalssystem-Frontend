import { Button, Modal } from "react-bootstrap";

const ErrorModal = (props) => {
  const goBackToLogin = (event) => {
    // //console.log("Klickade på knappen");
    event.preventDefault();
    return props.onPressButton({message:'' ,error:false});
  };

  return (
    <>
    <div onClick={props.onConfirm}>
      <Modal enforceFocus={true} centered={true} animation show={true} >
        <Modal.Header closeButton>
          <Modal.Title>{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="align-self-center" >
          <Button
            autoFocus
            className=""
            type="button"
            onClick={props.onConfirm}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </>
  );
};

export default ErrorModal;
