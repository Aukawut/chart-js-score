import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';;
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        F_Dev.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();
export default function Login() {
  const navigate = useNavigate()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://lazy-blue-reindeer.cyclic.app/login",{
      username:username,
      password:password
    }).then((res) => {
      if(!res.data.err){
        Swal.fire({
          icon:'success',
          title:'Login successfully!',
          timer:1500
        }).then(() => {
          navigate('/report')
        })
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('token_user',res.data.token_user)
      }else{
        Swal.fire({
          icon:'error',
          title:'Username or password invalid!',
          timer:1500
        })
      }
      console.log(res.data);
    })
    
  };
  const resetForm = () => {
    setUsername("")
    setPassword("")
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              onClick={resetForm}
            >
              RESET FORM
            </Button>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}