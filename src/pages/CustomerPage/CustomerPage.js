
import { Fragment, useContext } from 'react';
import Login from '../../components/Auth/Login';
import CartList from '../../components/Cart/CartList';
import AuthContext from '../../store/auth-context';

const CustomerPage = () => {
  const authCtx = useContext(AuthContext);
  console.log('authCtx', authCtx.customerId)
  return (
    <Fragment>
      {(authCtx.isLoggedIn && authCtx.customerId) ? <CartList /> : <Login/>}
    </Fragment>
  );
};

export default CustomerPage;
