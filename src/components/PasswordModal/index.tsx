import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        onConfirm(password);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div
                style={
                    {
                        /* 모달 스타일링 */
                    }
                }
            >
                <TextField type="password" value={password} onChange={handlePasswordChange} />
                <Button onClick={handleSubmit}>완료</Button>
            </div>
        </Modal>
    );
};

export default PasswordModal;
