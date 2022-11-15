import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { mathExample } from '../../api/math-example';

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
        await mathExample.setUserName(userName);
        setDisabled(false);

        navigate('/math');
    };

    return (
        <>
            <Typography variant="h1" gutterBottom={true}>
                Enter your name
            </Typography>
            <TextField
                label="User Name"
                variant="outlined"
                color="success"
                sx={{ marginBottom: '40px' }}
                value={userName}
                onChange={handleChangeName}
            />
            <Button variant="contained" color="success" onClick={submitName} disabled={disabled}>
                <Typography variant="h4">Next</Typography>
            </Button>
        </>
    );
};
