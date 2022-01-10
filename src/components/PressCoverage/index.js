import { Title } from "./text";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import GridList from '@material-ui/core/GridList';
import GridListTile from "@material-ui/core/GridListTile";


const items = [
  { name: "Wired", image: "https://www.wired.com/verso/static/wired/assets/logo-header.a7598835a549cb7d5ce024ef0710935927a034f9.svg", url: "https://www.wired.com/story/delete-yourself-from-internet/" },
  { name: "Fast Company", image: "/images/press/fastcompany.png", url: "https://www.fastcompany.com/90310803/here-are-the-data-brokers-quietly-buying-and-selling-your-personal-information" },
  { name: "Business Insider", image: "/images/press/business-insider.webp", url: "https://www.businessinsider.com/how-to-delete-yourself-from-the-internet?IR=T" },
  { name: "How To Geek", image: "/images/press/howtogeek.png", url: "https://www.howtogeek.com/570124/how-to-delete-your-personal-information-from-people-finder-sites/" },
  { name: "MSN", image: "/images/press/msn.png", url: "https://www.msn.com/en-us/news/technology/how-to-delete-yourself-from-the-internet-with-5-different-methods/ar-BB1aZJ4A?li=BBnb7Kz" },
  { name: "Indivigital", image: "/images/press/indivigital.png", url: "https://indivigital.com/news/new-gdpr-tool-targets-google-facebook-with-automated-right-to-be-forgotten-requests/" },
];


const PressCoverage = ({ classes }) => {
  return (
    <div className={classes.container}>
      <Typography color="inherit" className={classes.intro}>
        {Title}
      </Typography>
      <div className={classes.inner}>
        <GridList className={classes.gridList} cols={items.length} cellHeight={50} spacing={20}>
          {items.map((item) => (
            <GridListTile
              button
              component="a"
              href={item.url}
              key={item.url}
            >
              <img className={classes.pressLogo} src={item.image} alt={item.name} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};
export default withStyles(styles)(PressCoverage);
