export type NextPayload = {
    id: number;
    solution: number;
    time: string;
};

export type MathExampleType = {
    id: number;
    text: string;
    solution: number;
    correctAnswer: boolean;
    variants: number[];
};

export type Example = {
    userName: string;
    example: MathExampleType[];
    time: string;
};

export type FinishNextResponse = Example[];

export type GetNextResponse = MathExampleType & FinishNextResponse;