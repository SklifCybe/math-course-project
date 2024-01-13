import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { QuestionService } from '../question.service';
import { QuestionController } from '../question.controller';
import { SetUserNameDto } from '../dto/user-auth.dto';
import { ReplyAnswerDto } from '../dto/reply.dto';

const mockQuestionService = {
    getName: jest.fn(),
    resetTable: jest.fn(),
    setName: jest.fn(),
    getNextExample: jest.fn(),
    replyAnswer: jest.fn(),
};

describe('QuestionController', () => {
    let questionController: QuestionController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [QuestionController],
            providers: [
                { provide: QuestionService, useValue: mockQuestionService },
            ],
        }).compile();

        questionController =
            moduleRef.get<QuestionController>(QuestionController);
    });

    describe('getName', () => {
        it('should return user name', () => {
            jest.spyOn(mockQuestionService, 'getName').mockReturnValue(
                'John Doe',
            );

            const result = questionController.getName();

            expect(result).toBe('John Doe');
        });

        it('should throw NotFoundException if user name is not found', async () => {
            mockQuestionService.getName.mockImplementation(() => null);

            try {
                questionController.getName();
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('resetTable', () => {
        it('should reset the table', () => {
            jest.spyOn(mockQuestionService, 'resetTable').mockReturnValue(
                'Table reset successfully',
            );

            const result = questionController.resetTable();

            expect(result).toBe('Table reset successfully');
        });
    });

    describe('setName', () => {
        it('should set user name', async () => {
            const setUserNameDto: SetUserNameDto = { userName: 'John Doe' };
            jest.spyOn(mockQuestionService, 'setName').mockReturnValue(
                'User name set successfully',
            );

            const result = await questionController.setName(setUserNameDto);

            expect(result).toBe('User name set successfully');
        });
    });

    describe('getNextExample with replyAnswerDto', () => {
        it('should reply to the answer and get the next example', () => {
            const replyAnswerDto: ReplyAnswerDto = {
                id: 'some-id',
                solutionId: 0,
                time: '5s',
            };
            jest.spyOn(mockQuestionService, 'replyAnswer').mockReturnValue(
                undefined,
            );
            jest.spyOn(mockQuestionService, 'getNextExample').mockReturnValue(
                'Next example data',
            );

            const result = questionController.getNextExample(replyAnswerDto);

            expect(result).toBe('Next example data');
        });
    });
});
