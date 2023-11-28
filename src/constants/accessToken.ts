import { atom } from 'recoil';

export interface accessTokenType {
    accessToken: string;
}

//임시 값들
export const accessToken = atom<accessTokenType>({
    key: 'accessToken',
    default: {
        accessToken: '',
    },
});
