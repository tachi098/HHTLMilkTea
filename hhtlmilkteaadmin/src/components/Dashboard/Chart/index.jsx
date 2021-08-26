import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RevenueList, YearList, SumRevenue } from '../../../store/actions/RevenueAction';
import { Grid, Typography, Avatar, Select } from "@material-ui/core"
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Report from './report';
// Generate Sales Data
function createData(month, revenue) {
  return { month, revenue };
}

const Chart = () => {
  const [year, setYear] = useState(2021);
  const theme = useTheme();
  const { listRevenue, listYears, sumRevenue } = useSelector((state) => state.revenue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      RevenueList({
        year: year
      })
    );
    
    dispatch(SumRevenue({
      year: year
    }));

    dispatch(YearList());
  }, [dispatch, year])

  const handleYears = (e) => {
    setYear(e.target.value);
  }

  return (
    < React.Fragment >
      <Grid
        justifyContent="space-between"
        container
        spacing={10}
      >

        <Grid item
          md={6}
          xl={6}
          sm={6}>
          <Typography type="title" color="inherit">
            Thống kê doanh thu
          </Typography>
        </Grid>
        <Grid item
          md={1}
          xl={1}
          sm={1}>
          <PDFDownloadLink
            document={<Report listRevenue={listRevenue} year={year} sum={sumRevenue} />}
            fileName="report"
          >
            <Avatar style={{ cursor: "pointer", backgroundColor: "#FC8400" }}>
              <PictureAsPdfIcon />
            </Avatar>
          </PDFDownloadLink>
        </Grid>
        <Grid item
          md={3}
          xl={3}
          sm={3}>
          <>
            <Select native onChange={handleYears}>
              {listYears.map((y) => (
                <option value={y} key={y}>{y}</option>
              ))}
            </Select>
          </>
        </Grid>
      </Grid>

      <ResponsiveContainer width="100%" height="90%" minHeight="90%" minWidth="100%">
        <LineChart
          data={
            listRevenue.map((r) =>
              createData(r.month, r.revenue)
            )
          }
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="month" stroke={theme.palette.text.secondary}>
            <Label
              position="centerBottom"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Tháng
            </Label>
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Doanh thu (VNĐ)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} dot={false} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment >
  );
}

export default Chart