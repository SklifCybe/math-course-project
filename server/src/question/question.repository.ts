import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question } from '@prisma/client';

@Injectable()
export class QuestionRepository {
    private readonly logger = new Logger(QuestionRepository.name);
    constructor(private readonly prismaService: PrismaService) {}

    public async getAll(): Promise<Question[] | null> {
        try {
            const questions = await this.prismaService.question.findMany();
            
            return questions;
        } catch(error) {
            this.logger.error(error);

            return null;
        }
    }
}
