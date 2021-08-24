import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";

const Shipping = () => {
  return (
    <div style={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Khoảng Cách</TableCell>
            <TableCell>Phí Giao Hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Dưới 5km</TableCell>
            <TableCell>5.000 VND</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Từ 5km đến 10km</TableCell>
            <TableCell>10.000 VND</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Trên 10km</TableCell>
            <TableCell>15.000 VND</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Shipping;
