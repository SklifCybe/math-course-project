import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { questionExample } from '../../api/question-example';
import { ResultTable } from '../../components/result-table';

import type { NextPayload, Example, QuestionExampleType } from '../../types/get-next';

import styles from './index.module.css';

export const Question = () => {
    const [example, setExample] = useState<QuestionExampleType>();
    const [isEnd, setIsEnd] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const expiryTimestamp = new Date(Date.now() + 59 * 1000);

    const onExpire = () => {
        navigate('/');
    };

    const { seconds, pause } = useTimer({ expiryTimestamp, autoStart: true, onExpire });

    const fetchNextExample = (index: number) => async (event?: MouseEvent<HTMLButtonElement>) => {
        setDisabled(true);
        let data;

        if (!event) {
            data = await questionExample.getNextExample();
        } else {
            const payload: NextPayload = {
                id: example!.id,
                solutionId: index,
                time: seconds.toString(),
            };

            data = await questionExample.getNextExample(payload);
        }

        setExample(data);
        setDisabled(false);

        if (!data) return;

        if (Array.isArray(data)) {
            setIsEnd(true);
        }
    };

    useEffect(() => {
        fetchNextExample(0)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isEnd && example) {
        return <ResultTable rows={example as unknown as Example[]} timerPause={pause} />;
    }

    return (
        <>
            <Typography variant="h3" gutterBottom={true}>
                {seconds}
            </Typography>
            <Typography variant="h3" gutterBottom={true} textAlign="center">
                {example?.text}
            </Typography>
            <div className={styles.variants}>
                {example?.variants?.map((variant, index) => (
                    <Button key={index} variant="contained" color="success" onClick={fetchNextExample(index)} disabled={disabled}>
                        <Typography variant="h5">{variant}</Typography>
                    </Button>
                ))}
            </div>
        </>
    );
};
