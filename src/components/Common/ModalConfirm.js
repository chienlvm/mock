import { Button, Modal } from 'react-bootstrap';
const ModalConfirm = (props) => {
  return (
    <>
      <Modal
        show={props.onShow} onHide={props.onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Confirm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button onClick={props.onConfirm}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
