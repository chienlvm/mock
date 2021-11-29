import { Fragment } from 'react';
import CustomerPage from '../CustomerPage/CustomerPage';
import LandingPage from '../LandingPage/LandingPage';
import ShopPage from '../ShopPage/ShopPage';

const HomePage = () => {
  const currentPage = 'customer';

  const isLoggedIn = false;
  return (
    <Fragment>
      {isLoggedIn &&
        (currentPage === 'customer' ? <CustomerPage /> : <ShopPage />)}
      {!isLoggedIn && <LandingPage />}
    </Fragment>
  );
};

export default HomePage;
