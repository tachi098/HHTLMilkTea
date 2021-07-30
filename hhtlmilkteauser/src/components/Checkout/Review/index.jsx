import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
  { name: 'Phin Đen Đá - Đậm Đà', desc: 'Phin Sữa Đá - Năng Lượng', price: '35.000 đ' },
  { name: 'Trà Vải Tươi Dầm', desc: 'Ice Shaken Lychee Tea', price: '40.000 đ' },
  { name: 'Trà Đào Đá Xay', desc: 'Peach Tea', price: '65.000 đ' },
  { name: 'Trà Sữa Phúc Long', desc: 'Phuc Long Tea Latte', price: '50.000 đ' },
  { name: 'Trà Đào Phúc Long', desc: 'Phuc Long Peach Tea', price: '50.000 đ' },
];
const payments = [
  { name: 'Phương thức thanh toán', detail: 'Thanh toán khi nhận hàng' },
  { name: 'Mã giã giá', detail: '#1234' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Thông tin đơn hàng
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Tổng cộng" />
          <Typography variant="subtitle1" className={classes.total}>
            600.500 đ
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Thông tin giao hàng
          </Typography>
          <Typography gutterBottom>Nguyen Van A</Typography>
          <Typography gutterBottom>590 Cách mạng tháng 8, Quận 10, Thành phố Hồ Chí Minh</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Thông tin thanh toán
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}