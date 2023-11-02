import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    & > div {
        display: flex;
        align-items: center;
        gap: 10rem;
        margin: 10rem;
    }
`;
const ModifyName = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    width: 50%;
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
    }
    & > p {
        margin-bottom: 3.5rem;
    }
`;
const Plans = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rem;
    }
    & > body {
        display: flex;
        flex-direction: column;
    }
`;

const MyPage = () => {
    const [name, setName] = useState<string>(''); //변경 이름
    const [modify, setModify] = useState<boolean>(false);
    const [initialName, setInitialName] = useState<string>(''); //api에서 받아오기
    const [nameState, setNameState] = useState<boolean>(false); //완료 버튼

    const modifyName = () => {
        setNameState(!nameState);

        if (modify) {
            console.log(name);
            //post api 호출

            setInitialName(name);
            setModify(false);
        } else {
            setModify(true);
        }
    };

    useEffect(() => {
        //get api 호출
        setInitialName('messi');
        setName('messi');
    }, []);

    return (
        <Container>
            <div>
                <ModifyName>
                    <div>
                        {modify ? (
                            <TextField
                                label={initialName}
                                variant="filled"
                                helperText="닉네임을 변경하세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        ) : (
                            <NameField>
                                <p>{name}</p>
                                <div> 님</div>
                            </NameField>
                        )}
                    </div>

                    {nameState ? (
                        <Button variant="contained" color="success" onClick={modifyName}>
                            완료
                        </Button>
                    ) : (
                        <Button color="secondary" onClick={modifyName}>
                            수정
                        </Button>
                    )}
                </ModifyName>

                {/* 페이지 이동 */}
                <button>내가 작성한 글 보러가기</button>
            </div>
            <Plans>
                <header>
                    <img src="" alt="장소 사진" />
                    <div>장소</div>
                    <div>시작날짜 ~ 종료날짜</div>
                    {/* 추천페이지랑 같은 형식으로 */}
                    <div>total and 숙소,교통,맛집,명소</div>
                </header>
                <body>
                    {/* 각 list map */}
                    <div>숙소 list</div>
                    <div>교통 list</div>
                    <div>맛집 list</div>
                    <div>명소 list</div>
                </body>
                <Pagination count={10} color="primary" />
            </Plans>
        </Container>
    );
};

export default MyPage;
