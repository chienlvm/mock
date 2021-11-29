import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthContext from './store/auth-context';
import Layout from './components/Layout/Layout';
import ShopPage from './pages/ShopPage/ShopPage';
import CustomerPage from './pages/CustomerPage/CustomerPage';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import AuthPage from './pages/AuthPage/AuthPage';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import CartOrderSuccess from './components/Cart/CartOrderSuccess';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}

        <Route path='/shop'>
          {authCtx.isLoggedIn && <ShopPage />}
          {!authCtx.isLoggedIn && (
            <Redirect
              to={{
                pathname: '/auth',
                search: '?type=shop',
              }}
            />
          )}
        </Route>
        <Route path='/register'>
          {authCtx.isLoggedIn && <HomePage />}
          {!authCtx.isLoggedIn && <Register />}
        </Route>
        <Route path='/login'>
          {authCtx.isLoggedIn && <HomePage />}
          {!authCtx.isLoggedIn && <Login />}
        </Route>
        <Route path='/success'>
          <CartOrderSuccess />
        </Route>
        <Route path='/customer'>
          {authCtx.isLoggedIn && <CustomerPage />}
          {!authCtx.isLoggedIn && (
            <Redirect
              to={{
                pathname: '/auth',
                search: '?type=customer',
              }}
            />
          )}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
