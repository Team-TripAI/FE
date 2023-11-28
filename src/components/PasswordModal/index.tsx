import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from 'styled-components';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
}

const Container = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    width: 10em;
    height: auto;
    border-radius: 10px;
    border: 1px solid white;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    padding: 10px 20px 20px 20px;
    outline: none;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    & > div {
        width: 100%;
        height: 4em;
        display: flex;
        align-items: center;
        gap: 1em;
    }
    & > h3 {
        color: black;
        font-weight: 550;
        margin-left: 4px;
    }
`;
const OkButton = styled(Button)`
    height: 3em;
`;

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        onConfirm(password);
        setPassword(''); // 비밀번호 초기화
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Container>
                <h3>! 본인 확인을 위해 비밀번호를 입력해주세요.</h3>
                <div>
                    <TextField
                        type="password"
                        value={password}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        onChange={handlePasswordChange}
                    />
                    <OkButton variant="contained" color="success" onClick={handleSubmit}>
                        확인
                    </OkButton>
                </div>
            </Container>
        </Modal>
    );
};

export default PasswordModal;
