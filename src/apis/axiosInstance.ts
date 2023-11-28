import { accessToken } from './../constants/accessToken';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useRecoilState } from 'recoil';

const axiosInstance = axios.create({
    baseURL: '52.78.82.97:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // CORS 요청에 쿠키/인증 헤더 포함
    // 기타 설정
});

const [myAccessToken, setMyAccessToken] = useRecoilState(accessToken);

axiosInstance.interceptors.request.use((config: any) => {
    // 인증이 필요 없는 요청을 식별 (예: 로그인, 회원가입, 토큰 재발급)
    const noAuthRequired = ['/login', '/signup', '/reissue'].some((path) => config.url?.includes(path));

    if (!noAuthRequired) {
        const accessToken = myAccessToken.accessToken;
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
    }

    return config;
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest: any = error.config;
        if (error.response?.status === 489 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response: AxiosResponse<{ accessToken: string }> = await axios.get('/reissue');
                const newAccessToken = response.data.accessToken;
                setMyAccessToken({ accessToken: newAccessToken });
                console.log('토큰 재발급 성공 : ', myAccessToken.accessToken);
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // 새로운 토큰을 받아오는 데 실패
                // 로그아웃 처리 등의 조치를 취함
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// 사용예시
// const response = await axiosInstance.post('/login');

export default axiosInstance;
