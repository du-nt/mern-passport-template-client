import { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CreateIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import Logo from "./Logo";
import ScrollToTop from "./ScrollToTop";
import Sidebar from "./Sidebar";

import Search from "./Search";
import MobileSearch from "./MobileSearch";

import MobileCart from "./MobileCart";
import MobileNotification from "./MobileNotification";

import NotificationsPopover from "./NotificationsPopover";
import MessagesPopover from "./MessagesPopover";
import CartPopover from "./CartPopover";

import { logout } from "../../slices/authSlice";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: theme.spacing(0, 0.5),
  },
  toolbarFixed: {
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
    alignSelf: "center",
    padding: theme.spacing(0, 0.5),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  rightPart: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginBtn: {
    marginRight: 12,
  },
  paper: {
    backgroundColor: theme.palette.drawer.default,
  },
  list: {
    padding: 0,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: theme.palette.avatar.main,
    backgroundColor: theme.palette.avatar.background,
  },
  avatarDesktop: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    color: theme.palette.primary.main,
    backgroundColor: "#fff",
  },
  avatarBtn: {
    padding: theme.spacing(1),
  },
}));

export default function Navbar({ isDark, toggle }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const [isHoverMessages, setIsHoverMessages] = useState(false);
  const [messagesAnchorEl, setMessagesAnchorEl] = useState(null);

  const [isHoverNotifications, setIsHoverNotifications] = useState(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const [isHoverCart, setIsHoverCart] = useState(false);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const [openMobileNotification, setOpenMobileNotification] = useState(false);
  const [openMobileCart, setOpenMobileCart] = useState(false);

  const openNotifications = Boolean(notificationsAnchorEl);
  const openMessages = Boolean(messagesAnchorEl);
  const openCart = Boolean(cartAnchorEl);

  const matched600 = useMediaQuery("(min-width:600px)");
  const matched960 = useMediaQuery("(min-width:960px)");

  const loginPattern = true;
  const appBarFixedPosition = true;

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const avatarLetter =
    user?.displayName.charAt(0).toUpperCase() ||
    user?.email.charAt(0).toUpperCase();

  const backToTopId = "back-to-top-anchor";

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleToggleTheme = () => {
    handleMenuClose();
    toggle();
  };

  /* Toggle open/close notifications pop up*/
  const handleToggleNotifications = (event) => {
    setIsHoverNotifications(false);
    setNotificationsAnchorEl(
      notificationsAnchorEl ? null : event.currentTarget
    );
  };

  const handleCloseNotifications = (event) => {
    if (notificationsAnchorEl && notificationsAnchorEl.contains(event.target)) {
      return;
    }
    setNotificationsAnchorEl(null);
  };

  /* Toggle open/close messages pop up*/
  const handleToggleMessages = (event) => {
    setIsHoverMessages(false);
    setMessagesAnchorEl(messagesAnchorEl ? null : event.currentTarget);
  };

  const handleCloseMessages = (event) => {
    if (messagesAnchorEl && messagesAnchorEl.contains(event.target)) {
      return;
    }
    setMessagesAnchorEl(null);
  };

  /* Toggle open/close cart pop up*/
  const handleToggleCart = (event) => {
    setIsHoverCart(false);
    setCartAnchorEl(cartAnchorEl ? null : event.currentTarget);
  };

  const handleCloseCart = (event) => {
    if (cartAnchorEl && cartAnchorEl.contains(event.target)) {
      return;
    }
    setCartAnchorEl(null);
  };

  /* Open/Close mobile notifications */
  const handleOpenMobileNotification = () => setOpenMobileNotification(true);

  const handleCloseMobileNotification = () => setOpenMobileNotification(false);

  /* Open/Close mobile cart */
  const handleOpenMobileCart = () => setOpenMobileCart(true);

  const handleCloseMobileCart = () => setOpenMobileCart(false);

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout(history, enqueueSnackbar));
  };

  const authFeatures = [
    {
      title: "Log in",
      href: { pathname: "/login", state: { from: location.pathname } },
      isHidden: loginPattern,
      icon: <ExitToAppIcon />,
    },
    {
      title: "Register",
      href: { pathname: "/register", state: { from: location.pathname } },
      icon: <CreateIcon />,
    },
  ];

  const guestFeatures = [
    {
      title: "Cart",
      href: "cart",
      icon: <ShoppingCartIcon />,
      badge: 5,
      isHidden: !loginPattern,
      onClick: matched600
        ? handleToggleCart
        : loginPattern
        ? null
        : handleOpenMobileCart,
      onMouseOver: () => setIsHoverCart(true),
      onMouseLeave: () => setIsHoverCart(false),
      showTooltip: !openCart && isHoverCart,
    },
    {
      title: isDark ? "Light mode" : "Dark mode",
      icon: isDark ? <Brightness7Icon /> : <Brightness4Icon />,
      onClick: handleToggleTheme,
    },
  ];

  const userFeatures = [
    {
      title: "Notifications",
      href: "notifications",
      icon: <NotificationsIcon />,
      badge: 3,
      isHidden: loginPattern,
      onClick: matched960
        ? handleToggleNotifications
        : matched600
        ? null
        : loginPattern
        ? handleOpenMobileNotification
        : null,
      onMouseOver: () => setIsHoverNotifications(true),
      onMouseLeave: () => setIsHoverNotifications(false),
      showTooltip: !openNotifications && isHoverNotifications,
    },
    {
      title: "Messages",
      href: "messages",
      icon: <MailIcon />,
      badge: 1,
      onClick: matched960 ? handleToggleMessages : null,
      onMouseOver: () => setIsHoverMessages(true),
      onMouseLeave: () => setIsHoverMessages(false),
      showTooltip: !openMessages && isHoverMessages,
    },
    {
      title: "Account",
      icon: (
        <Avatar
          className={matched960 ? classes.avatarDesktop : classes.avatar}
          src={user?.avatar}
          alt="avatar"
        >
          {avatarLetter}
        </Avatar>
      ),
      hasAvatar: true,
      onClick: handleProfileMenuOpen,
    },
  ];

  const accountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      classes={{
        paper: classes.paper,
      }}
    >
      <MenuItem onClick={handleMenuClose} component={NavLink} to="/profile">
        Profile
      </MenuItem>

      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );

  // On mobile
  const mobile = (
    <>
      {loginPattern ? (
        isAuthenticated ? (
          <IconButton color="inherit" onClick={userFeatures[0].onClick || null}>
            {!userFeatures[0].badge ? (
              userFeatures[0].icon
            ) : (
              <Badge badgeContent={userFeatures[0].badge} color="secondary">
                {userFeatures[0].icon}
              </Badge>
            )}
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={authFeatures[0].icon}
            component={NavLink}
            to={authFeatures[0].href}
          >
            {authFeatures[0].title}
          </Button>
        )
      ) : (
        <IconButton color="inherit" onClick={guestFeatures[0].onClick || null}>
          {!guestFeatures[0].badge ? (
            guestFeatures[0].icon
          ) : (
            <Badge badgeContent={guestFeatures[0].badge} color="secondary">
              {guestFeatures[0].icon}
            </Badge>
          )}
        </IconButton>
      )}
    </>
  );

  const mobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      classes={{
        paper: classes.paper,
        list: classes.list,
      }}
    >
      {guestFeatures.map(
        ({ isHidden, title, icon, badge, href, onClick }, idx) =>
          !isHidden && (
            <MenuItem
              key={idx}
              onClick={onClick || null}
              component={href ? NavLink : null}
              to={href || null}
            >
              <IconButton color="inherit">
                {!badge ? (
                  icon
                ) : (
                  <Badge badgeContent={badge} color="secondary">
                    {icon}
                  </Badge>
                )}
              </IconButton>
              <p>{title}</p>
            </MenuItem>
          )
      )}

      {isAuthenticated
        ? userFeatures.map(
            ({ title, href, icon, badge, isHidden, onClick }, idx) =>
              !isHidden && (
                <MenuItem
                  key={idx}
                  component={href ? NavLink : null}
                  to={href || null}
                  onClick={onClick || null}
                >
                  <IconButton color="inherit">
                    {!badge ? (
                      icon
                    ) : (
                      <Badge badgeContent={badge} color="secondary">
                        {icon}
                      </Badge>
                    )}
                  </IconButton>
                  <p>{title}</p>
                </MenuItem>
              )
          )
        : authFeatures.map(
            ({ isHidden, title, icon, href }, idx) =>
              !isHidden && (
                <MenuItem key={idx} component={NavLink} to={href}>
                  <IconButton color="inherit">{icon}</IconButton>
                  <p>{title}</p>
                </MenuItem>
              )
          )}
    </Menu>
  );

  // On tablet
  const tablet = (
    <>
      {guestFeatures.map(({ icon, badge, onClick }, idx) => (
        <IconButton key={idx} color="inherit" onClick={onClick || null}>
          {!badge ? (
            icon
          ) : (
            <Badge badgeContent={badge} color="secondary">
              {icon}
            </Badge>
          )}
        </IconButton>
      ))}
    </>
  );

  const tabletMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      classes={{
        paper: classes.paper,
        list: classes.list,
      }}
    >
      {isAuthenticated
        ? userFeatures.map(({ title, href, icon, badge, onClick }, idx) => (
            <MenuItem
              key={idx}
              component={href ? NavLink : null}
              to={href || null}
              onClick={onClick || null}
            >
              <IconButton color="inherit">
                {!badge ? (
                  icon
                ) : (
                  <Badge badgeContent={badge} color="secondary">
                    {icon}
                  </Badge>
                )}
              </IconButton>
              <p>{title}</p>
            </MenuItem>
          ))
        : authFeatures.map(({ title, icon, href }, idx) => (
            <MenuItem key={idx} component={NavLink} to={href}>
              <IconButton color="inherit">{icon}</IconButton>
              <p>{title}</p>
            </MenuItem>
          ))}
    </Menu>
  );

  // On desktop
  const desktop = (
    <>
      {guestFeatures.map(
        (
          {
            title,
            icon,
            badge,
            onClick,
            showTooltip,
            onMouseOver,
            onMouseLeave,
          },
          idx
        ) =>
          showTooltip !== undefined ? (
            <Tooltip key={idx} title={title} open={showTooltip}>
              <IconButton
                color="inherit"
                onClick={onClick || null}
                onMouseOver={onMouseOver || null}
                onMouseLeave={onMouseLeave || null}
              >
                {!badge ? (
                  icon
                ) : (
                  <Badge badgeContent={badge} color="secondary">
                    {icon}
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip key={idx} title={title}>
              <IconButton color="inherit" onClick={onClick || null}>
                {!badge ? (
                  icon
                ) : (
                  <Badge badgeContent={badge} color="secondary">
                    {icon}
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
          )
      )}
      {isAuthenticated
        ? userFeatures.map(
            (
              {
                title,
                icon,
                badge,
                hasAvatar,
                onClick,
                showTooltip,
                onMouseOver,
                onMouseLeave,
              },
              idx
            ) =>
              showTooltip !== undefined ? (
                <Tooltip key={idx} title={title} open={showTooltip}>
                  <IconButton
                    className={hasAvatar ? classes.avatarBtn : ""}
                    color="inherit"
                    onClick={onClick || null}
                    onMouseOver={onMouseOver || null}
                    onMouseLeave={onMouseLeave || null}
                  >
                    {!badge ? (
                      icon
                    ) : (
                      <Badge badgeContent={badge} color="secondary">
                        {icon}
                      </Badge>
                    )}
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip key={idx} title={title}>
                  <IconButton color="inherit" onClick={onClick || null}>
                    {!badge ? (
                      icon
                    ) : (
                      <Badge badgeContent={badge} color="secondary">
                        {icon}
                      </Badge>
                    )}
                  </IconButton>
                </Tooltip>
              )
          )
        : authFeatures.map(({ title, icon, href }, idx) => (
            <Button
              key={idx}
              color="inherit"
              variant="outlined"
              className={classes.loginBtn}
              startIcon={icon}
              component={NavLink}
              to={href}
            >
              {title}
            </Button>
          ))}
    </>
  );

  return (
    <Fragment>
      <AppBar position={appBarFixedPosition ? "fixed" : "static"}>
        <Toolbar
          id={appBarFixedPosition ? null : backToTopId}
          classes={{
            root: appBarFixedPosition ? classes.toolbarFixed : classes.toolbar,
          }}
        >
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <div className={classes.rightPart}>
            {matched600 ? <Search /> : <MobileSearch />}

            {matched960 ? desktop : matched600 ? tablet : mobile}

            {!matched960 && (
              <IconButton onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {appBarFixedPosition && <Toolbar id={backToTopId} />}

      {matched960 ? null : matched600 ? tabletMenu : mobileMenu}

      {isAuthenticated && accountMenu}

      <Sidebar open={openDrawer} handleDrawerClose={handleDrawerClose} />

      <ScrollToTop backToTopId={backToTopId} />

      <NotificationsPopover
        open={openNotifications}
        anchorEl={notificationsAnchorEl}
        handleClose={handleCloseNotifications}
      />

      <MessagesPopover
        open={openMessages}
        anchorEl={messagesAnchorEl}
        handleClose={handleCloseMessages}
      />

      <CartPopover
        open={openCart}
        anchorEl={cartAnchorEl}
        handleClose={handleCloseCart}
      />

      <MobileNotification
        open={openMobileNotification}
        handleClose={handleCloseMobileNotification}
      />

      <MobileCart open={openMobileCart} handleClose={handleCloseMobileCart} />
    </Fragment>
  );
}
