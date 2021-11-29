import { useHistory, Link } from 'react-router-dom';
import { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.scss';
import ArrowIcon from '../../assets/Icon/ArrowDown.svg';
import Logo from '../../assets/Icon/Logo.png';

const Navigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  const handleRedirectShop = () => {
    history.replace('/shop');
  };
  const handleRedirectCustomer = () => {
    history.replace('/customer');
  };
  const handleSignIn = () => {
    history.replace('/login');
  };
  const handleSignUp = () => {
    history.replace('/register');
  };

  return (
    <>
      <header className={classes.nav}>
        <div className={classes.logo}>
          <Link to='/' className={classes.name}>
            <img src={Logo} className={classes.iconLogo} alt=''></img>
            ChienLVM Shop
          </Link>
        </div>
        <div className={classes.navLink}>
          <ul className={classes.link}>
            <li className={classes.itemLink} onClick={handleRedirectShop}>
              Shop
              <img src={ArrowIcon} className={classes.icon} alt=''></img>
            </li>
            <li className={classes.itemLink} onClick={handleRedirectCustomer}>
              Customer
              <img src={ArrowIcon} className={classes.icon} alt=''></img>
            </li>
          </ul>
        </div>
        <div className={classes.info}>
          {!authCtx.isLoggedIn && (
            <>
              <div className={classes.info__signIn} onClick={handleSignIn}>
                Sign in
              </div>
              <div className={classes.info__register} onClick={handleSignUp}>
                Register
              </div>
            </>
          )}
          {authCtx.isLoggedIn && (
            <div className={classes.info__register} onClick={logoutHandler}>
              Logout
            </div>
          )}
        </div>
      </header>
    </>
  );
};
export default Navigation;
