import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthLoginAction } from "./../../../src/store/actions/AuthAction";
import { FormHelperText, InputAdornment } from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    AuthLoginAction(data)(dispatch).then((res) => {
      if (Object.is(401, res?.error)) {
        setMessage("Tài khoản hoặc mật khẩu không đúng");
        return;
      }
      if (res?.roles.includes("ROLE_ADMIN")) {
        setMessage("Tài khoản hoặc mật khẩu không đúng");
        return;
      }
      if (res?.roles.includes("ROLE_USER")) {
        localStorage.setItem("user", JSON.stringify(auth.user));
        localStorage.removeItem("groupMember");
        localStorage.removeItem("member");
        history.push("/home");
      }
    });
  };

  useEffect(() => {
    if (auth.user) {
      if (Object.is(401, auth.user.error)) {
        history.replace("/signin");
        return;
      }
      if (auth.user.roles.includes("ROLE_ADMIN")) {
        history.replace("/signin");
        return;
      }
      if (auth.user.roles.includes("ROLE_USER")) {
        localStorage.setItem("user", JSON.stringify(auth.user));
        history.push("/home");
      }
    }
  }, [auth, history]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          {message && (
            <FormHelperText
              style={{
                color: "red",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {message}
            </FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            label="Tài khoản"
            autoComplete="off"
            inputRef={register({ required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          {errors.username && (
            <FormHelperText style={{ color: "red" }}>
              Tài khoản chưa được nhập
            </FormHelperText>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <FormHelperText style={{ color: "red" }}>
              Mật khẩu chưa được nhập
            </FormHelperText>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forget" style={{ textDecoration: "none" }}>
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Bạn chưa có tài khoản? Tạo tài khoản
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
