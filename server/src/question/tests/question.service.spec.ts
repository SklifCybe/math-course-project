import { Test } from '@nestjs/testing';
import { QuestionRepository } from '../question.repository';
import { QuestionService } from '../question.service';
import { ReplyAnswerDto } from '../dto/reply.dto';
import { SetUserNameDto } from '../dto/user-auth.dto';

const mockQuestionRepository = {
    getAll: jest.fn(),
};

describe('QuestionService', () => {
    let questionService: QuestionService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [],
            providers: [
                QuestionService,
                {
                    provide: QuestionRepository,
                    useValue: mockQuestionRepository,
                },
            ],
        }).compile();

        questionService = moduleRef.get<QuestionService>(QuestionService);
    });

    describe('getName', () => {
        it('should return user name', () => {
            questionService['name'] = { userName: 'John Doe' };

            const result = questionService.getName();

            expect(result).toBe('John Doe');
        });
    });

    describe('getRandomExamples', () => {
        it('should call questionRepository getAll', async () => {
            const questions = [
                { id: 1, text: 'Question 1' },
                { id: 2, text: 'Question 2' },
            ];
            mockQuestionRepository.getAll.mockResolvedValue(questions);

            await questionService.getRandomExamples();

            expect(mockQuestionRepository.getAll).toHaveBeenCalled();
        });
    });

    describe('setName', () => {
        it('should set user name and get random examples', async () => {
            const setUserNameDto: SetUserNameDto = { userName: 'John Doe' };
            const randomExamples = new Array(10).fill({
                id: 1,
                text: 'Question 1',
            });
            mockQuestionRepository.getAll.mockResolvedValue(randomExamples);

            const result = await questionService.setName(setUserNameDto);

            expect(result).toEqual(setUserNameDto);
            expect(questionService['examples']).toEqual([
                {
                    userName: 'John Doe',
                    example: randomExamples,
                    time: '',
                },
            ]);
            expect(mockQuestionRepository.getAll).toHaveBeenCalled();
        });
    });

    describe('getNextExample', () => {
        it('should get the next example', () => {
            questionService['name'] = { userName: 'John Doe' };
            questionService['examples'] = [
                {
                    userName: 'John Doe',
                    example: [
                        {
                            id: 'some-id-1',
                            text: 'Question 1',
                            correctAnswer: false,
                            solutionId: 0,
                            variants: ['hello', 'world'],
                        },
                        {
                            id: 'some-id-2',
                            text: 'Question 2',
                            correctAnswer: false,
                            solutionId: 1,
                            variants: ['first', 'second'],
                        },
                    ],
                    time: '',
                },
            ];

            const result = questionService.getNextExample();

            expect(result).toEqual({
                id: 'some-id-1',
                text: 'Question 1',
                correctAnswer: false,
                solutionId: 0,
                variants: ['hello', 'world'],
            });
            expect(questionService['currentExample']).toBe(1);
        });

        it('should reset the current example and return the full examples array if no next example is found', () => {
            questionService['name'] = { userName: 'John Doe' };
            questionService['examples'] = [
                {
                    userName: 'John Doe',
                    example: [
                        {
                            id: 'some-id-1',
                            text: 'Question 1',
                            correctAnswer: false,
                            solutionId: 0,
                            variants: ['hello', 'world'],
                        },
                        {
                            id: 'some-id-2',
                            text: 'Question 2',
                            correctAnswer: false,
                            solutionId: 1,
                            variants: ['first', 'second'],
                        },
                    ],
                    time: '',
                },
            ];
            questionService['currentExample'] = 1;

            const result = questionService.getNextExample();

            expect(result).toEqual({
                id: 'some-id-2',
                text: 'Question 2',
                correctAnswer: false,
                solutionId: 1,
                variants: ['first', 'second'],
            });
            expect(questionService['currentExample']).toBe(2);
        });
    });

    describe('replyAnswer', () => {
        it('should reply to the answer and return the updated example', () => {
            questionService['name'] = { userName: 'John Doe' };
            questionService['examples'] = [
                {
                    userName: 'John Doe',
                    example: [
                        {
                            id: 'some-id-1',
                            text: 'Question 1',
                            solutionId: 1,
                            correctAnswer: false,
                            variants: ['hello', 'world'],
                        },
                        {
                            id: 'some-id-2',
                            text: 'Question 2',
                            solutionId: 2,
                            correctAnswer: false,
                            variants: ['first', 'second'],
                        },
                    ],
                    time: '',
                },
            ];
            const replyAnswerDto: ReplyAnswerDto = {
                id: 'some-id-1',
                solutionId: 1,
                time: '10s',
            };

            const result = questionService.replyAnswer(replyAnswerDto);

            expect(result).toEqual({
                userName: 'John Doe',
                example: [
                    {
                        id: 'some-id-1',
                        text: 'Question 1',
                        solutionId: 1,
                        correctAnswer: true,
                        variants: ['hello', 'world'],
                    },
                    {
                        id: 'some-id-2',
                        text: 'Question 2',
                        solutionId: 2,
                        correctAnswer: false,
                        variants: ['first', 'second'],
                    },
                ],
                time: '10s',
            });
        });

        it('should return undefined if the user example is not found', () => {
            questionService['name'] = { userName: 'John Doe' };
            questionService['examples'] = [
                {
                    userName: 'Jane Doe',
                    example: [
                        {
                            id: 'some-id-1',
                            text: 'Question 1',
                            correctAnswer: false,
                            solutionId: 0,
                            variants: ['hello', 'world'],
                        },
                        {
                            id: 'some-id-2',
                            text: 'Question 2',
                            correctAnswer: false,
                            solutionId: 1,
                            variants: ['first', 'second'],
                        },
                    ],
                    time: '',
                },
            ];
            const replyAnswerDto: ReplyAnswerDto = {
                id: 'some-id-1',
                solutionId: 1,
                time: '15s',
            };

            const result = questionService.replyAnswer(replyAnswerDto);

            expect(result).toBeUndefined();
        });
    });

    describe('getUserNameId', () => {
        it('should return the index of the current user in the examples array', () => {
            questionService['examples'] = [
                { userName: 'John Doe', example: [], time: '' },
                { userName: 'Jane Doe', example: [], time: '' },
            ];
            questionService['name'] = { userName: 'Jane Doe' };

            const result = questionService.getUserNameId();

            expect(result).toBe(1);
        });
    });

    describe('resetTable', () => {
        it('should reset the examples array', () => {
            questionService['examples'] = [
                { userName: 'John Doe', example: [], time: '' },
                { userName: 'Jane Doe', example: [], time: '' },
            ];

            questionService.resetTable();

            expect(questionService['examples']).toEqual([]);
        });
    });
});
