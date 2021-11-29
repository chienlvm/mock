import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import classes from './Layout.module.css';

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <Navigation />
      <Breadcrumb />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
