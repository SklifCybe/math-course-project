export type NextPayload = {
    id: number;
    solutionId: number;
    time: string;
};

export type QuestionExampleType = {
    id: number;
    text: string;
    solutionId: number;
    correctAnswer: boolean;
    variants: number[];
};

export type Example = {
    userName: string;
    example: QuestionExampleType[];
    time: string;
};

export type FinishNextResponse = Example[];

export type GetNextResponse = QuestionExampleType & FinishNextResponse;