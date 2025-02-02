import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import tracking from "../../utils/tracking";
import classNames from "classnames";
import styles from "./styles";
import { searchOrganizationsUrlAnchor } from "../../utils/urlAnchors";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { ALT_LANGUAGES } from '../../utils/langUtils';
import { withRouter } from 'next/router'
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'


const trackSearchButtonLinkClick = (device) => {
  tracking.trackSearchButtonLinkClick(device);
};

const NavItem = ({
  href,
  text,
  classes,
  onClickHandler,
  subsection,
  target,
}) => {
  return (
    <li className={classes.item} onClick={onClickHandler}>
      <Link href={href} className={classes.link} passHref>
        <Typography
          component="a"
          target={target}
          className={subsection ? classes.subsectionLink : classes.link}
        >
          {text}
        </Typography>
      </Link>
    </li>
  );
};


const NavListDesktop = ({ classes, router, handleLangChange }) => {



  return (
    <ul className={classes.container}>
      <NavItem
        href="/#howItWorks"
        text={
          <FormattedMessage id="nav.howItWorks" defaultMessage="How it works" />
        }
        classes={classes}
      />
      <NavItem
        href="/#faq"
        text={<FormattedMessage id="nav.faq" defaultMessage="FAQ" />}
        classes={classes}
      />
      <NavItem
        href="https://databrokerswatch.org/top-ten"
        text={
          <FormattedMessage id="nav.data-brokers" defaultMessage="Data Brokers" />
        }
        classes={classes}
      />
      <NavItem
        href="/#Extension"
        text={
          <FormattedMessage id="nav.extension" defaultMessage="Browser Extension" />
        }
        classes={classes}
      />

      <NavItem
        href="/contribute"
        text={<FormattedMessage id="nav.contribute" defaultMessage="Contribute" />}
        classes={classes} 
      />

      <NavItem
        href="/about"
        text={<FormattedMessage id="nav.about" defaultMessage="About" />}
        classes={classes} 
      />

      <li>
        <Select
          value={router.locale}
          onChange={event => handleLangChange(event, router)}
          MenuProps={{style: {zIndex: "100000"}}}
          className={classNames(classes.langSelect, classes.link)}
        >
          {Object.keys(ALT_LANGUAGES).map((locale) => (
            <MenuItem key={locale} value={locale}>
              {ALT_LANGUAGES[locale]}
            </MenuItem>
          ))}
          <hr/>
          <MenuItem key="help_translate" value="contribute">  
            <FormattedMessage id="nav.helpTranslate" defaultMessage="Help translate" />
          </MenuItem>          
        </Select>
      </li>

      <li>
        <a
          href={`/#${searchOrganizationsUrlAnchor}`}
          className={classes.OptOutRedButtonDesktop}
          tabIndex={0}
          onClick={() => trackSearchButtonLinkClick("desktop")}
        >
          <Typography component="span" className={classes.linkButton}>
            <FormattedMessage id="nav.search" defaultMessage="Search Organizations"/>
          </Typography>
        </a>
      </li>

    </ul>
  );
};

