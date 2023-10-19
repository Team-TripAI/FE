import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import uploadimg from '../../imgs/uploadimg.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const Box = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const UploadBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;
const Img = styled.img`
    border-radius: 5px;
`;

const ImageUploader = () => {
    const [imageFile, setImageFile]: any = useState(null);
    const [imageSrc, setImageSrc]: any = useState(null);
    const inputRef: any = useRef([]);
    const [location, setLocation] = useState<string>(''); //주소

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();

        // 확장자 제한
        if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
            alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
            return;
        }

        // 파일 리더
        const reader = new FileReader();
        reader.readAsDataURL(file);

        // 파일 업로드
        return new Promise<void>((resolve) => {
            reader.onload = () => {
                // 이미지 경로 선언
                setImageSrc(reader.result || null);
                // 이미지 파일 선언
                setImageFile(file);
                resolve();
            };
        });
    };

    const uploadS3 = async () => {
        const REGION = import.meta.env.VITE_REGION;
        const ACESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
        const SECRET_ACESS_KEY_ID = import.meta.env.VITE_SECRET_ACCESS_KEY_ID;

        AWS.config.update({
            region: REGION,
            accessKeyId: ACESS_KEY_ID,
            secretAccessKey: SECRET_ACESS_KEY_ID,
        });

        const upload = new AWS.S3.ManagedUpload({
            params: {
                ACL: 'public-read',
                Bucket: 'tripai-test-bucket',
                Key: `upload/${new Date().getTime().toString() + imageFile.name}`, //ms단위로 파일명 생성
                Body: imageFile,
            },
        });

        try {
            const data = await upload.promise();
            console.log(data);
            setLocation(data.Location);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Box>
                {imageSrc ? (
                    <Img src={imageSrc} alt="image preview" width={'100%'} />
                ) : (
                    <Img src={uploadimg} alt="none" />
                )}
                {/* <a href={location}>{location}</a> */}
            </Box>
            <UploadBox>
                <input
                    // hidden
                    accept="image/*"
                    multiple
                    type="file"
                    ref={(el) => (inputRef.current[0] = el)}
                    onChange={(e) => onUpload(e)}
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!imageSrc) {
                            alert('이미지를 등록해 주세요.');
                            return;
                        }
                        const formData = new FormData();
                        formData.append('file', imageFile);
                        formData.append('name', imageFile.name);
                        uploadS3();
                    }}
                >
                    UPLOAD
                </button>
            </UploadBox>

            {/* <img src={location} alt="이미지" /> */}
        </Container>
    );
};

export default ImageUploader;
