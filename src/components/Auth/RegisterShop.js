import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../Common/Input';
import classes from './Register.module.scss';

const Register = () => {
  const history = useHistory();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const switchToLogin = () => {
    history.replace('/login');
  };

  return (
    <div className={classes.register}>
      <div className={classes.register__title}>
        <p className={classes.register__text}>Sign Up</p>
        <p className={classes.register__describe}>
          Please input info account detail bellow.
        </p>
      </div>
      <div className={classes.register__formLogin}>
        <div className={classes.register__phoneNumber}>
          <Input
            ref={phoneNumberRef}
            input={{
              id: 'name',
              type: 'tel',
              placeholder: 'Customer Name',
            }}
          />
        </div>
        <div className={classes.register__password}>
          <Input
            ref={passwordRef}
            input={{
              id: 'phone',
              type: 'text',
              placeholder: 'Phone Number',
            }}
          />
        </div>
        <p className={classes.register__forgot}>Forgot your password?</p>
      </div>
      <div className={classes.register__btnSignIn}>Sign Up</div>
      <p className={classes.register__createAccount}>
        If have an Account?{' '}
        <span className={classes.register__link} onClick={switchToLogin}>
          {' '}
          Sign Up{' '}
        </span>{' '}
      </p>
    </div>
  );
};
export default Register;
