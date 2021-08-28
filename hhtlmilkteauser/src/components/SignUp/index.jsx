import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AuthRegisterAction } from "./../../store/actions/AuthAction";
import { FormHelperText, InputAdornment } from "@material-ui/core";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import EmailIcon from "@material-ui/icons/Email";
import { GroupOrderFindAllAction } from "../../store/actions/GroupOrderAction";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm();
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const password = useRef({});
  password.current = watch("password", "");

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

  const onSubmit = (data) => {
    AuthRegisterAction(data)(dispatch).then((res) => {
      if (!Object.is("Đăng ký thành công", res.message)) {
        setMessage(res.message);
        return;
      }
      if (Object.is("Đăng ký thành công", res.message)) {
        history.push("/signin");
        return;
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
          Đăng ký
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
                label="Tài khoản"
                name="username"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Tài khoản không được để trống",
                  },
                  minLength: {
                    value: 5,
                    message: "Tài khoản không được nhỏ hơn 5 kí tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Tài khoản không được quá 20 kí tự",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Tài khoản chp phép chữ cái và số",
                  },
                })}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.username?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.username?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Địa chỉ email"
                name="email"
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Mật khẩu không được để trống",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu không được nhỏ hơn 6 kí tự",
                  },
                  pattern: {
                    value: /^[^\s]+$/,
                    message: "Mật khẩu không được có khoảng trắng",
                  },
                })}
                label="Mật khẩu"
                type="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.password?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="rePassword"
                inputRef={register({
                  validate: (value) =>
                    Object.is(value, password.current) ||
                    "Mật khẩu nhập lại chưa đúng",
                })}
                label="Nhập lại mật khẩu"
                type="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded />
                    </InputAdornment>
                  ),
                }}
              />
              {errors.rePassword?.message && (
                <FormHelperText style={{ color: "red" }}>
                  {errors.rePassword?.message}
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
          >
            Đăng ký
          </Button>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link to="/forget" style={{ textDecoration: "none" }}>
                Quên mật khẩu?
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

export default SignUp;
