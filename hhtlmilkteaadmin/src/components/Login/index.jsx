import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  FormHelperText,
} from "@material-ui/core";
import { AccountCircle, LockRounded } from "@material-ui/icons";
import logo from "./../../assets/img/Milktea.gif";
import { useForm } from "react-hook-form";
import { AuthLoginAction } from "../../store/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
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
    dispatch(AuthLoginAction(data));
  };

  useEffect(() => {
    if (auth.user) {
      if (401 === auth.user.error) {
        setMessage("Tài khoản hoặc mật khẩu không đúng");
        history.replace("/login");
        return;
      }
      if (auth.user.roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("user", JSON.stringify(auth.user));
        history.push("/dashboard");
      } else {
        setMessage("Tài khoản không có quyền");
        history.replace("/login");
      }
    }
  }, [auth, history]);

  return (
    <>
      <Grid container style={{ minHeight: "95vh" }}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          alignItems="center"
          direction="column"
          justifyContent="center"
          style={{ padding: 10 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 400,
              minWidth: 300,
            }}
          >
            <Grid container justifyContent="center">
              <img src={logo} alt="logo" loading="lazy" width="100" />
            </Grid>
            <FormHelperText
              style={{
                color: "red",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {message}
            </FormHelperText>
            <TextField
              label="Tài khoản"
              autoComplete="off"
              margin="normal"
              fullWidth
              name="username"
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
                Tài khoản chưa nhập
              </FormHelperText>
            )}
            <TextField
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              name="password"
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
                Mật khẩu chưa nhập
              </FormHelperText>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Đăng Nhập
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
