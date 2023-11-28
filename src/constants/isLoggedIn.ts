import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface isLoggedInType {
    loginStatus: boolean;
}

//세션스토리지에 저장
const { persistAtom } = recoilPersist({
    key: 'sessionStorage', //key 값
    storage: sessionStorage,
});

//임시 값들
export const isLoggedIn = atom<isLoggedInType>({
    key: 'isLoggedIn',
    default: {
        loginStatus: false,
    },
    effects_UNSTABLE: [persistAtom],
});
