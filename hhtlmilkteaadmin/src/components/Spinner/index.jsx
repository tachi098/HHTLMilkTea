import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  TextField,
  makeStyles,
  Grid,
  Switch,
  FormHelperText,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index.css";
import Notification from "./../../common/Notification";
import { confirmAlert } from "react-confirm-alert";
import {
  SPINNER_ALERT_TITLE,
  SPINNER_ALERT_MESSAGE,
  SPINNER_NOTIFICATION_WARN,
  SPINNER_LABLE,
  SPINNER_ERROR_LABLE,
} from "./../../common/Constant";
import { useDispatch, useSelector } from "react-redux";
import {
  SpinnerListAction,
  SpinnerSaveAction,
  SpinnerRemoveAction,
} from "./../../store/actions/SpinnerAction";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
  },
  flexRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    height: 36,
    marginRight: 15,
  },
  flexForm: {
    display: "flex",
    alignItems: "center",
  },
  inputLableSpin: {
    marginBottom: 16,
  },
  flexInputColor: {
    display: "flex",
    justifyContent: "center",
  },
  positionRootSpin: {
    position: "relative",
    width: "100%",
    height: "100vh",
  },
  positionWeel: {
    position: "absolute",
    top: 0,
    left: "-10%",
    transform: "translate(0, -10%)",
  },
  btnReload: {
    position: "relative",
    zIndex: 1,
  },
});

const Spinner = () => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const spinner = useSelector((state) => state.spinner);

  const [spinnersNew, setSpinnersNew] = useState([]);
  const [segmentsNew, setSegmentsNew] = useState([]);
  const [segColorsNew, setSegColorsNew] = useState([]);
  const [isLoadingNew, setIsLoadingNew] = useState(false);

  useEffect(() => {
    dispatch(SpinnerListAction());
  }, [dispatch]);

  useEffect(() => {
    const { spinners, isLoading } = spinner;
    const segments = [];
    const segColors = [];

    if (Array.isArray(spinners)) {
      spinners.forEach((sp) => {
        const { name, color } = sp;

        segments.push(name);
        segColors.push(color);
      });
    }

    setSpinnersNew(spinners);
    setSegmentsNew(segments);
    setSegColorsNew(segColors);
    setIsLoadingNew(isLoading);
  }, [spinner]);

  const onFinished = (winner) => {
    console.log(winner);
  };

  const handleCheckSwitch = (e) => {
    setDisabled(true);

    if (e.target.checked) {
      setDisabled(false);
    }
  };

  const handleOnDelete = (id) => {
    dispatch(SpinnerRemoveAction(id));
    setIsLoadingNew(false);
    Notification.success(SPINNER_NOTIFICATION_WARN);
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: SPINNER_ALERT_TITLE,
      message: SPINNER_ALERT_MESSAGE,
      buttons: [
        {
          label: "Có",
          onClick: () => handleOnDelete(id),
        },
        {
          label: "Không",
        },
      ],
    });
  };

  const handleOnSubmit = (data) => {
    setError(true);
    if (!Object.is(data.name, "")) {
      dispatch(SpinnerSaveAction(data));
      setIsLoadingNew(false);
      setError(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={7} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="spanning table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nhãn</TableCell>
                  <TableCell>Màu Sắc</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoadingNew &&
                  spinnersNew.map((spinner, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{spinner.name}</TableCell>
                      <TableCell>
                        <input type="color" value={spinner.color} disabled />
                      </TableCell>
                      <TableCell className={classes.flexRight}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(spinner.id)}
                        >
                          Xoá
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Switch onChange={handleCheckSwitch} />
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleOnSubmit)}
          >
            <Grid container spacing={3} className={classes.flexForm}>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                className={classes.inputLableSpin}
              >
                <Autocomplete
                  freeSolo
                  disabled={disabled}
                  options={SPINNER_LABLE}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Nhãn Quay"
                      required
                      fullWidth
                      disabled={disabled}
                      inputRef={register}
                      name="name"
                    />
                  )}
                />
                {error && (
                  <FormHelperText error={error}>
                    {SPINNER_ERROR_LABLE}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                className={classes.flexInputColor}
              >
                <input
                  type="color"
                  ref={register}
                  name="color"
                  disabled={disabled}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12} className={classes.flexRight}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  disabled={disabled}
                  type="submit"
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item md={5} sm={12} xs={12} className={classes.flexCenter}>
          <div className={classes.positionRootSpin}>
            <div className={classes.positionWeel}>
              {isLoadingNew && (
                <WheelComponent
                  segments={segmentsNew}
                  segColors={segColorsNew}
                  onFinished={(winner) => onFinished(winner)}
                  primaryColor="black"
                  contrastColor="white"
                  buttonText="Spin"
                  isOnlyOnce={false}
                  size={195}
                  upDuration={100}
                  downDuration={1000}
                />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Spinner;
