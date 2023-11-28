import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface accessTokenType {
    accessToken: string;
}

//세션스토리지에 저장
const { persistAtom } = recoilPersist({
    key: 'sessionStorage', //key 값
    storage: sessionStorage,
});

export const accessToken = atom<accessTokenType>({
    key: 'accessToken',
    default: {
        accessToken: '',
    },
    effects_UNSTABLE: [persistAtom],
});
