import React, { useState, useEffect, useCallback, useReducer } from 'react';
let logoutTimer;

const ORDER_STATUS = [
  {
    name: 'Confirmed',
    value: '0',
  },
  {
    name: 'Cancelled',
    value: '1',
  },
  {
    name: 'Sent To Kitchen',
    value: '3',
  },
  {
    name: 'Ready for Pickup',
    value: '4',
  },
  {
    name: 'Ready for Delivery',
    value: '5',
  },
  {
    name: 'Delivered',
    value: '6',
  },
];
const AuthContext = React.createContext({
  token: '',
  customer: {},
  shop: {},
  isLoggedIn: false,
  customerId: '',
  shopCustomer: (data) => {},
  updateShop: (data) => {},
  login: (token) => {},
  logout: () => {},
  orderStatus: {},
});

const defaultCustomerState = {
  id: '',
  name: '',
  phoneNumber: '',
  avatar: ''
};
const defaultShopState = {
  shopId: '',
  phoneNumber: '',
};
const customerReducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL':
      return {
        ...state,
        id: action.customerId,
        name: action.name,
        phoneNumber: action.phoneNumber,
        avatar: action.avatar
      };
    case 'UPDATE':
      return {
        ...state,
        id: action.customerId,
        name: action.name,
        phoneNumber: action.phoneNumber,
        avatar: action.avatar
      };
    case 'ADD_CART':
      return {
        ...state,
        cartId: action.cartId,
      };
    default:
      break;
  }
};
const shopReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        shopId: action.shopId,
        phoneNumber: action.phoneNumber,
      };
    default:
      break;
  }
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const customerId = localStorage.getItem('customerId');
  const customerName = localStorage.getItem('customerName');
  const customerPhone = localStorage.getItem('customerPhone');
  const avatar = localStorage.getItem('avatar');

  const shopId = localStorage.getItem('shopId');
  const shopPhone = localStorage.getItem('shopPhone');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerName');
    localStorage.removeItem('customerPhone');
    localStorage.removeItem('avatar');
    localStorage.removeItem('shopId');
    localStorage.removeItem('shopPhone');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    customerId: customerId,
    customerName: customerName,
    customerPhone: customerPhone,
    avatar: avatar,
    shopPhone: shopPhone,
    shopId: shopId,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const [customerState, dispatchCustomerAction] = useReducer(
    customerReducer,
    defaultCustomerState
  );
  const [shopState, dispatchShopAction] = useReducer(
    shopReducer,
    defaultShopState
  );
  let initialToken;
  let customerId;
  let customerName;
  let customerPhone;
  let avatar;
  let shopId;
  let shopPhone;
  if (tokenData) {
    initialToken = tokenData.token;
    customerId = tokenData.customerId;
    customerName = tokenData.customerName;
    customerPhone = tokenData.customerPhone;
    shopId = tokenData.shopId;
    shopPhone = tokenData.shopPhone;
    avatar = tokenData.avatar;
  }

  const [token, setToken] = useState(initialToken);
    // set cusomterId
    const [idCustomer, setIdCustomer] = useState(customerId);

  const userIsLoggedIn = !!token;
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, data, loginType, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    if (loginType === 'shop') {
      localStorage.setItem('shopId', data.shopId);
      localStorage.setItem('shopPhone', data.phoneNumber);
    } else {
      setIdCustomer(data.customerId);
      localStorage.setItem('customerId', data.customerId);
      localStorage.setItem('customerName', data.name);
      localStorage.setItem('customerPhone', data.phoneNumber);
      localStorage.setItem('avatar', data.avatar);
    }


    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  
  const updateCustomerHandle = (data) => {
    console.log('updateCustomerHandle', data)
    dispatchCustomerAction({ type: 'UPDATE',
      customerId: data.customerId,
      name: data.name,
      phoneNumber: data.phoneNumber,
      avatar: data.avatar,
    });
  };
  const updateShopHandle = (data) => {
    console.log('shopUpdate', data)
    dispatchShopAction({ type: 'UPDATE',
      shopId: data.shopId,
      phoneNumber: data.phoneNumber,
    });
  };

  useEffect(() => {
    dispatchCustomerAction({
      type: 'INITIAL',
      customerId: customerId,
      name: customerName,
      phoneNumber: customerPhone,
      avatar: avatar,
    });
    dispatchShopAction({
      type: 'UPDATE',
      shopId: shopId,
      phoneNumber: shopPhone,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);



  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    customer: customerState,
    shop: shopState,
    customerId: idCustomer,
    updateCustomer: updateCustomerHandle,
    updateShop: updateShopHandle,
    login: loginHandler,
    logout: logoutHandler,
    orderStatus: ORDER_STATUS,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
