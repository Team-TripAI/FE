import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accessToken } from './../constants/accessToken';
import { isLoggedIn } from '../constants/isLoggedIn';
import axios from 'axios';

const Wrapper = styled.div`
    width: 100vw;
`;
const OauthBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;

const theme = createTheme();

const LoginPage = () => {
    const navigate = useNavigate();

    const [myAccessToken, setMyAccessToken] = useRecoilState(accessToken);
    const [myIsLoggedIn, setMyIsLoggedIn] = useRecoilState(isLoggedIn);

    // const clientId = 'clientID';
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        //login

        // 로그인 성공 시 세션스토리지에 토큰 저장
        // setMyAccessToken({
        //     accessToken: 'accessToken',
        // });

        // 로그인여부 세션스토리지에 저장
        // setMyIsLoggedIn({
        //     loginStatus: true,
        // });
    };

    return (
        <Wrapper>
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
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <div>로고 이미지</div>
                        <Typography component="h1" variant="h5">
                            로그인
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                            />
                            {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                로그인
                            </Button>
                        </Box>
                    </Box>
                    <OauthBox>
                        <GoogleOAuthProvider clientId={CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={(res) => {
                                    console.log(res);
                                }}
                                // onFailure={(err) => {
                                //     console.log(err);
                                // }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>
                    </OauthBox>
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Button onClick={() => navigate('/signup')}>회원가입</Button>
                    </Grid>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default LoginPage;
