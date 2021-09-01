import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";
import { Grid } from "@material-ui/core";
import Logo from "./../../assets/img/Milktea.gif";
import { listGame } from "./../../game";

const Game = () => {
  //support group member
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);

  const [game, setGame] = useState("");

  const handleGame = (eb) => {
    console.clear();
    setGame(eb);
  };

  useEffect(() => {
    if (
      order &&
      Object.keys(order).length !== 0 &&
      order.constructor === Object
    ) {
      if (
        (!Object.is(localStorage.getItem("member", null)) &&
          !Object.is(localStorage.getItem("member"), null)) ||
        localStorage.getItem("user")
      ) {
        setTimeout(() => {
          const groupMember = JSON.parse(localStorage.getItem("groupMember"));
          const username = groupMember?.username;
          const type = "team";
          const orderID = groupMember?.orderID;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }

      if (auth?.user?.token) {
        setTimeout(() => {
          const username = auth?.user?.username;
          const type = "team";
          const orderID = order?.id;
          GroupOrderFindAllAction({ username, type, orderID })(dispatch);
        }, 500);
      }
    }
  }, [auth?.user?.token, auth?.user?.username, dispatch, order, order?.id]);

  return (
    <Grid container style={{ minHeight: "60vh" }}>
      <Grid item sm={12} md={4} style={{ paddingTop: 40 }}>
        <div
          style={{
            height: 500,
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            overflow: "scroll",
          }}
        >
          {listGame.map((game, index) => (
            <button
              key={index}
              style={{
                cursor: "pointer",
                margin: 3,
                width: 120,
                height: 120,
                borderColor: "rgb(65, 108, 72)",
              }}
              onClick={() => handleGame(game.eb)}
            >
              <img
                src={game.lg}
                alt={game.na}
                style={{ cursor: "pointer", width: 120, height: 120 }}
              />
            </button>
          ))}
        </div>
      </Grid>
      <Grid
        item
        sm={12}
        md={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        {game === "" ? (
          <img src={Logo} alt="logo" />
        ) : (
          <iframe
            title="game"
            width="500"
            height="500"
            src={game}
            scrolling="no"
            style={{ border: 0, borderRadius: 5 }}
          ></iframe>
        )}
      </Grid>
    </Grid>
  );
};

export default Game;
