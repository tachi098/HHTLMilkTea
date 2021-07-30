import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AppBar, Badge, Menu, MenuItem } from '@material-ui/core';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import logo from "./../../../assets/img/Milktea.gif"
import delivery from "./../../../assets/img/delivery.png"
import { Link, NavLink, useHistory } from 'react-router-dom';

const sections = [
    { title: 'TRANG CHỦ', url: '/home' },
    { title: 'TRÀ SỮA', url: '/milktea' },
    { title: 'TRÁNG MIỆNG', url: '/dessert' },
    { title: 'SẢN PHẨM', url: '/product' },
    { title: 'VỀ CHÚNG TÔI', url: '/about' },
    { title: 'THẺ', url: '/card' },
];

const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        justifyContent: 'space-between',
    },
    toolbarTitle: {
        flex: 2,
        color: '#2e9e53',
        fontWeight: 'bold',
    },
    toolbarSecondary: {
        justifyContent: 'center',
        overflowX: 'auto',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    toolbarLink: {
        paddingRight: theme.spacing(2),
        flexShrink: 0,
        fontSize: 16 + 'px',
        marginRight: 24 + 'px',
        color: '#444a46',
        fontWeight: 'bold',
        '&:hover': {
            color: '#416c48',
        }
    },
    btnResponsive: {
        cursor: 'pointer',
        color: '#444a46',
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
    navbarLeft: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    }
}));

const Header = () => {

    const history = useHistory();
    const classes = useStyles();

    const [left, setLeft] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElSearch, setAnchorElSearch] = useState(null);

    function handleClick(event) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleClickSearch(event) {
        if (anchorElSearch !== event.currentTarget) {
            setAnchorElSearch(event.currentTarget);
        }
    }

    function handleCloseSearch() {
        setAnchorElSearch(null);
    }

    const toggleDrawer = () => () => {
        setLeft(!left);
    };

    const onHandelRedirectCart = () => {
        history.push("/shoppingcart")
    }

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(left, false)}
            onKeyDown={toggleDrawer(left, false)}
        >
            <List style={{ width: 200 + 'px' }}>
                {sections.map((text) => (
                    <Link to={text.url} style={{ textDecoration: 'none' }} key={text.title}>
                        <ListItem button >
                            <ListItemText primary={text.title} style={{ color: 'black' }} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <AppBar style={{ backgroundColor: 'white' }}>
            <Toolbar className={classes.toolbar}>
                <MoreVertIcon className={classes.btnResponsive} onClick={toggleDrawer(true)} />

                <SwipeableDrawer
                    anchor="left"
                    open={left}
                    onClose={toggleDrawer(left, false)}
                    onOpen={toggleDrawer(left, true)}
                >
                    {list()}
                </SwipeableDrawer>

                <img src={delivery} alt="delivery" width={200} className={classes.navbarLeft} />
                <img src={logo} alt="Milktea" width={50} loading="lazy" />
                <div>
                    <Badge badgeContent={4} color="secondary" style={{ marginRight: 20 }}>
                        <ShoppingCartIcon
                            style={{ color: '#416c48' }}
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            onMouseOver={handleClick} />
                    </Badge>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        MenuListProps={{ onMouseLeave: handleClose }}
                        style={{ marginTop: 25, marginLeft: -100, width: '350' }}
                    >
                        <MenuItem style={{ paddingLeft: 100, paddingRight: 100, color: "#416c48", backgroundColor: 'transparent' }}>
                            Giỏ hàng của bạn
                        </MenuItem>
                        <MenuItem style={{ display: 'flex', justifyContent: 'center', color: 'red', backgroundColor: 'transparent' }}>
                            Không có sản phẩm nào
                        </MenuItem>
                        <MenuItem style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' }}>
                            <Button variant="outlined" size="small" style={{ color: "#416c48" }} onClick={onHandelRedirectCart}>
                                Xem chi tiết
                            </Button>
                        </MenuItem>
                    </Menu>

                    <Link to="/signin" style={{textDecoration: 'none'}}>
                        <Button variant="outlined" size="small" style={{ color: "#416c48" }}>
                            Đăng nhập
                        </Button>
                    </Link>
                </div>
            </Toolbar>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {sections.map((section) => (
                    <NavLink
                        style={{ textDecoration: 'none', fontFamily: 'sans-serif' }}
                        to={section.url}
                        activeStyle={{ color: '#416c48' }}
                        key={"drawler" + section.title}
                        className={classes.toolbarLink}
                    >
                        {section.title}
                    </NavLink>
                ))}
                <SearchIcon
                    style={{ cursor: 'pointer', color: '#444a46' }}
                    aria-owns={anchorElSearch ? "simple-menu" : undefined}
                    aria-haspopup="true"
                    onClick={handleClickSearch}
                />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorElSearch}
                    open={Boolean(anchorElSearch)}
                    onClose={handleCloseSearch}
                    MenuListProps={{ onMouseLeave: handleCloseSearch }}
                    style={{ marginTop: 30, marginLeft: -120, width: '350' }}
                >
                    <Link to="/milktea" style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem>
                            Tìm kiếm trà sữa
                        </MenuItem>
                    </Link>
                    <MenuItem>
                        Tìm kiếm cà phê
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Header