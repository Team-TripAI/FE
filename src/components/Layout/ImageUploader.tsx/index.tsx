import React, { useState, useRef } from 'react';
import AWS from 'aws-sdk';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
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
                Key: `upload/${imageFile.name}`,
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
            <div>
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
                    upload
                </button>
            </div>
            <div>
                <img src={imageSrc} alt="image preview" width={'50%'} />
                <a href={location}>{location}</a>
            </div>
            {/* <img src={location} alt="이미지" /> */}
        </Container>
    );
};

export default ImageUploader;