const NavListMobile = ({ classes, mobileNavOpen, toggleMobileNav, router, handleLangChange }) => {
  return (
    <div
      className={classNames(
        mobileNavOpen ? classes.scrollIn : classes.scrollOut,
        "mob-navbar"
      )}
    >
      <ul className={classes.mobileList}>
        <NavItem
          onClickHandler={toggleMobileNav}
          href="/#howItWorks"
          text={
            <FormattedMessage id="nav.howItWorks" defaultMessage="How it works" />
          }
          classes={classes}
        />
        <NavItem
          onClickHandler={toggleMobileNav}
          href="/#faq"
          text={<FormattedMessage id="nav.faq" defaultMessage="FAQ" />}
          classes={classes}
        />
        <NavItem
          onClickHandler={toggleMobileNav}
          href="https://databrokerswatch.org/top-ten"
          text={
            <FormattedMessage id="nav.data-brokers" defaultMessage="Data Brokers" />
          }
          classes={classes}
        />

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/about"
          text={<FormattedMessage id="nav.about" defaultMessage="About" />}
          classes={classes}
        />
        <Select
          value={router.locale}
          onChange={event => handleLangChange(event, router)}
          MenuProps={{style: {zIndex: "10000"}}}
          className={classNames(classes.langSelect, classes.link)}
        >
          {Object.keys(ALT_LANGUAGES).map((locale) => (
            <MenuItem key={locale} value={locale}>
              {ALT_LANGUAGES[locale]}
            </MenuItem>
          ))}
          <hr/>
          <MenuItem key="help_translate" value="contribute">  
            <FormattedMessage id="nav.helpTranslate" defaultMessage="Help translate" />
          </MenuItem>             
        </Select>
        <a
          href={`/#${searchOrganizationsUrlAnchor}`}
          className={classes.OptOutRedButton}
          tabIndex={0}
          onClick={() => {
            toggleMobileNav();
            trackSearchButtonLinkClick("mobile");
          }}
        >
          <Typography component="span" className={classes.linkButton}>
            <FormattedMessage id="nav.search" defaultMessage="Search Organizations"/>
          </Typography>
        </a>

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/contribute"
          subsection={true}
          text={<FormattedMessage id="nav.contribute" defaultMessage="Contribute" />}
          classes={classes}
        />        

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/#Extension"
          subsection={true}
          text={
            <FormattedMessage
              id="nav.extension"
              defaultMessage="Browser Extension"
            />
          }
          classes={classes}
        />

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/#donations"
          subsection={true}
          text={
            <FormattedMessage id="nav.donation" defaultMessage="Make a Donation" />
          }
          classes={classes}
        />

        <NavItem
          onClickHandler={toggleMobileNav}
          href="/privacy"
          subsection={true}
          text={
            <FormattedMessage
              id="nav.privacyPoilcy"
              defaultMessage="Privacy Policy"
            />
          }
          classes={classes}
        />

        <NavItem
          onClickHandler={toggleMobileNav}
          href="mailto:info@yourdigitalrights.org"
          subsection={true}
          text={<FormattedMessage id="nav.contact" defaultMessage="Contact Us" />}
          classes={classes}
        />

        <NavItem
          subsection={true}
          target="_blank"
          href="https://twitter.com/search?q=ownyourdata&src=typeahead_click"
          text={
            <div className={classes.twitterHandle}>
              <img src="/images/sh/tw-grey.svg" />
              <FormattedMessage
                id="nav.twitterHastag"
                defaultMessage="#ownyourdata"
              />
            </div>
          }
          classes={classes}
        />
      </ul>
    </div>
  );
};

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileNavOpen: false,
    };
    this.toggleMenu = React.createRef();
    this.hamburgerButton = React.createRef();
    this.menuItem = React.createRef();

    this.toggleMobileNav = this.toggleMobileNav.bind(this);
    this.handleCloseNav = this.handleCloseNav.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleCloseNav);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleCloseNav);
  }

  toggleMobileNav() {
    this.setState((currentState) => {
      return {
        mobileNavOpen: !currentState.mobileNavOpen,
      };
    });
  }

  handleLangChange = (event, router) => {
    if (event.target.value === "contribute") {
      router.push("/contribute");  
    } else {
      cookieCutter.set('NEXT_LOCALE', event.target.value);
      router.push(router.asPath, router.asPath, {locale: event.target.value});
    }
  };

  handleCloseNav(event) {
    if (
      this.state.mobileNavOpen &&
      !this.toggleMenu.current.contains(event.target) &&
      !this.hamburgerButton.current.contains(event.target)
    ) {
      this.setState({ mobileNavOpen: false });
    }
  }

  render() {
    const { classes, children } = this.props;
    const { mobileNavOpen } = this.state;

    return (
      <div>
        <nav ref={this.toggleMenu} className={classes.nav}>
          <a className={classes.logoLink} href="/">
            <img className={classes.logo} src="/images/type.svg" tabIndex={0} />
          </a>
          <NavListDesktop classes={classes} router={this.props.router} handleLangChange={this.handleLangChange} />
          <img
            className={classes.hamburgerButton}
            src={
              mobileNavOpen
                ? "/images/close-icon.svg"
                : "/images/hamburgerIcon.svg"
            }
            onBlur={this.onBlurHandler}
            onClick={this.toggleMobileNav}
            tabIndex={0}
          />
        </nav>
        <div className={classes.navChildren}>{children}</div>

        <div
          ref={this.hamburgerButton}
          className={classNames(
            classes.mobileListContainer,
            mobileNavOpen ? classes.showMobContainer : classes.hideMobContainer
          )}
          onFocus={this.onFocusHandler}
        >
          <NavListMobile
            classes={classes}
            mobileNavOpen={mobileNavOpen}
            toggleMobileNav={this.toggleMobileNav}
            router={this.props.router}
            handleLangChange={this.handleLangChange}
          />
        </div>
        {mobileNavOpen && <div className={classes.fadeBackground} />}
      </div>
    );
  }
}
export default withStyles(styles)(withRouter(Nav));
