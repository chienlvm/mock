import { useState, useContext, useEffect, useCallback } from 'react';
import ShopItem from './ShopItem';
import ShopUpdateStatus from './ShopUpdateStatus';
import ShopUpdateItem from './ShopUpdateItem';
import moment from 'moment';

import { Table, Button } from 'react-bootstrap';

import AuthContext from '../../store/auth-context';
import axios from 'axios';

import classes from './ShopOrder.module.scss';
axios.defaults.baseURL = 'http://localhost:8080';
const ShopOrder = () => {
  // get context
  const authCtx = useContext(AuthContext);
//   const [ connection, setConnection ] = useState(null);
//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder()
//       .withUrl(`http://localhost:8080/hubs/shop?shop=${authCtx.shopId}`, {
//         withCredentials: false
//       })
//       .withAutomaticReconnect()
//       .build();

//     setConnection(newConnection);
//   }, []);
//   useEffect(() => {
//     if (connection) {
//       connection
//         .start()
//         .then((result) => {
//           console.log('Connected!');

//           connection.on('NewOrder', (message) => {
//             console.log('Connected!', message);

//             // setChat(updatedChat);
//           });
//         })
//         .catch((e) => console.log('Connection failed: ', e));
//     }
//   }, [connection]);

//   const sendMessage = async (user, message) => {

//     if (connection.connectionStarted) {
//         try {
//             await connection.send('NewOrder', authCtx.shopId);
//         }
//         catch(e) {
//             console.log(e);
//         }
//     }
//     else {
//         alert('No connection to server yet.');
//     }
// }

  // create state to response
  const [order, setOrder] = useState([]);
  const [dataUpdateOrder, setDataUpdateOrder] = useState({});
  // state for addItem
  const [addItemIsShow, setAddItemIsShow] = useState(false);
  // state for addItem
  const [updateOrderIsShow, setUpdateOrderIsShow] = useState(false);

  // state for show modal detail item
  const [updateItemsShop, setUpdateItemsShop] = useState(false);
  // data for update Item in shop
  const [dataItemInShop, setDataItemInShop] = useState([]);
  const fetchListOrder = useCallback((shopId) => {
    const config = {
      method: 'GET',
      url: `/api/Order/${shopId}/shop/all`,
    };
    axios(config).then(({ data }) => {
      setOrder(data.orders);
    });
  }, []);

  useEffect(() => {
    if (authCtx.shop.shopId) {
      fetchListOrder(authCtx.shop.shopId);
    }
  }, [authCtx.shop.shopId]);

  const hideUpdateOrderHandle = () => {
    setUpdateOrderIsShow(false);
  }

  // handle add new Item
  const showAddItemHandler = () => {
    // showDetailItem()
    setAddItemIsShow(true);
  }
  const hideAddItemHandler = () => {
    setAddItemIsShow(false);
  }
  // show detail item in shop
  const showDetailItem = (event) => {
    event.preventDefault();
    const config = {
      method: 'GET',
      url: `/api/Shop/${authCtx.shop.shopId}`
    }
    axios(config)
      .then(({data}) => {
        setDataItemInShop(data);
        setUpdateItemsShop(true);
      })
  }
  // show detail item in shop
  const hideDetailItem = () => {
    setUpdateItemsShop(false);
  }

  // handle show order
  const handleShowOrder = (event, item) => {
    event.preventDefault();
    setDataUpdateOrder(item);
    setUpdateOrderIsShow(true);
  }
  return (
    <>
      <div >
        <Button variant="primary" onClick={showAddItemHandler} >Add new Item</Button>
      </div>
      <div className='shopOrder__content'>
        <div className='shopOrder__head'>
          <div className='shopOrder__head__shopName'>
            <div className='shopName__name'>
              <span> Shop Name: {authCtx.shop.name}</span>
            </div>
            <div className='shopName__shareLink'>
              <div className='shopName__shareLink'>
                <span> Shop Link: abc.com</span>
                <div className='shopName__btnShareLink'>
                  <p>Copy</p>
                  <p>Share</p>
                </div>
              </div>
            </div>
          </div>
          <div className='shopOrder__head__phoneNumber'>
            <p>Phone Number: XXXXXX</p>
            <span onClick={showDetailItem} className={classes.viewMenu}>View Menu</span>
          </div>
        </div>


          <div className='shopOrder__order'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Customer Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Order Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {order.map((item, index) => (
                  <tr key={item.orderId}>
                    <td>{index}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerPhoneNumber}</td>
                    <td>{item.totalPrice}</td>
                    <td>{item.status}</td>
                    <td>{moment(`${item.orderTime}`).format('hh:mm:ss a MMMM Do YYYY')}</td>
                    <td>
                      <span onClick={event => handleShowOrder(event, item)}  className={classes.viewMenu}>View Order</span>
                    </td>
                  </tr>
              ))}
              </tbody>
            </Table>
          </div>

      </div>
      {updateOrderIsShow && <ShopUpdateStatus data={dataUpdateOrder} onUpdateItem={updateOrderIsShow} onHide={hideUpdateOrderHandle} onFetchData={fetchListOrder}/>}
      <ShopItem onAddItem={addItemIsShow} onHide={hideAddItemHandler}/>
      {updateItemsShop && <ShopUpdateItem data={dataItemInShop} onUpdateItem={updateItemsShop} onHide={hideDetailItem}/>}
    </>
  );
};

export default ShopOrder;
