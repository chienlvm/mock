import { useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import md5 from 'md5';

import Input from '../Common/Input';
import AuthContext from '../../store/auth-context';

import classes from './Login.module.scss';

axios.defaults.baseURL = 'http://localhost:8080';

const Login = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const handleLogin = () => {
    setIsLoading(true);
    const enteredPhone = phoneInputRef.current.value;
    const config = {
      method: 'POST',
      url: '/api/Customer/login',
      data: {
        phoneNumber: enteredPhone
      }
    };
    axios(config)
    .then(({data}) => {
      setIsLoading(false);
      // set data for useHook
      const today = new Date();
      const expirationTime = new Date();
      expirationTime.setDate(today.getDate() + 60);
      authCtx.updateCustomer(data);
      authCtx.login(md5(data.customerId), data, 'customer', expirationTime.toISOString());
      history.replace('/customer');
    })
    
  };

  const switchToRegister = () => {
    history.replace('/register');
  };
  return (
    <div className={classes.login}>
      <div className={classes.login__title}>
        <p className={classes.login__text}>Login</p>
        <p className={classes.login__describe}>
          Please login using account detail bellow.
        </p>
      </div>
      <div className={classes.login__formLogin}>
        <div className={classes.login__phoneNumber}>
          <Input
            ref={nameInputRef}
            input={{
              id: 'name',
              type: 'text',
              placeholder: 'Customer Name',
            }}
          />
        </div>
        <div className={classes.login__password}>
          <Input
            ref={phoneInputRef}
            input={{
              id: 'phoneNumber',
              type: 'text',
              placeholder: 'Phone Number',
              defaultValue: '0373230229'
            }}
          />
        </div>
        <p className={classes.login__forgot}>Forgot your password?</p>
      </div>
      <div className={classes.login__btnSignIn} onClick={handleLogin}>
        {!isLoading && 'Sign in'}
        {isLoading && <p>Sending request...</p>}
      </div>
      <p className={classes.login__createAccount}>
        Don’t have an Account?
        <span className={classes.login__link} onClick={switchToRegister}>
          {' '}
          Create account{' '}
        </span>
      </p>
    </div>
  );
};
export default Login;
