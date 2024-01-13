import { Question } from '@prisma/client';

export type Example = {
    userName: string;
    example: Question[];
    time: string;
};
