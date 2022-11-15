import React from 'react';
import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';

import { Start } from './pages/start';
import { Auth } from './pages/auth';
import { MathExample } from './pages/math-example';

export const Routes = () => {
    return (
        <BrowserRouter>
            <ReactRoutes>
                <Route index element={<Start />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/math" element={<MathExample />} />
            </ReactRoutes>
        </BrowserRouter>
    );
};
