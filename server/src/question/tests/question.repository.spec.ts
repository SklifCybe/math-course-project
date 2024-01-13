import { Test } from '@nestjs/testing';
import { QuestionRepository } from '../question.repository';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrismaService = {
    question: {
        findMany: jest.fn(),
    },
};

describe('QuestionRepository', () => {
    let questionRepository: QuestionRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [],
            providers: [
                { provide: PrismaService, useValue: mockPrismaService },
                QuestionRepository,
            ],
        }).compile();

        questionRepository =
            moduleRef.get<QuestionRepository>(QuestionRepository);
    });

    it('should return all questions', async () => {
        const questions = [
          { id: 1, text: 'Question 1' },
          { id: 2, text: 'Question 2' },
        ];
        mockPrismaService.question.findMany.mockResolvedValue(questions);
    
        const result = await questionRepository.getAll();
    
        expect(result).toEqual(questions);
        expect(mockPrismaService.question.findMany).toHaveBeenCalled();
      });
    
      it('should return null and log an error if an error occurs', async () => {
        const errorMessage = 'An error occurred';
        mockPrismaService.question.findMany.mockRejectedValue(new Error(errorMessage));
    
        const result = await questionRepository.getAll();
    
        expect(result).toBeNull();
        expect(mockPrismaService.question.findMany).toHaveBeenCalled();
      });
});
