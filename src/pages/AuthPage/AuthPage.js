import React from 'react';
import { useLocation } from 'react-router-dom';

import Login from '../../components/Auth/Login';
import LoginShop from '../../components/Auth/LoginShop';
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const AuthPage = () => {
  let query = useQuery();
  let param = query.get('type');
  console.log('id', query.get('shop'));
  return (
    <>
      {param === 'shop' && <LoginShop /> }
      {param === 'customer' && <Login /> }
    </>
  );
};

export default AuthPage;
