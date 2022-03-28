import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStateHandler from '../../Redux/useStateHandler';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignupDiv, InputStyle } from './signUpStyle';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const theme = createTheme();

const SignUp = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const { jwtToken, userInfo, signUpError, userSignUpHandler, authenticationHandler } = useStateHandler();

    const signUpHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const dataToAdd = { firstName, lastName, email, password, isAdmin };
        console.log(dataToAdd)
        userSignUpHandler(dataToAdd);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setIsAdmin(false);
    }

    useEffect(() => {
        if (jwtToken !== '') {
            localStorage.setItem("token", jwtToken!);
            localStorage.setItem("userInformation", JSON.stringify(userInfo))
            authenticationHandler();
            navigate('/dashboard');
        }
    }, [jwtToken])

    useEffect(() => {
        if (signUpError?.data !== '' && signUpError?.statusCode !== 0) {
            //alert(signUpError?.data)
            setError(signUpError?.data!)
        }
    }, [signUpError])
    useEffect(()=>{
        if(error !== ''){
            setOpen(true);
        }
    },[error])
    const handleClose = ()=>{
        setOpen(false)
        setError('');
    }
    return (
        <SignupDiv>
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
                        <Avatar sx={{ m: 1 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputStyle type="checkbox" onChange={(e)=>setIsAdmin(e.target.checked)}/> 
                                    Sign Up As Admin
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e)=>signUpHandler(e)}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            
            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </SignupDiv>
    )
}

export default SignUp