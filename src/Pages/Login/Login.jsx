import styles from "./Login.module.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../svgs/logo.svg";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <AppBar
        className={styles.navbar}
        elevation={0}
        color="white"
        position="static"
      >
        <Toolbar>
          <img className={styles.logo} src={logo} />
        </Toolbar>
      </AppBar>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <Typography variant="h4">
            {isAdmin ? "Admin" : "Candidate"} Login
          </Typography>
          <Typography variant="caption" gutterBottom>
            Welcome to Assessment Tool. Login to access your assessments. click
          here for {isAdmin ? (
              <Link
                href="javascript:void(0)"
                onClick={() => setIsAdmin(!isAdmin)}
              >
                Candidate Login
              </Link>
            ) : (
              <Link
                href="javascript:void(0)"
                onClick={() => setIsAdmin(!isAdmin)}
              >
                Admin Login
              </Link>
            )}
          </Typography>
          <TextField
            className={styles.loginInput}
            label="Username"
            variant="outlined"
          />
          <TextField
            className={styles.loginInput}
            label="Password"
            variant="outlined"
          />
          <Button
            onClick={() => navigation("/assessments")}
            className={styles.loginInput}
            variant="contained"
          >
            Login
          </Button>
          <div className={styles.forgotLink}>
            <Link href="javascript:void(0)">Forgot Password?</Link>
            {isAdmin && (
              <>
                {" "}
                | <Link href="javascript:void(0)">Signup?</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
