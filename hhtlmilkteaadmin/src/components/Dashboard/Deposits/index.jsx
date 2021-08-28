import React from 'react';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './../Title';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RevenueToday } from "../../../store/actions/RevenueAction";
// function preventDefault(event) {
//   event.preventDefault();
// }

const Deposits = () => {
  const { revenueToday } = useSelector((state) => state.revenue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RevenueToday());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Title>Doanh thu hôm nay</Title>
      <Typography component="p" variant="h4">
        {revenueToday.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
      </Typography>
    </React.Fragment>
  );
}

export default Deposits