import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageUploader from '../components/ImageUploader.tsx/index.tsx';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100vw;
`;

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ImagePage = () => {
    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            이미지 기반 추천
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    {/* Hero unit */}
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 8,
                            pb: 6,
                        }}
                    >
                        <Container>
                            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                이미지 기반 추천
                            </Typography>
                            {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                Something short and leading about the collection below—its contents, the creator, etc.
                                Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                                entirely.
                            </Typography> */}
                            <Stack
                                sx={{ pt: 4, paddingBottom: 5, marginTop: 10, marginLeft: 10 }}
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                alignItems="center"
                                gap={5}
                            >
                                <ImageUploader />
                                {/* <Button variant="contained">Main call to action</Button>
                                <Button variant="outlined">Secondary action</Button> */}
                                <Grid sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Typography variant="h5" align="center" color="text.primary" gutterBottom>
                                        이미지를 업로드하여
                                    </Typography>
                                    <Typography variant="h5" align="center" color="text.primary" gutterBottom>
                                        여행지를 추천받아보세요!
                                    </Typography>
                                </Grid>
                            </Stack>
                        </Container>
                    </Box>
                    <Container sx={{ py: 8 }}>
                        {/* End hero unit */}
                        <Grid container spacing={10}>
                            {cards.map((card) => (
                                <Grid item key={card} xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                            }}
                                            image="https://source.unsplash.com/random?wallpapers"
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                지역명
                                            </Typography>
                                            <Typography>주소 ~~~ - ~~~ - ~~~</Typography>
                                        </CardContent>
                                        {/* <CardActions>
                                            <Button size="small">View</Button>
                                            <Button size="small">Edit</Button>
                                        </CardActions> */}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                {/* Footer */}
                <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </Box>
                {/* End footer */}
            </ThemeProvider>
        </Wrapper>
    );
};

export default ImagePage;
