import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { Start } from './pages/start';
import { Auth } from './pages/auth';
import { Question } from './pages/question';

export const Routes = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route index element={<Start />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/question" element={<Question />} />
            </ReactRoutes>
        </BrowserRouter>
    );
};
