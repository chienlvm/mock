import { useRef, useReducer, useContext, useCallback, useEffect } from 'react';

import axios from 'axios';

import Input from '../Common/Input';
import CartInfo from './CartInfo';
import CartItem from './CartItem';
import AuthContext from '../../store/auth-context';

import defaultImage from '../../assets/Image/default.png';
import iconClose from '../../assets/Icon/iconClose.png';
import classes from './CartList.module.scss';
const customerReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CUSTOMER_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_CUSTOMER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case 'FETCH_CUSTOMER_ERROR':
      return {
        ...state,
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      break;
  }
};

const shopItemReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ITEM_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_ITEM_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case 'FETCH_ITEM_ERROR':
      return {
        ...state,
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      break;
  }
};

const shopReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ORDER_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case 'FETCH_ORDER_ERROR':
      return {
        ...state,
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      break;
  }
};
const initialState = {
  loading: false,
  data: [],
  error: '',
};

axios.defaults.baseURL = 'http://localhost:8080';

const CartList = () => {
  const authCtx = useContext(AuthContext);
  const amountInputRef = useRef();
  const shopId = '6092bd';

  const [customerState, dispatchCustomer] = useReducer(customerReducer, initialState);
  const [shopOrder, dispatchShop] = useReducer(shopReducer, initialState);
  const [shopItem, dispatchItem] = useReducer(shopItemReducer, initialState);
  const fetchCustomer = useCallback((customerId, shopId) => {
    dispatchCustomer({
      type: 'FETCH_CUSTOMER_REQUEST',
    });
    const config = {
      url: `/api/Cart/exist/shop/customer`,
      method: 'POST',
      data: {
        customerId: customerId,
        shopId: shopId,
      },
    };
    axios(config).then(({ data }) => {
      dispatchCustomer({
        type: 'FETCH_CUSTOMER_SUCCESS',
        data: data,
      });
    });
  }, []);

  const fetchAllOrderByShop = useCallback((shopId) => {
    const config = {
      url: `/api/Order/${shopId}/shop/all`,
      method: 'GET',
    };
    axios(config).then(({ data }) => {
      dispatchShop({
        type: 'FETCH_ORDER_SUCCESS',
        data: data.orders,
      });
    });
  }, []);
  const fetchAllItemInShop = useCallback((shopId) => {
    const config = {
      url: `/api/Shop/${shopId}`,
      method: 'GET',
    };
    axios(config).then(({ data }) => {
      dispatchItem({
        type: 'FETCH_ITEM_SUCCESS',
        data: data,
      });
    });
  }, []);

  useEffect(() => {
    console.log('amountInputRef', amountInputRef);
  }, []);

  useEffect(() => {
    if (authCtx.customer.id && shopId) {
      fetchCustomer(authCtx.customer.id, shopId);
      fetchAllItemInShop(shopId);
      fetchAllOrderByShop(shopId);
    }
  }, [authCtx.customer.id, shopId]);

  const addToCart = ((itemId) => {
    const config = {
      url: '/api/Cart/add/item',
      method: 'POST',
      data: {
        itemId: itemId,
        customerId: authCtx.customer.id,
        cartId: customerState.data.cartId,
      },
    };
    axios(config).then(({data}) => {
      fetchCustomer(authCtx.customer.id, shopId);
    })
  });
  const handleRemoveItem = ((itemId) => {
    const config = {
      url: '/api/Cart/remove/item',
      method: 'POST',
      data: {
        itemId: itemId,
        customerId: authCtx.customer.id,
        cartId: customerState.data.cartId,
      },
    };
    axios(config).then(({data}) => {
      fetchCustomer(authCtx.customer.id, shopId);
    })
  });
  const handleSubmit = (itemInCart) => {
    console.log('itemInCart', itemInCart)
    const listItem = itemInCart.map(item => ({
      amount: item.amount,
      itemId: item.itemId,
      isDeleted: true,
    }))
    const config = {
      url: '/api/Cart/submit',
      method: 'POST',
      data: {
        items: listItem,
        customerId: authCtx.customer.id,
        cartId: customerState.data.cartId,
      },
    };
    axios(config).then(({data}) => {
      console.log('data', data)
    })
  };
  return (
    <>
      <div className={classes.cart}>
        <h3 className={classes.info}>Information customer</h3>
        {shopItem.data.name &&
          customerState.data.cartId &&
          authCtx.customer.phoneNumber && (
            <CartInfo
              shopName={shopItem.data.name}
              cartId={customerState.data.cartId}
              phoneNumber={authCtx.customer.phoneNumber}
            />
          )}
        <div className={classes.cartContent}>
          <div className={classes.cartList}>
            <p className={classes.cartList__title}>Menu</p>
            <ul className={classes.cartItem}>
              {shopItem.data.name &&
                shopItem.data.items.map((item) => (
                  <CartItem
                    key={item.itemId}
                    data={item}
                    onAddToCart={addToCart}
                  />
                ))}
            </ul>
          </div>
          <div className={classes.orderList}>
            <p className={classes.orderList__title}>OrderList</p>
            <ul className={classes.cartOrderList}>
              <li className={classes.cartOrderItem}>
                <div className={classes.cartOrderItem__itemName}>
                  <p className={classes.cartOrderItem__name}>
                    {authCtx.customer.name}
                  </p>
                </div>
                <ul className={classes.orderList}>
                  <li className={classes.orderListItem}>
                    <div className={classes.orderListItem__product}>
                      Product
                    </div>
                    <div className={classes.orderListItem__price}>Price</div>
                    <div className={classes.orderListItem__quantity}>
                      Quantity
                    </div>
                  </li>
                  {customerState.data.itemsInCart &&
                    customerState.data.itemsInCart.map((item) => (
                      <li className={classes.orderListItem} key={item.itemId}>
                        <div className={classes.orderListItem__product}>
                          <div className={classes.orderListItem__infoItem}>
                            <div className={classes.orderListItem__imageItem}>
                              <img
                                className={classes.orderListItem__image}
                                src={
                                  item.image
                                    ? `data:image/jpeg;base64,${item.image}`
                                    : defaultImage
                                }
                                alt=''
                              ></img>
                            </div>
                            <p className={classes.orderListItem__nameItem}>
                              {item.itemName}
                            </p>
                          </div>
                        </div>
                        <div className={classes.orderListItem__price}>
                          <span className={classes.orderListItem__priceOrder}>
                            ${item.price}
                          </span>
                        </div>
                        <div className={classes.orderListItem__quantity}>
                          <Input
                            ref={amountInputRef}
                            input={{
                              id: 'amount',
                              type: 'number',
                              min: '1',
                              step: '1',
                              value: `${item.amount}`,
                              key: `${item.itemId}`,
                              readOnly: true,
                            }}
                          />
                        </div>
                        <div className={classes.orderListItem__removeItem}>
                          <div
                            className={classes.orderListItem__btnRemove}
                            onClick={() => handleRemoveItem(item.itemId)}
                          >
                            <span>Remove</span>
                            <img
                              src={iconClose}
                              className={classes.orderListItem__iconClose}  alt=''
                            ></img>
                          </div>
                        </div>
                      </li>
                    ))}
                    {( customerState.data.itemsInCart && customerState.data.itemsInCart.length === 0 ) && (
                      <li className={classes.orderListItem}>
                        <p className={classes.messageNotFound}>Cart not found</p>
                      </li>
                    )} 
                </ul>
              </li>
              {shopOrder.data &&
                shopOrder.data.map((item) => (
                  <li className={classes.cartOrderItem} key={item.orderId}>
                    <div className={classes.cartOrderItem__itemName}>
                      <p className={classes.cartOrderItem__name}>
                        {item.customerName}
                      </p>
                      <p className={classes.cartOrderItem__name}>
                        Status: {item.status}
                      </p>
                    </div>
                    <ul className={classes.orderList}>
                      <li className={classes.orderListItem}>
                        <div className={classes.orderListItem__product}>
                          Product
                        </div>
                        <div className={classes.orderListItem__price}>
                          Price
                        </div>
                        <div className={classes.orderListItem__quantity}>
                          Quantity
                        </div>
                      </li>
                      {item.itemsInCart.map((item) => (
                        <li className={classes.orderListItem} key={item.itemId}>
                          <div className={classes.orderListItem__product}>
                            <div className={classes.orderListItem__infoItem}>
                              <div className={classes.orderListItem__imageItem}>
                                <img
                                  className={classes.orderListItem__image}
                                  src={
                                    item.image
                                      ? `data:image/jpeg;base64,${item.image}`
                                      : defaultImage
                                  }
                                  alt=''
                                ></img>
                              </div>
                              <p className={classes.orderListItem__nameItem}>
                                {item.itemName}
                              </p>
                            </div>
                          </div>
                          <div className={classes.orderListItem__price}>
                            <span className={classes.orderListItem__priceOrder}>
                              ${item.price}
                            </span>
                          </div>
                          <div className={classes.orderListItem__quantity}>
                            <Input
                              ref={amountInputRef}
                              input={{
                                id: 'amount',
                                type: 'number',
                                min: '1',
                                step: '1',
                                defaultValue: `${item.amount}`,
                                readOnly: true,
                                disable: `true`,
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
            {customerState.data.itemsInCart && (
              <div className={classes.orderList__checkOut}>
                <div className={classes.checkOut}>
                  <p className={classes.checkOut__label}>Totals:</p>
                  <p>${customerState.data.totalPrice}</p>
                </div>
                <p
                  className={classes.orderList__btnCheckOut}
                  onClick={() => handleSubmit(customerState.data.itemsInCart)}
                >
                  Proceed To Checkout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CartList;
