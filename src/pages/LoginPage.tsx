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
import { isLoggedIn } from '../constants/isLoggedIn';
import axios from 'axios';
import axiosInstance from '../apis/axiosInstance';
import { useEffect } from 'react';

const Wrapper = styled.div`
    width: 100vw;
`;
const OauthBox = styled.div`
    width: 100%;
    margin-top: 2em;
    margin-bottom: 4em;
    padding-top: 3em;
    display: flex;
    justify-content: center;
    border-top: 2px solid #eaeaea;
`;

const theme = createTheme();

const LoginPage = () => {
    const navigate = useNavigate();

    const [myIsLoggedIn, setMyIsLoggedIn] = useRecoilState(isLoggedIn);

    // const clientId = 'clientID';
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

    //로그인 페이지 들어왔을 때 로그아웃 로직
    useEffect(() => {
        //로컬스토리지에 토큰 지우기
        localStorage.removeItem('accessToken');

        setMyIsLoggedIn({
            loginStatus: false,
        });
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const response = await axiosInstance.post('/login', {
            email: data.get('email'),
            pw: data.get('password'),
        });

        const accessToken = response.headers['authorization'];

        // console.log(accessToken);

        // 로그인 성공 시 로컬스토리지에 토큰 저장
        localStorage.setItem('accessToken', accessToken);

        // 로그인여부 세션스토리지에 저장
        setMyIsLoggedIn({
            loginStatus: true,
        });

        navigate('/main');
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
                                width="450px"
                                type="standard" // 버튼 유형: 'standard' 또는 'icon'
                                theme="outline" // 버튼 테마: 'outline', 'filled_blue', 또는 'filled_black'
                                size="large" // 버튼 크기: 'large', 'medium', 또는 'small'
                                text="continue_with" // 버튼 텍스트: 'signin_with', 'signup_with', 'continue_with', 또는 'signin'
                                shape="pill" // 버튼 모양: 'rectangular', 'pill', 'circle', 또는 'square'
                                logo_alignment="center" // Google 로고 정렬: 'left' 또는 'center'
                                //
                                onSuccess={(res) => {
                                    console.log(res);
                                    const token = res.credential;
                                    console.log(token);
                                    const response = axiosInstance.post('/login/google', {
                                        token: token,
                                    });
                                    console.log(response);
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
                        <Button onClick={() => navigate('/signup')}>회원가입하러 가기</Button>
                    </Grid>
                </Container>
            </ThemeProvider>
        </Wrapper>
    );
};

export default LoginPage;
