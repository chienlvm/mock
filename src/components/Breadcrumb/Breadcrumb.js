import classes from './Breadcrumb.module.scss';

const Breadcrumb = () => {

  return (
    <div className={classes.breadcrumb}>
      <div className={classes.breadcrumb__main}>
        <p className={classes.breadcrumb__title}>Shopping Cart</p>
        <ul className={classes.breadcrumb__list}>
          <li className={classes.breadcrumb__item}>
            <a href='/'>Home</a>
          </li>
          <li className={classes.breadcrumb__item}>
            <span className={classes.breadcrumb__itemName}>Customer</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Breadcrumb;
