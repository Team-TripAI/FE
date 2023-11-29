import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface imageInfoType {
    imageurl: string;
    colorList: string[];
    labelList: string[];
}

//세션스토리지에 저장
const { persistAtom } = recoilPersist({
    key: 'sessionStorage', //key 값
    storage: sessionStorage,
});

export const imageInfo = atom<imageInfoType>({
    key: 'imageInfo',
    default: {
        imageurl: '',
        colorList: [],
        labelList: [],
    },
    effects_UNSTABLE: [persistAtom],
});
