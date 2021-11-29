import welcome from '../../assets/Image/welcome.png';
import classes from './LandingPage.module.scss';

const LandingPage = () => {
  return (
    <>
      <div className={classes.welcome}>
        <img src={welcome} className={classes.logo} alt=''></img>
      </div>
    </>
  );
};

export default LandingPage;
