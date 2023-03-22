import SidebarSectionList from "@/features/navigation/lists/SidebarSectionList";
import {
  Divider,
  Drawer,
  IconButton,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import React from "react";
import SideBarBottomSectionList from "../lists/SideBarBottomSectionList";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 64,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const LgScreenDrawer = ({ handleDrawerClose, filteredMenu, open }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {filteredMenu.map((mItem) => {
        return (
          <React.Fragment key={mItem.menuLabel}>
            <SidebarSectionList label={mItem.menuLabel} items={mItem.items} />
            <Divider />
          </React.Fragment>
        );
      })}
      <SideBarBottomSectionList />
    </Drawer>
  );
};

export default LgScreenDrawer;
