import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  Button,
  Grid,
  makeStyles,
  TextField,
  FormHelperText,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { updateProfile } from "../../../store/actions/UserAction";
import Notification from "./../../../common/Notification";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderBottom: "1px solid #ececec",
  },
  title: {
    color: "#7f7f7f",
    fontSize: 14,
  },
  content: {
    paddingTop: 10,
    paddingRight: 50,
    paddingLeft: 30,
    paddingBottom: 30,
    display: "flex",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  button: {
    marginBottom: theme.spacing(3),
    marginLeft: 50,
  },
  btnUpload: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 20,
    },
    marginTop: 10,
  },
  upload: {
    display: "grid",
    justifyItems: "center",
  },
  errorImg: {
    color: "red",
    marginLeft: 60,
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Profile = () => {
  const history = useHistory();
  const classes = useStyles();
  const { customer } = useSelector((state) => state.customer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  //Display image
  const [img, setImg] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onSubmit = (data) => {
    data.multipartFile = data.multipartFile[0] ? data.multipartFile[0] : null;
    data.email = customer?.email;
    setTimeout(() => {
      dispatch(updateProfile(data)).then((res) => {
        setOpen(false);
        history.replace("/account");
        Notification.success("???? c???p nh???p th??nh c??ng!");
      });
    }, 2000);
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className={classes.header}>
        <Typography variant="h6">H??? S?? C???A T??I</Typography>
        <Typography className={classes.title}>
          Qu???n l?? th??ng tin h??? s?? v?? b???o m???t t??i kho???n
        </Typography>
      </div>
      {customer && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="username"
            inputRef={register()}
            defaultValue={customer.username}
            style={{ display: "none" }}
          />
          <Grid container className={classes.content}>
            <Grid item md={8} xs={12} sm={12} style={{ paddingLeft: 20 }}>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="H??? t??n"
                  fullWidth
                  defaultValue={customer.fullName}
                  name="fullName"
                  inputRef={register({
                    required: "H??? t??n kh??ng ???????c ????? tr???ng",
                    pattern: {
                      value: /^[a-zA-Z_??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\s]+$/,
                      message: "T??n kh??ng h???p l???",
                    },
                  })}
                />
                {errors.fullName?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.fullName?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birthday"
                  InputLabelProps={{ shrink: true }}
                  label="Ng??y sinh"
                  type="date"
                  defaultValue={moment(customer.birthday).format("YYYY-MM-DD")}
                  inputRef={register({ required: true })}
                />
                {errors.birthday && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    Ng??y sinh kh??ng ???????c ????? tr???ng
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  name="address"
                  label="?????a ch???"
                  fullWidth
                  defaultValue={customer.address}
                  inputRef={register({ required: true })}
                />
                {errors.address && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    ?????a ch??? kh??ng ???????c ????? tr???ng
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="S??? ??i???n tho???i"
                  fullWidth
                  defaultValue={customer.phone}
                  inputRef={register({
                    required: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng",
                    pattern: {
                      value: /^[0-9]{9,11}$/i,
                      message: "S??? ??i???n tho???i kh??ng h???p l???",
                    },
                  })}
                />
                {errors.phone?.message && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="component-error-text"
                  >
                    {errors.phone?.message}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="?????a ch??? email"
                  fullWidth
                  defaultValue={customer.email}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              sm={12}
              style={{ paddingLeft: 30, paddingTop: 20 }}
            >
              <Grid item xs={12} sm={12} className={classes.upload}>
                <Avatar
                  alt="avatar"
                  src={img ? img : customer.linkImage}
                  className={classes.large}
                />
                <label htmlFor="upload-photo">
                  <TextField
                    id="upload-photo"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onImageChange}
                    fullWidth
                    name="multipartFile"
                    inputRef={register({
                      validate: (value) => {
                        if (value[0]?.size >= 1048576) {
                          return "k??ch th?????c h??nh ???nh qu??? l???n";
                        }
                      },
                    })}
                  />
                  {errors.multipartFile?.message && (
                    <FormHelperText
                      className={classes.errorImg}
                      id="component-error-text"
                    >
                      {errors.multipartFile?.message}
                    </FormHelperText>
                  )}

                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    className={classes.btnUpload}
                  >
                    T???i ???nh l??n
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            C???p nh???t
          </Button>
        </form>
      )}

      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default Profile;
