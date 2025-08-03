import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, Typography } from "@mui/material";
import config from "../config.json";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export function LoginPage() {
  let formValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    error: "",
  };

  const [formData, setFormData] = useState(formValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const { setUserId } = useContext(AuthContext);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogin) {
      if (formData.password !== formData.confirm_password) {
        setFormData((prev) => ({ ...prev, error: "Password mismatch" }));
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, error: "" }));
        }, 3000);
        return;
      }

      try {
        const response = await axios.post(
          config.local_url + "auth/register",
          formData
        );
        console.log(response.data);
        setIsLogin(true);
        navigate("/login");
      } catch (error) {
        console.log(error);
        setFormData((prev) => ({
          ...prev,
          error: error.response?.data?.message || "Signup failed",
        }));
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, error: "" }));
        }, 3000);
      }
    } else {
      try {
        const response = await axios.post(
          config.local_url + "auth/login",
          formData
        );
        setUserId(response.data.user._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user._id);
        navigate("/home");
      } catch (error) {
        setFormData((prev) => ({
          ...prev,
          error: error.response?.data?.message || "Login failed",
        }));
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, error: "" }));
        }, 3000);
      }
    }
  };

  const handlechange = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      error: "",
    });
    setIsLogin(!isLogin);
  };

  return (
    <Box
      sx={{
        width: "400px",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
      }}
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {isLogin ? "Login to" : "Create"} Your Account
      </Typography>
      <TextField
        className="login-fields"
        fullWidth
        required={!isLogin}
        size="small"
        name="name"
        label="User Name"
        variant="outlined"
        sx={{ display: isLogin ? "none" : "block" }}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        className="login-fields"
        fullWidth
        required
        size="small"
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        onChange={(e) => handleInputChange(e)}
      />
      <FormControl
        className="login-fields"
        fullWidth
        required
        size="small"
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          fullWidth
          name="password"
          onChange={(e) => handleInputChange(e)}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <TextField
        className="login-fields"
        fullWidth
        required={!isLogin}
        size="small"
        name="confirm_password"
        label="Cofirm Password"
        variant="outlined"
        onChange={(e) => handleInputChange(e)}
        sx={{ display: isLogin ? "none" : "block" }}
      />

      {formData.error && (
        <Typography sx={{ color: "red", mt: 1 }}>{formData.error}</Typography>
      )}

      <Button
        fullWidth
        type="submit"
        variant="contained"
        onSubmit={handleSubmit}
      >
        {isLogin ? "Login" : "Signup"}
      </Button>

      <Typography
        sx={{ color: "#49739c", cursor: "pointer" }}
        onClick={() => handlechange()}
      >
        {isLogin
          ? `Didn't have account? SignUp`
          : "Already have an account? Log in"}
      </Typography>
    </Box>
  );
}

export default LoginPage;
