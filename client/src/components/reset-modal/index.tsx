import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styles from './index.module.css';

type Props = {
    open: boolean;
    onClose: () => void;
    onReset: () => void;
};

const boxStyles = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgb(255, 255, 117)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ResetModal: FC<Props> = ({ open, onClose, onReset }) => (
    <Modal open={open} onClose={onClose}>
        <Box sx={boxStyles}>
            <Typography variant="h4" component="h2" align="center">
                Сбросить результаты таблицы
            </Typography>
            <Typography sx={{ mt: 2 }} align="center">
                Вы уверены, что хотите сбросить результаты таблицы?
            </Typography>
            <div className={styles.buttons}>
                <Button variant="contained" color="warning" onClick={onReset}>
                    Сбросить
                </Button>
                <Button variant="contained" color="info" onClick={onClose}>
                    Отменить
                </Button>
            </div>
        </Box>
    </Modal>
);
