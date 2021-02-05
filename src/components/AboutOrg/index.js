import Fragment from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const AboutOrg = ({ classes, selectedCompany, canonical }) => {

  return (
    <div className={classes.about}>
      <div id="about-org" className={classes.container}>
        <div id="about-org-text" className={classes.aboutText}>
          <div id="about-org-heading" className={classes.heading}>
            <Typography
              variant={"display1"}
              className={classes.title}
              gutterBottom={true}
              component={"h3"}
            >
              Privacy at {selectedCompany.name}
            </Typography>
          </div>
          <div id="about-detail-text" className={classes.detailText}>
            Email:{" "}
            <strong>
              <a
                target="new"
                href={`mailto:${selectedCompany.email}`}
                className={classes.link}
              >
                {selectedCompany.email}
              </a>
            </strong>
            {selectedCompany.privacyPolicyUrl && (
              <span>
                <br />
                Privacy Policy:{" "}
                <a
                  target="new"
                  href={`${selectedCompany.privacyPolicyUrl}`}
                  className={classes.link}
                >
                  {selectedCompany.privacyPolicyUrl}
                </a>
              </span>
            )}
            <br />
            Number of request sent:{" "}
            <strong>{selectedCompany.emailsSent}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(AboutOrg);