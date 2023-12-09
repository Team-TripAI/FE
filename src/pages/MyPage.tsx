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
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    gap: 5rem;
    font-family: pretendard;
`;
const Header = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10rem;
    margin: 7rem 19rem 0rem 22.5rem;
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
    width: 90vw;
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
const PlansHeader = styled.header`
    width: 90vw;
    padding: 0 1rem;
`;
const BudgetWrapper = styled.div`
    display: flex;
    gap: 2rem;
`;
const BudgetDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 3px solid black;
    border-top: 3px solid black;
    border-radius: 0.1em;
    padding: 0.1em;
`;
const ImageContainer = styled.div`
    border-radius: 0.2rem;
    width: 150px; // 원하는 너비 설정
    height: 100px; // 원하는 높이 설정
    overflow: hidden; // 컨테이너 밖으로 넘치는 이미지 숨김
    margin: 0.8rem 0;
`;
const TitleImg = styled(ImageContainer)`
    width: 300px;
    height: 200px;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; // 컨테이너 크기에 맞게 이미지 조정
    object-position: center; // 이미지의 중심을 컨테이너 중앙에 위치
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
`;
const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
    width: 100%;
    border: 0.5px solid gray;
    border-radius: 0.5rem;
    padding: 1.5rem 2rem;
    margin: 1.5rem 0;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
`;
const DateBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 1rem;
`;
const FlightInfo = styled(Box)`
    border: none;
    color: gray;
    font-weight: 600;
    font-size: 0.9rem;
`;
const NoPlan = styled.div`
    font-size: 2rem;
    font-weight: 600;
    margin: 7rem 0 10rem 0;
`;

enum Action {
    Modify,
    Withdraw,
}

const MyPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>(); //띄워줄 이름
    const [tmpName, setTmpName] = useState<string>(); //받을 이름
    const [nameState, setNameState] = useState<boolean>(false); //완료 버튼

    const [currentAction, setCurrentAction] = useState<Action | null>(null);

    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [planList, setPlanList] = useState<any[]>([]); //유저 일정 리스트
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
    };

    //임시
    // const tmp = [
    //     {
    //         accommodation: 30,
    //         accommodationList: [
    //             {
    //                 endDate: '2023-12-31',
    //                 image: 'https://cf.bstatic.com/xdata/images/hotel/square60/497650805.jpg?k=8a38c4d87eff3bf19478446616bf2349af721648120d685b67097d958b62ae01&o=',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //                 startDate: '2023-12-25',
    //             },
    //             {
    //                 endDate: '2023-12-31',
    //                 image: 'https://cf.bstatic.com/xdata/images/hotel/square60/497650805.jpg?k=8a38c4d87eff3bf19478446616bf2349af721648120d685b67097d958b62ae01&o=',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //                 startDate: '2023-12-25',
    //             },
    //         ],
    //         attraction: 10,
    //         attractionList: [
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:00',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:00',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/1b/62/93/a0/caption.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/1b/62/93/a0/caption.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //         ],
    //         end: '2023-12-31',
    //         flight: 30,
    //         flightList: [
    //             {
    //                 airline: 'YP',
    //                 arrivalAirport: 'LAX',
    //                 departureAirport: 'ICN',
    //                 endTime: '2023-12-31T07:30',
    //                 name: 'YP101',
    //                 startTime: '2023-12-25T13:30',
    //                 url: 'https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=3a43bb45deca656b05417e46cead30e9&provider=SkyScanner|1|36&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=873900.06',
    //             },
    //             {
    //                 airline: 'YP',
    //                 arrivalAirport: 'LAX',
    //                 departureAirport: 'ICN',
    //                 endTime: '2023-12-31T07:30',
    //                 name: 'YP101',
    //                 startTime: '2023-12-25T13:30',
    //                 url: 'https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=3a43bb45deca656b05417e46cead30e9&provider=SkyScanner|1|36&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=873900.06',
    //             },
    //         ],
    //         name: '도쿄',
    //         planId: 1,
    //         restaurant: 30,
    //         restaurantList: [
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/18/cc/b9/54/japanese-and-taiwan-fusion.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/18/cc/b9/54/japanese-and-taiwan-fusion.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //         ],
    //         start: '2023-12-25',
    //         total: 100,
    //     },
    //     {
    //         accommodation: 30,
    //         accommodationList: [
    //             {
    //                 endDate: '2023-12-31',
    //                 image: 'https://cf.bstatic.com/xdata/images/hotel/square60/497650805.jpg?k=8a38c4d87eff3bf19478446616bf2349af721648120d685b67097d958b62ae01&o=',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //                 startDate: '2023-12-25',
    //             },
    //             {
    //                 endDate: '2023-12-31',
    //                 image: 'https://cf.bstatic.com/xdata/images/hotel/square60/497650805.jpg?k=8a38c4d87eff3bf19478446616bf2349af721648120d685b67097d958b62ae01&o=',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //                 startDate: '2023-12-25',
    //             },
    //         ],
    //         attraction: 10,
    //         attractionList: [
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/1b/62/93/a0/caption.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/1b/62/93/a0/caption.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //         ],
    //         end: '2023-12-31',
    //         flight: 30,
    //         flightList: [
    //             {
    //                 airline: 'YP',
    //                 arrivalAirport: 'LAX',
    //                 departureAirport: 'ICN',
    //                 endTime: '2023-12-31T07:30',
    //                 name: 'YP101',
    //                 startTime: '2023-12-25T13:30',
    //                 url: 'https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=3a43bb45deca656b05417e46cead30e9&provider=SkyScanner|1|36&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=873900.06',
    //             },
    //             {
    //                 airline: 'YP',
    //                 arrivalAirport: 'LAX',
    //                 departureAirport: 'ICN',
    //                 endTime: '2023-12-31T07:30',
    //                 name: 'YP101',
    //                 startTime: '2023-12-25T13:30',
    //                 url: 'https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=3a43bb45deca656b05417e46cead30e9&provider=SkyScanner|1|36&area=FLTCenterColumn|0|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=&totalPricePerPassenger=873900.06',
    //             },
    //         ],
    //         name: '도쿄222',
    //         planId: 2,
    //         restaurant: 30,
    //         restaurantList: [
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/18/cc/b9/54/japanese-and-taiwan-fusion.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //             {
    //                 hours: [
    //                     {
    //                         day: 'SUN',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'MON',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'TUE',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'WED',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'THU',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'FRI',
    //                         open: '16:30',
    //                         close: '23:45',
    //                     },
    //                     {
    //                         day: 'SAT',
    //                         open: '12:0',
    //                         close: '23:45',
    //                     },
    //                 ],
    //                 image: 'https://media-cdn.tripadvisor.com/media/photo-l/18/cc/b9/54/japanese-and-taiwan-fusion.jpg',
    //                 lat: 35.7176401814438,
    //                 lng: 139.785188392868,
    //                 name: '오사카',
    //             },
    //         ],
    //         start: '2023-12-25',
    //         total: 100,
    //     },
    // ];

    //유저 일정 가져오기
    useEffect(() => {
        // setPlanList(tmp);
        (async () => {
            const response = await axiosInstance.get('/plan/budget/users/plan', {
                params: {
                    pageNumber: pageNumber - 1,
                    pageSize: 3,
                },
            });

            console.log(response);
            setPlanList(response.data.planList);
            setTotalPages(response.data.totalPages);
        })();
    }, [pageNumber]);

    // 유저 닉네임 가져오기
    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get('/users');

            //초기화
            setTmpName(response.data.data.nickname);
            setName(response.data.data.nickname);
        })();
    }, []);

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
            try {
                const response = await axiosInstance.delete('/users', {
                    data: {
                        pw: password,
                    },
                });
                console.log(response);
                navigate('/login');
            } catch (error) {
                //실패시
                alert('잘못된 비밀번호입니다.');
            } finally {
            }
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
    // 수정 취소
    const handleModifyCancel = () => {
        setTmpName(name);
        setNameState(false);
    };

    // 탈퇴 버튼 클릭 시
    const handleWithdrawClick = () => {
        setCurrentAction(Action.Withdraw);
        setPasswordModalOpen(true);
    };

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container>
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                onConfirm={handlePasswordConfirm}
            />
            <Header>
                {/* 커뮤니티 페이지로 리다이렉션 유저 정보 props */}
                <button onClick={() => navigate('/myArticle')}>내가 작성한 글 보러가기</button>

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
                        <>
                            <NameModButton variant="outlined" color="success" onClick={handleModifyComplete}>
                                완료
                            </NameModButton>
                            <NameModButton variant="outlined" color="error" onClick={handleModifyCancel}>
                                취소
                            </NameModButton>
                        </>
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

            {planList.length === 0 && <NoPlan>저장한 일정이 없습니다.</NoPlan>}

            {/* 각 plan을 map */}
            {planList.map((plan, index) => (
                <div key={index}>
                    <Plans>
                        <PlansHeader>
                            <TitleImg>
                                <Image src={plan.attractionList[0].image} alt="장소 사진" />
                            </TitleImg>
                            <h2>{plan.name}</h2>
                            <p>
                                {plan.start} ~ {plan.end}
                            </p>
                            <BudgetWrapper>
                                <BudgetDetail>
                                    <div>Total</div>
                                    <div>{plan.total}</div>
                                </BudgetDetail>
                                <BudgetDetail>
                                    <div>숙소</div>
                                    <div>{plan.accommodation}</div>
                                </BudgetDetail>
                                <BudgetDetail>
                                    <div>명소</div>
                                    <div>{plan.attraction}</div>
                                </BudgetDetail>
                                <BudgetDetail>
                                    <div>교통</div>
                                    <div>{plan.flight}</div>
                                </BudgetDetail>
                                <BudgetDetail>
                                    <div>맛집</div>
                                    <div>{plan.restaurant}</div>
                                </BudgetDetail>
                            </BudgetWrapper>
                        </PlansHeader>

                        {/* 숙소 Map */}
                        <Accordion expanded={expanded === `panel${index}1`} onChange={handleChange(`panel${index}1`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>숙소</Typography>
                                {/* <Typography sx={{ color: 'text.secondary' }}>숙소 list</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails sx={{ width: '90%' }}>
                                <div>
                                    {plan.accommodationList.map((accommodation: any, index: number) => (
                                        <Box key={index}>
                                            <Wrapper>
                                                <ImageContainer>
                                                    <Image src={accommodation.image} alt="" />
                                                </ImageContainer>
                                                <div>{accommodation.name}</div>
                                            </Wrapper>
                                            <div>
                                                <h4>일정 : </h4>
                                                <h3>{accommodation.startDate}</h3>
                                                <h4>~</h4>
                                                <h3>{accommodation.endDate}</h3>
                                            </div>
                                        </Box>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        {/* 명소 Map */}
                        <Accordion expanded={expanded === `panel${index}2`} onChange={handleChange(`panel${index}2`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>명소</Typography>
                                {/* <Typography sx={{ color: 'text.secondary' }}>교통 list</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails sx={{ width: '90%' }}>
                                <div>
                                    {plan.attractionList.map((attraction: any, index: number) => (
                                        <Box key={index}>
                                            <Wrapper>
                                                <ImageContainer>
                                                    <Image src={attraction.image} alt="" />
                                                </ImageContainer>
                                                <div>{attraction.name}</div>
                                            </Wrapper>
                                            <div>
                                                {attraction.hours.map((hour: any, index: number) => (
                                                    <DateBox key={index}>
                                                        <h5>{hour.day}</h5>
                                                        <div>{hour.open}</div>
                                                        <div>~</div>
                                                        <div>{hour.close}</div>
                                                    </DateBox>
                                                ))}
                                            </div>
                                        </Box>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        {/* 교통 Map */}
                        <Accordion expanded={expanded === `panel${index}3`} onChange={handleChange(`panel${index}3`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>교통</Typography>
                                {/* <Typography sx={{ color: 'text.secondary' }}>맛집 list</Typography> */}
                            </AccordionSummary>
                            <AccordionDetails sx={{ width: '90%' }}>
                                <div>
                                    <FlightInfo>
                                        <div style={{ flex: '1' }}>이름</div>
                                        <div style={{ flex: '1' }}>항공사</div>
                                        <div style={{ flex: '1' }}>출발지</div>
                                        <div style={{ flex: '1' }}>도착지</div>
                                        <div style={{ flex: '1' }}>링크</div>
                                        <div style={{ flex: '1' }}>출발시간</div>
                                        <div style={{ flex: '1' }}>도착시간</div>
                                    </FlightInfo>
                                    {plan.flightList.map((flight: any, index: number) => (
                                        <Box key={index}>
                                            <div style={{ flex: '1' }}>{flight.name}</div>
                                            <div style={{ flex: '1' }}>{flight.airline}</div>
                                            <div style={{ flex: '1' }}>{flight.departureAirport}</div>
                                            <div style={{ flex: '1' }}>{flight.arrivalAirport}</div>
                                            <div style={{ flex: '1' }}>
                                                <a href={flight.url} target="_blank" rel="noopener noreferrer">
                                                    링크 바로가기
                                                </a>
                                            </div>
                                            <div style={{ flex: '1' }}>{flight.startTime}</div>
                                            <div style={{ flex: '1' }}>{flight.endTime}</div>
                                        </Box>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        {/* 맛집 Map */}
                        <Accordion expanded={expanded === `panel${index}4`} onChange={handleChange(`panel${index}4`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                            >
                                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 800 }}>맛집</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ width: '90%' }}>
                                <div>
                                    {plan.restaurantList.map((restaurant: any, index: number) => (
                                        <Box key={index}>
                                            <Wrapper>
                                                <ImageContainer>
                                                    <Image src={restaurant.image} alt="" />
                                                </ImageContainer>
                                                <div>{restaurant.name}</div>
                                            </Wrapper>
                                            <div>
                                                {restaurant.hours.map((hour: any, index: number) => (
                                                    <DateBox key={index}>
                                                        <h5>{hour.day}</h5>
                                                        <div>{hour.open}</div>
                                                        <div>~</div>
                                                        <div>{hour.close}</div>
                                                    </DateBox>
                                                ))}
                                            </div>
                                        </Box>
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </Plans>
                </div>
            ))}

            <Pagination color="primary" count={totalPages} page={pageNumber} onChange={handlePageChange} />
        </Container>
    );
};

export default MyPage;
