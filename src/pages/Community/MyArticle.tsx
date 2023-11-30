import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';
import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';

interface ArticleInterface {
    articleId: string;
    title: string;
    locationName: string;
    formattedAddress: string;
    image: string;
}

const Wrapper = styled.div`
    width: 100vw;
`;

const PostButton = styled(Button)({
    boxShadow: 'none',
    backgroundColor: 'white',
    '$:focused': {
        boxShadow: 'none',
        backgroundColor: 'white',
    },
    '$:hover': {
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
    },
});

const myArticle = () => {
    const navigate = useNavigate();
    const [articleList, setArticleList] = useState<ArticleInterface>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await axiosInstance.get(`/users/articles`, {
                    params: {
                        pageNumber: pageNumber - 1,
                        pageSize: 8,
                    },
                });
                setArticleList(response.data.data.articleList);
                setTotalPages(response.data.data.totalPages);
            } catch (err) {
                console.log(err);
            }
        };

        getArticles();
    }, [pageNumber]);

    return (
        <Wrapper>
            <Container sx={{ height: '100vh', mt: 13 }}>
                <Box>
                    <Typography gutterBottom variant="h4" component="h2" textAlign="center" fontFamily="">
                        내가 작성한 게시글
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
                    {/* <PostButton onClick={() => navigate('/community/post')}>경험 공유하기</PostButton> */}
                </Box>
                <Grid container spacing={10}>
                    {articleList.map((article: ArticleInterface) => (
                        <Grid item key={article.articleId} xs={12} sm={6} md={3}>
                            <Card
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                onClick={() => navigate(`/community/${article.articleId}`)}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image={article.image}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom fontSize="15px">
                                        {article.title}
                                    </Typography>
                                    <Typography fontFamily="mono-space">{article.locationName}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination count={totalPages} page={pageNumber} onChange={handleChange} />
            </div>
        </Wrapper>
    );
};

export default myArticle;
