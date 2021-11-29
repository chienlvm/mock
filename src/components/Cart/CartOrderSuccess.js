import orderSuccess from '../../assets/Image/OrderSuccess.png';
import classes from './CartOrderSuccess.module.scss';

const CartOrderSuccess = () => {
  return (
    <>
      <div className={classes.welcome}>
        <img src={orderSuccess} className={classes.logo} alt=''></img>
      </div>
    </>
  );
};

export default CartOrderSuccess;
