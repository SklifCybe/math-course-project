import React from 'react';
import ReactDOM from 'react-dom/client';

import { Routes } from './routes';

import styles from './index.module.css';
import './styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <main className={styles.wrapper}>
        <Routes />
    </main>
);
