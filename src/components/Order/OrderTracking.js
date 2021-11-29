import { useRef } from 'react';
import classes from './OrderTracking.module.scss';

const OrderTracking = () => {
  return (
    <>
      <ol className={classes.progtrckr} data-progtrckr-steps='5'>
        <li className={classes.progtrckrDone}>Order Processing</li>
        <li className={classes.progtrckrDone}>Pre-Production</li>
        <li className={classes.progtrckrDone}>In Production</li>
        <li className={classes.progtrckrTodo}>Shipped</li>
        <li className={classes.progtrckrTodo}>Delivered</li>
      </ol>
    </>
  );
};
export default OrderTracking;
