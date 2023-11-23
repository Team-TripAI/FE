import axios from 'axios';
import { useState } from 'react';

const getVision = async (image: string) => {
    // API 키
    const YOUR_API_KEY = import.meta.env.VITE_VISION_API_KEY;

    // RGB를 헥사 코드로 변환하는 함수
    const rgbToHex = (r: number, g: number, b: number): string => {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    try {
        const response = await axios.post(
            'https://vision.googleapis.com/v1/images:annotate',
            {
                requests: [
                    {
                        image: {
                            content: image, // Base64 인코딩된 이미지 데이터
                        },
                        features: [{ type: 'LABEL_DETECTION' }, { type: 'IMAGE_PROPERTIES' }],
                    },
                ],
            },
            {
                params: {
                    key: YOUR_API_KEY, // API 키
                },
            }
        );

        const colors = response.data.responses[0].imagePropertiesAnnotation.dominantColors.colors;
        const hexColorList = colors.map((color: any) => rgbToHex(color.color.red, color.color.green, color.color.blue));

        // 레이블 리스트 추출
        const labels = response.data.responses[0].labelAnnotations;
        const labelList = labels.map((label: any) => label.description);

        console.log('hexColorList:', hexColorList);
        console.log('labelList:', labelList);

        return { hexColorList, labelList };
    } catch (error) {
        console.error('Error fetching labels and colors', error);
        throw error;
    }
};

// 사용 예:
// getLabelsAndColorsFromImage(base64Image)
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

export default getVision;
