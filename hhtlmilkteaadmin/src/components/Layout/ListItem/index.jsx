import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { Euro, FormatAlignCenter } from "@material-ui/icons";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const mainListItems = (
  <div>
    <Link to="/dashboard" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Đơn hàng" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Euro />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Người dùng" />
    </ListItem>
    <Link to="/spinner" style={{ textDecoration: "none", color: "black" }}>
      <ListItem>
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="Vòng Quay" />
      </ListItem>
    </Link>
    <Divider />

    <Link to="/form" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <FormatAlignCenter />
        </ListItemIcon>
        <ListItemText primary="Form" />
      </ListItem>
    </Link>
    <Link to="/table" style={{ textDecoration: "none", color: "black" }}>
      <ListItem button>
        <ListItemIcon>
          <FormatAlignCenter />
        </ListItemIcon>
        <ListItemText primary="Table" />
      </ListItem>
    </Link>
  </div>
);

export default mainListItems;
