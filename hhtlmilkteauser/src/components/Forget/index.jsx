import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  FormHelperText,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import EmailIcon from "@material-ui/icons/Email";
import { Link, useHistory, useLocation } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  AuthCheckEmailAction,
  AuthResetPassAction,
} from "./../../store/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./../../common/Notification";
import { send } from "emailjs-com";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "46.95vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const makePass = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Forget = () => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState(null);
  const [message, setMessage] = useState("");
  const [lock, setLock] = useState(false);
  const [lockButton, setLockButton] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  //support group member
  useEffect(() => {
    if (
      !Object.is(localStorage.getItem("member", null)) &&
      !Object.is(localStorage.getItem("member"), null)
    ) {
      setTimeout(() => {
        const groupMember = JSON.parse(localStorage.getItem("groupMember"));
        const username = groupMember?.username;
        const type = "team";
        const orderID = groupMember?.orderID;
        GroupOrderFindAllAction({ username, type, orderID })(dispatch);
      }, 500);
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.token && !user?.roles?.includes("ROLE_ADMIN")) {
      history.push("/home");
    }
  }, [history, user]);

  useEffect(() => {
    const localArr = location.search.replace("?", "").split(/[&=]/);
    const email = localArr[1];
    const password = localArr[3];
    const comfirm = localArr[5];
    if (email && password && comfirm) {
      if (localStorage.getItem("reset-pass")) {
        AuthResetPassAction({ email, password })(dispatch).then((res) => {
          if (Object.is(res.data, "OK")) {
            localStorage.removeItem("reset-pass");
            localStorage.removeItem("email");
            Notification.success("Hệ thống đã duyệt, bạn có thể đổi mật khẩu");
            history.replace("/forget");
          }
        });
      } else {
        Notification.error("Comfirm của bạn đã hết hạn");
        history.replace("/forget");
      }
    }
  }, [dispatch, history, location.search]);

  useEffect(() => {
    if (!timeLeft) {
      setLockButton(false);
      return;
    }

    if (!Object.is(timeLeft, 0)) {
      setLockButton(true);
    }

    if (Object.is(timeLeft, 0)) {
      setTimeLeft(null);
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lockButton, timeLeft]);

  const onSubmit = (data) => {
    if (data?.email === undefined && localStorage.getItem("email")) {
      data.email = localStorage.getItem("email");
    }
    AuthCheckEmailAction(data)(dispatch).then((res) => {
      if (Object.is(res.message, "Email này đã đăng ký")) {
        setMessage("");
        setLock(true);
        setLockButton(true);
        setTimeLeft(10);
        localStorage.setItem("reset-pass", new Date().getTime());

        const emailGenerate = data?.email;
        const passGenerate = makePass(10);
        const urlGenerate = `${window.location.href}?email=${emailGenerate}&password=${passGenerate}&confirm=true`;
        send(
          "service_ls3gsbf",
          "template_nbxspmd",
          {
            toPassword: passGenerate,
            toMessage: urlGenerate,
            reply_to: emailGenerate,
          },
          "user_xHnS7IIfPDiOnDQvSdzc5"
        )
          .then((response) => {
            console.log("SUCCESS!", response.status, response.text);
            localStorage.setItem("email", emailGenerate);
          })
          .catch((err) => {
            console.log("FAILED...", err);
          });
      } else {
        setMessage(res.message);
        localStorage.removeItem("email");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Khởi tạo lại mật khẩu
        </Typography>
        {message && (
          <Typography
            component="span"
            variant="h6"
            style={{ color: "red", fontSize: 16 }}
          >
            {message}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Địa chỉ email"
                name="email"
                disabled={lock}
                inputRef={register({
                  required: {
                    value: true,
                    message: "Email không được để trống",
                  },
                  pattern: {
                    value: /^[\w.]+@\w{2,}(\.\w{2,}){1,2}$/,
                    message: "Email chưa đúng định dạng",
                  },
                })}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.email?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.email?.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={lockButton}
          >
            Gửi{" "}
            <span translate="no">{timeLeft > 0 && "(" + timeLeft + ")"}</span>
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Đăng ký mới tài khoản!
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                Bạn đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Forget;
