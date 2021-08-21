import { Button, Modal, TextField, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";
import Content from "./Content";
import Slide from "./Slider";

function getModalStyle() {
  const top = 30;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [modalStyle] = React.useState(getModalStyle);
  const [openModalJoin, setOpenModalJoin] = useState(false);
  const [member, setMember] = useState("");
  const [message, setMessage] = useState("");
  const auth = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    setTimeout(() => {
      if (
        Object.is(
          JSON.parse(localStorage.getItem("groupMember"))?.type,
          "team"
        ) &&
        Object.is(localStorage.getItem("member"), null) &&
        Object.is(localStorage.getItem("user"), null)
      ) {
        setOpenModalJoin(true);
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (
      (!Object.is(localStorage.getItem("member", null)) &&
        !Object.is(localStorage.getItem("member"), null)) ||
      (auth?.user?.token && order?.id)
    ) {
      setTimeout(() => {
        const groupMember = JSON.parse(localStorage.getItem("groupMember"));
        const username = groupMember
          ? groupMember?.username
          : auth?.user?.username;
        const type = "team";
        const orderID = groupMember ? groupMember?.orderID : order?.id;
        GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        setOpenModalJoin(false);
      }, 300);
    }
  }, [auth?.user?.token, auth?.user?.username, dispatch, member, order?.id]);

  const handleCloseModalJoin = () => {
    setOpenModalJoin(false);
  };

  const handleJoin = () => {
    if (!Object.is(member, "")) {
      localStorage.setItem("member", member);
      setTimeout(() => {
        const groupMember = JSON.parse(localStorage.getItem("groupMember"));
        const username = groupMember?.username;
        const type = "team";
        const orderID = groupMember?.orderID;
        GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        setOpenModalJoin(false);
      }, 300);
    } else {
      setMessage("Hãy nhập tên để tham gia!");
    }
  };

  const modalJoin = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">NHẬP TÊN THAM GIA NHÓM</h4>
      {message && <h5 style={{ color: "red" }}>{message}</h5>}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          id="standard-disabled"
          style={{ width: 300 }}
          onChange={(e) => setMember(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ width: 130, height: 33 }}
          onClick={handleJoin}
        >
          Tham gia
        </Button>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        open={openModalJoin}
        onClose={handleCloseModalJoin}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalJoin}
      </Modal>
      <Slide />
      <div style={{ marginTop: 30 + "px" }}>
        <Content />
      </div>
    </React.Fragment>
  );
};

export default Home;
