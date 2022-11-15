import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Start = () => {
    return (
        <>
            <Typography variant="h1" gutterBottom={true}>
                Let's solve math
            </Typography>
            <Button variant="contained" color="success" href="/auth">
                <Typography variant="h4">
                    Start
                </Typography>
            </Button>
        </>
    );
};
