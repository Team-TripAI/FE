import { useEffect, useState } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PasswordModal from '../components/PasswordModal';
import axiosInstance from '../apis/axiosInstance';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    gap: 5rem;
`;
const Header = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10rem;
    margin: 10rem 19rem 0rem 22.5rem;
    & > button {
        border-radius: 0.5rem;
        background-color: #f2f2f2;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #e0e0e0;
            border: none;
        }
    }
`;

const ModifyName = styled.div`
    width: 50%;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
    & > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 20rem;
    }
`;
const NameField = styled.div`
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    & > div {
        font-size: 1rem;
        margin-top: 0.5rem;
    }
    & > p {
        margin-bottom: 3rem;
    }
`;
const NameModButton = styled(Button)`
    height: 3em;
`;
const Plans = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    border: 1px groove;
    border-radius: 1rem;
    padding: 3rem 2rem;
    & > header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rem;
        margin-bottom: 2rem;
    }
`;

enum Action {
    Modify,
    Withdraw,
}

const MyPage = () => {
    const [name, setName] = useState<string>(''); //띄워줄 이름
    const [tmpName, setTmpName] = useState<string>(''); //받을 이름
    const [nameState, setNameState] = useState<boolean>(false); //완료 버튼

    const [currentAction, setCurrentAction] = useState<Action | null>(null);

    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const handlePasswordConfirm = async (password: string) => {
        if (currentAction === Action.Modify) {
            // 수정 API 호출 로직
            try {
                const response = await axiosInstance.post('/users', {
                    nickname: tmpName,
                    pw: password,
                });
                console.log(response.data);
                //성공시
                setName(tmpName);
            } catch (error) {
                //실패시
                setTmpName(name);
            } finally {
                setNameState(false);
            }
        } else if (currentAction === Action.Withdraw) {
            console.log('탈퇴 API 호출', password);
            // 탈퇴 API 호출 로직
        }
    };

    // 수정
    const handleModifyComplete = () => {
        if (nameState) {
            // setNameState(false);
            setCurrentAction(Action.Modify);
            setPasswordModalOpen(true);
        } else {
            setNameState(true);
        }
        // setCurrentAction(Action.Modify);
        // setPasswordModalOpen(true);
    };

    // 탈퇴 버튼 클릭 시
    const handleWithdrawClick = () => {
        setCurrentAction(Action.Withdraw);
        setPasswordModalOpen(true);
    };

    // const modifyName = () => {
    //     setNameState(!nameState);

    //     if (modify) {
    //         console.log(name);
    //         //put api 호출

    //         setInitialName(name);
    //         setModify(false);
    //     } else {
    //         setModify(true);
    //     }
    // };

    // const modifyName = () => {
    //     setNameState(!nameState);
    //     setModify(true);
    // };

    useEffect(() => {
        (async () => {
            // const response = await axiosInstance.get('/users');
            // console.log(response.data);

            //초기화
            setTmpName('messi');
            setName('messi');
        })();
    }, []);

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    // };

    // //회원탈퇴
    // const withdraw = () => {
    //     //delete api 호출
    // };

    return (
        <Container>
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onConfirm={handlePasswordConfirm}
            />
            <Header>
                {/* 커뮤니티 페이지로 리다이렉션 유저 정보 props */}
                <button>내가 작성한 글 보러가기</button>

                <ModifyName>
                    <div>
                        {nameState ? (
                            <TextField
                                label={name}
                                variant="outlined"
                                fullWidth
                                value={tmpName}
                                onChange={(e) => setTmpName(e.target.value)}
                            />
                        ) : (
                            <NameField>
                                <p>{name}</p>
                                <div> 님</div>
                            </NameField>
                        )}
                    </div>

                    {nameState ? (
                        <NameModButton variant="contained" color="success" onClick={handleModifyComplete}>
                            완료
                        </NameModButton>
                    ) : (
                        <>
                            <Button variant="outlined" color="secondary" onClick={handleModifyComplete}>
                                수정
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleWithdrawClick}>
                                탈퇴
                            </Button>
                        </>
                    )}
                </ModifyName>
            </Header>

            {/* 각 plan을 map */}
            <Plans>
                <header>
                    <img src="" alt="장소 사진" />
                    <div>장소</div>
                    <div>시작날짜 ~ 종료날짜</div>
                    {/* 추천페이지랑 같은 형식으로 */}
                    <div>total and 숙소,교통,맛집,명소</div>
                </header>

                {/* <body> */}
                {/* 각 list map */}
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>숙소 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>숙소 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
                            est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>교통 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>교통 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam
                            eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>맛집 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>맛집 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>명소 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.dafdsdfdsfasfsadfs
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* </body> */}
            </Plans>
            <Plans>
                <header>
                    <img src="" alt="장소 사진" />
                    <div>장소</div>
                    <div>시작날짜 ~ 종료날짜</div>
                    {/* 추천페이지랑 같은 형식으로 */}
                    <div>total and 숙소,교통,맛집,명소</div>
                </header>

                {/* <body> */}
                {/* 각 list map */}
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>숙소 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>숙소 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus
                            est, id dignissim quam.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>교통 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>교통 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam
                            eros in elit. Pellentesque convallis laoreet laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>맛집 list</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>맛집 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>명소 list</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ width: '65vw' }}>
                        <Typography sx={{ width: '100%' }}>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                            vitae egestas augue. Duis vel est augue.dafdsdfdsfasfsadfs
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {/* </body> */}
            </Plans>
            <Pagination count={10} color="primary" />
        </Container>
    );
};

export default MyPage;
