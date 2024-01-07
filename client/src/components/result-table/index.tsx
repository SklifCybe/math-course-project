import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { ResetModal } from '../reset-modal';
import { questionExample } from '../../api/question-example';

import type { Example } from '../../types/get-next';

import styles from './index.module.css';

type Props = {
    rows: Example[];
    timerPause: () => void;
};

const defaultStylesCell = {
    fontSize: '32px',
};

export const ResultTable: FC<Props> = ({ rows, timerPause }) => {
    const [openResetModal, setOpenResetModal] = useState(false);
    const navigate = useNavigate();
    timerPause();

    const onExit = () => navigate('/auth');

    const onReset = async () => {
        navigate('/');
        await questionExample.resetTable();
    };

    const toggleResetModal = (status: boolean) => () => setOpenResetModal(status);

    return (
        <>
            <Typography variant="h1" gutterBottom={true}>
                Таблица результатов
            </Typography>
            <TableContainer sx={{ height: '400px' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={defaultStylesCell}>
                                Имя
                            </TableCell>
                            <TableCell align="center" sx={defaultStylesCell}>
                                Вопрос <br></br>
                                <br></br>
                                (красный - неправильный, зелёный - правильный)
                            </TableCell>
                            <TableCell align="center" sx={defaultStylesCell}>
                                Итоговое время
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" sx={defaultStylesCell}>
                                    {row.userName}
                                </TableCell>
                                <TableCell align="center" sx={defaultStylesCell}>
                                    {row.example.map(({ id, text, solutionId, correctAnswer }) => {
                                        const className = correctAnswer ? styles.correctAnswer : styles.inCorrectAnswer;

                                        return (
                                            <div key={id} className={className}>
                                                {text}
                                            </div>
                                        );
                                    })}
                                </TableCell>
                                <TableCell align="center" sx={defaultStylesCell}>
                                    {row.time}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={styles.buttons}>
                <Button variant="contained" color="success" onClick={onExit}>
                    <Typography variant="h4">Попробовать ещё раз</Typography>
                </Button>
                <Button variant="contained" color="error" onClick={toggleResetModal(true)}>
                    <Typography variant="h4">Сбросить таблицу</Typography>
                </Button>
            </div>
            <ResetModal open={openResetModal} onClose={toggleResetModal(false)} onReset={onReset} />
        </>
    );
};
