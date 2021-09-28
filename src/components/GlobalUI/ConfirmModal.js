import { Button, Modal } from "react-bootstrap";

const ConfirmModal = (props) => {

  const confirmHandler = (e) => {
    props.onConfirm(e.target.value);
  }
  return (
    <>
    <div onClick={props.onConfirm}>
      <Modal enforceFocus={true} centered={true} animation show={true} >
        <Modal.Header closeButton>
          <Modal.Title >{props.message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="align-self-center" >
          <Button
            autoFocus
            className=""
            type="button"
            value={true}
            onClick={confirmHandler}
            >
            Ja
          </Button>
          <Button
            autoFocus
            className=""
            type="button"
            value={false}
            onClick={confirmHandler}
          >
            Nej
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </>
  );
};

export default ConfirmModal;