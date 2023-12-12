import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImageUploader from '../components/ImageUploader/index.tsx';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { useRecoilValue } from 'recoil';
import { imageInfo } from '../constants/imageInfo.ts';
import axiosInstance from '../apis/axiosInstance.ts';
import { useState } from 'react';

const Wrapper = styled.div`
    width: 100vw;
`;
const Name = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    height: 3rem;
`;
const Address = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    height: 3rem;
`;
const Score = styled.div`
    font-size: 1rem;
    height: 1.5rem;
`;

interface recommendListType {
    address: string;
    image: string;
    lat: number;
    lng: number;
    name: string;
    score: number;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const ImagePage = () => {
    const myImageInfo = useRecoilValue(imageInfo);

    const [recommendList, setRecommendList] = useState<recommendListType[]>();

    const handleSearch = async () => {
        console.log('handleSearch');
        console.log(myImageInfo);
        try {
            const response = await axiosInstance.post('/image', {
                colorList: myImageInfo.colorList,
                labelList: myImageInfo.labelList,
            });

            const tmp = response.data.data.recommendList.map(
                (item: any): recommendListType => ({
                    address: item.address,
                    image: item.image,
                    lat: item.lat,
                    lng: item.lng,
                    name: item.name,
                    score: Math.floor(item.score),
                })
            );
            setRecommendList(tmp);
            console.log(recommendList);
        } catch (error: any) {
            //실패시
            console.log(error);
            if (error.response?.data?.code === 404) {
                alert('유사한 이미지가 없습니다.');
            } else if (error.response?.data?.code === 400) {
                alert('유효하지 않은 색상값입니다.');
            } else {
                alert('이미지 기반 추천에 실패했습니다.');
            }
        } finally {
        }
    };

    return (
        <Wrapper>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                {/* <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" color="inherit" noWrap>
                            이미지 기반 추천
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                <main>
                    {/* Hero unit */}
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            pt: 18,
                            pb: 6,
                        }}
                    >
                        <Container>
                            {/* <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                                이미지 기반 추천
                            </Typography> */}
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
                                <Grid
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}
                                >
                                    <Typography variant="h5" align="center" color="text.primary" gutterBottom>
                                        이미지를 업로드하여
                                    </Typography>
                                    <Typography variant="h5" align="center" color="text.primary" gutterBottom>
                                        여행지를 추천받아보세요!
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        endIcon={<SendIcon />}
                                        sx={{ marginTop: 5, width: '50%' }}
                                        onClick={handleSearch}
                                    >
                                        업로드한 이미지로 추천받기
                                    </Button>
                                </Grid>
                            </Stack>
                        </Container>
                    </Box>
                    <Container sx={{ py: 8 }}>
                        {/* End hero unit */}
                        <Grid container spacing={10}>
                            {recommendList?.map((item, idx) => (
                                <Grid item key={idx} xs={12} sm={6} md={3}>
                                    <Card
                                        sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="div"
                                            sx={{
                                                // 16:9
                                                pt: '56.25%',
                                            }}
                                            image={item.image}
                                        />
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Name>{item.name}</Name>
                                            <Address>{item.address}</Address>
                                            <Score>Score : {item.score}</Score>
                                            {/* <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="h2"
                                                sx={{
                                                    fontSize: '1.2rem',
                                                }}
                                            >
                                                {item.name}
                                            </Typography>
                                            <Typography>{item.address}</Typography>
                                            <Typography>Score : {item.score}</Typography> */}
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
                {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                    <Typography variant="h6" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
                        Something here to give the footer a purpose!
                    </Typography>
                </Box> */}
                {/* End footer */}
            </ThemeProvider>
        </Wrapper>
    );
};

export default ImagePage;
