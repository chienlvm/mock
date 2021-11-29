import classes from './CartInfo.module.scss';

const CartInfo = (props) => {
  return (
    <>
      <div className={classes.infoCustomer}>
        <div className={classes.customer}>
          <div className={classes.customerName}>
            <p className={classes.title}>Shop Name:</p>
            <p className={classes.value}>{props.shopName}</p>
          </div>
          <div className={classes.cartLink}>
            <p className={classes.title}>Cart Link:</p>
            <p>http://localhost/cart/{props.cartId}</p>
          </div>
          <div className={classes.share} onClick={() => navigator.clipboard.writeText(`http://localhost/cart/${props.cartId}`)}>Share</div>
        </div>
        <div className={classes.phoneNumber}>
          <p className={classes.title}>Phone number:</p>
          <p className={classes.value}>{props.phoneNumber}</p>
        </div>
      </div>
    </>
  );
};
export default CartInfo;
