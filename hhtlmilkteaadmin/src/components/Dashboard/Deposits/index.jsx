import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './../Title';

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = () => {
  return (
    <React.Fragment>
      <Title>Doanh thu</Title>
      <Typography component="p" variant="h4">
        3,024 VNĐ
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Chi tiết
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Deposits