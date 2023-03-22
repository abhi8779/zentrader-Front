import SidebarSectionList from "@/features/navigation/lists/SidebarSectionList";
import { Divider, List, SwipeableDrawer } from "@material-ui/core";
import React from "react";
import SideBarBottomSectionList from "../lists/SideBarBottomSectionList";

function SmScreenDrawer({
  handleDrawerClose,
  filteredMenu,
  open,
  handleDrawerOpen,
}) {
  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        onClick={handleDrawerClose}
        open={open}
      >
        <List>
          {filteredMenu
            .filter((x) => Boolean(x))
            .map((mItem) => (
              <React.Fragment key={mItem.menuLabel}>
                <SidebarSectionList
                  label={mItem.menuLabel}
                  items={mItem.items}
                />
                <Divider />
              </React.Fragment>
            ))}
        </List>
        <SideBarBottomSectionList />
      </SwipeableDrawer>
    </div>
  );
}

export default SmScreenDrawer;
