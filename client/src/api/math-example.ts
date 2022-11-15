import axios from 'axios';

import { Api } from './api';

import type { GetNextResponse, NextPayload } from '../types/get-next';

class MathExample extends Api {
    private readonly mathEndpoint = 'math';
    private readonly nameEndpoint = 'name';

    async setUserName(userName: string) {
        try {
            await axios.post(`${this.baseURI}/${this.mathEndpoint}/${this.nameEndpoint}`, {
                userName,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    async getNextExample(payload?: NextPayload) {
        try {
            const result = await axios.patch<GetNextResponse>(
                `${this.baseURI}/${this.mathEndpoint}`,
                payload ? payload : null
            );

            return result.data;
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    async resetTable() {
        try {
            await axios.put(`${this.baseURI}/${this.mathEndpoint}`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }
}

export const mathExample = new MathExample();
