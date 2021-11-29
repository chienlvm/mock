import { Row, Toast, Col, ToastContainer } from 'react-bootstrap';

/**
 * Method show Notification success/error
 * @param {status, message} props 
 * @returns 
 */
const Toasts = (props) => {
  let {message, isSuccess } = props.message
  return (
    <Row>
      <Col xs={6}>
      <ToastContainer className="p-3" position={'top-center'}>
        <Toast onClose={props.onHideToast} show={true} delay={3000} autohide bg={isSuccess ? 'success' : 'danger'}>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Message</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

export default Toasts;
