import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { questionExample } from '../../api/question-example';

export const Auth = () => {
    const [userName, setUserName] = useState('');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const submitName = async () => {
        if (!userName) return;

        setDisabled(true);
        await questionExample.setUserName(userName);
        setDisabled(false);

        navigate('/question');
    };

    return (
        <>
            <Typography variant="h1" gutterBottom={true}>
                Введите ваше имя
            </Typography>
            <TextField label="Имя" variant="outlined" color="success" sx={{ marginBottom: '40px' }} value={userName} onChange={handleChangeName} />
            <Button variant="contained" color="success" onClick={submitName} disabled={disabled}>
                <Typography variant="h4">Продолжить</Typography>
            </Button>
        </>
    );
};
