import { useState, useContext} from 'react';
import {
  Button,
  Modal,
  Container,
  Col,
  Table,
  Row,
  Image,
} from 'react-bootstrap';
import axios from 'axios';

import AuthContext from '../../store/auth-context';
import ShopItem from '../Shop/ShopItem';
import ModalConfirm from '../Common/ModalConfirm';
import classes from './ShopUpdateItem.module.css';
import defaultImage from '../../assets/Image/default.png';

axios.defaults.url = 'http://localhost:8080';
// import classes from './ShopOrder.module.css';
const ShopUpdateItem = (props) => {
  const authCtx = useContext(AuthContext);
  let { data } = props;
  // state for addItem
  const [addItemIsShow, setAddItemIsShow] = useState(false);
  // data for update item
  const [dataUpdateItem, setDataUpdateItem] = useState([]);

  //
  const [listItem, setListItem] = useState(data.items.filter(item => item.isActive));

  // handle add new Item
  const showAddItemHandler = (itemId) => {
    const config = {
      method: 'GET',
      url: `/api/Item/${itemId}`,
    };
    axios(config).then(({ data }) => {
      setDataUpdateItem(data);
      setAddItemIsShow(true);
    });
  };
  const hideAddItemHandler = () => {
    setAddItemIsShow(false);
  };
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [itemId, setItemId] = useState('');
  const closeModalConfirm = () => {
    setIsShowModalConfirm(false);
  };
  const openModalConfirm = (itemId) => {
    setIsShowModalConfirm(true);
    setItemId(itemId);
  };

  const handleDeleteItem = () => {
    const config = {
      method: 'DELETE',
      url: '/api/Item',
      data: {
        shopId: authCtx.shop.shopId,
        itemId: itemId,
      },
    };
    axios(config).then(({ data }) => {
      setIsShowModalConfirm(false);
      const newData = listItem.filter(item => item.itemId !==itemId);
      setListItem(newData);
    });
  };
  return (
    <>
      <Modal
        show={props.onUpdateItem}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={props.onHide}
        style={{ zIndex: '98' }}
        backdropClassName={classes.zIndex__1}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detail Item in Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs>Shop Name</Col>
              <Col>{data.name}</Col>
            </Row>
            <Row md={4}>
              <Col xs>Phone Number</Col>
              <Col xs={8}>{data.phoneNumber}</Col>
            </Row>
          </Container>
          <Container>
            <Table borderless>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listItem.map((item, index) => (
                  <tr key={item.itemId}>
                    <td
                      style={{
                        width: '10px',
                      }}
                    >
                      {index + 1}
                    </td>
                    <td
                      style={{
                        width: '200px',
                      }}
                    >
                      <Image
                        src={
                          item.image
                            ? `data:image/jpeg;base64,${item.image}`
                            : defaultImage
                        }
                        style={{
                          width: '180px',
                          height: '100px',
                        }}
                        rounded
                      />
                    </td>
                    <td
                      style={{
                        width: '100px',
                      }}
                    >
                      {item.name}
                    </td>
                    <td
                      style={{
                        width: '100px',
                      }}
                    >
                      {item.price}
                    </td>
                    <td>
                      <Button
                        variant='outline-primary'
                        onClick={() => showAddItemHandler(item.itemId)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant='outline-danger'
                        onClick={() => openModalConfirm(item.itemId, item.name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
      </Modal>
      {addItemIsShow && (
        <ShopItem
          onAddItem={addItemIsShow}
          onHide={hideAddItemHandler}
          data={dataUpdateItem}
          style={{ zIndex: '99' }}
        />
      )}
      <ModalConfirm
        onHide={closeModalConfirm}
        onShow={isShowModalConfirm}
        onConfirm={handleDeleteItem}
        style={{ zIndex: '100' }}
      >
        <p>
          Do you want to delete it?
        </p>
      </ModalConfirm>
    </>
  );
};

export default ShopUpdateItem;
