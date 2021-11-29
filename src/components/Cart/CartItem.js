import classes from './CartItem.module.scss';
import defaultImage from '../../assets/Image/default.png';

const CartItem = (props) => {
  const { data } = props;
  const addToCart = (itemId) => {
    props.onAddToCart(itemId)
  }
  return (
    <>
      <li className={classes.cartItem__contentCart}>
        <div className={classes.cartItem__logoItem}>
          <img
            className={classes.cartItem__logo}
            src={
              props.image
                ? `data:image/jpeg;base64,${data.image}`
                : defaultImage
            }
            alt=''
          ></img>
        </div>
        <div className={classes.cartItem__detail}>
          <div className={classes.cartItem__content}>
            <p className={classes.cartItem__name}>{data.name}</p>
            <p className={classes.cartItem__price}>${data.price}</p>
          </div>
          <div className={classes.cartItem__btnAdd} onClick={() => addToCart(data.itemId)}>Add to cart</div>
        </div>
      </li>
    </>
  );
};
export default CartItem;
