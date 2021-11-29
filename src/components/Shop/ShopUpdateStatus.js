import { useState, useContext, Fragment } from 'react';
import {
  Button,
  Modal,
  Container,
  Col,
  Table,
  Row,
  Form,
} from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import axios from 'axios';
import moment from 'moment';

axios.defaults.url = 'http://localhost:8080';
// import classes from './ShopOrder.module.css';
const ShopUpdateStatus = (props) => {
  const authCtx = useContext(AuthContext);
  let { data } = props;
  const [valueSelection, setValueSelection] = useState('');
  // handle update status
  const handleUpdateStatus = () => {
    let config;

    if (valueSelection === 'Cancelled') {
      config = {
        method: 'PUT',
        url: '/api/Order/cancel',
        data: {
          orderId: data.orderId,
          customerId: data.customerId,
        },
      };
    } else {
      config = {
        method: 'PUT',
        url: '/api/Order/status',
        data: {
          orderId: data.orderId,
          orderStatus: `${valueSelection}`,
          customerId: data.customerId,
          shopId: data.shopId,
        },
      };
    }
    axios(config).then(({data}) => {
      props.onHide();
      if (data.isSuccess) {
        props.onFetchData(data.shopId);
      } else {
        let errorMessage = `${data.errorMessage}`;
        console.log('errorMessage', errorMessage)
        return alert(errorMessage);
      }
      
    });
  };

  return (
    <>
      <Modal
        show={props.onUpdateItem}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={props.onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs>Order Number</Col>
              <Col>{`#${data.orderId}`}</Col>
              <Col xs={3}>
                <Form.Select
                  onChange={(e) => setValueSelection(e.currentTarget.value)}
                >
                  <option key='blankChoice' hidden value={0}>
                    Order Status
                  </option>
                  {authCtx.orderStatus.map((item) => (
                    <option key={item.value} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Button
                  variant='primary'
                  onClick={handleUpdateStatus}
                  disabled={!valueSelection}
                >
                  Update Order
                </Button>
              </Col>
            </Row>
            <Row md={4}>
              <Col xs>Customer Name</Col>
              <Col xs={8}>{`${data.customerName}`}</Col>
            </Row>
            <Row>
              <Col>Customer Phone</Col>
              <Col>{`${data.customerPhoneNumber}`}</Col>
              <Col xs={6}>
                Order Time:{' '}
                {moment(`${data.orderTime}`).format('hh:mm:ss a MMMM Do YYYY')}
              </Col>
            </Row>
          </Container>
          <Container>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {data.itemsInCart.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{Number(item.price) * Number(item.amount)}</td>
                  </tr>
                ))}
                <tr>
                  <td
                    colSpan='3'
                    style={{
                      textAlign: 'right',
                      backgroundColor: 'antiquewhite',
                    }}
                  >
                    Total
                  </td>
                  <td>{data.totalPrice}</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShopUpdateStatus;
