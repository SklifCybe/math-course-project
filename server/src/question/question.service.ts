import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ReplyAnswerDto } from './dto/reply.dto';
import { SetUserNameDto } from './dto/user-auth.dto';
import { Example } from './entities/example.entity';
import { QuestionRepository } from './question.repository';
import { Question } from '@prisma/client';

@Injectable()
export class QuestionService {
    private currentExample = 0;
    private name: { userName: string };
    private examples: Example[] = [];
    private countRandomExamples = 10;

    constructor(private readonly questionRepository: QuestionRepository) {}

    getName() {
        return this.name?.userName;
    }

    public async getRandomExamples(): Promise<Question[]> {
        const questions = await this.questionRepository.getAll();
        const resultExamples: Set<Question> = new Set();

        for (let i = 0; resultExamples.size < this.countRandomExamples; i++) {
            const min = 0;
            const max = questions.length;

            const index = Math.floor(Math.random() * (max - min) + min);

            resultExamples.add(cloneDeep(questions[index]));
        }

        return Array.from(resultExamples);
    }

    public async setName(
        userNameDto: SetUserNameDto,
    ): Promise<{ userName: string }> {
        this.name = userNameDto;
        const randomExamples = await this.getRandomExamples();

        this.examples.push({
            userName: this.name.userName,
            example: randomExamples,
            time: '',
        });

        return this.name;
    }

    getNextExample() {
        const userNameId = this.getUserNameId();

        const nextExample = this.examples[userNameId].example.find(
            (_, index) => index === this.currentExample,
        );

        this.currentExample++;

        if (!nextExample) {
            this.currentExample = 0;

            return this.examples;
        }

        return nextExample;
    }

    replyAnswer({ id, solutionId, time }: ReplyAnswerDto) {
        const userNameId = this.getUserNameId();

        this.examples = this.examples.map((example) => {
            if (this.name.userName === example.userName) {
                example.time = time;
                return example;
            }
            return example;
        });

        const existExample = this.examples.find(({ userName, example }) => {
            if (this.name.userName === userName) {
                return example.find((question) => question.id === id);
            }
        });

        if (!existExample) return undefined;

        this.examples[userNameId].example = this.examples[
            userNameId
        ].example.map((questionExample: Question) => {
            if (
                questionExample.id === id &&
                questionExample.solutionId === solutionId
            ) {
                questionExample.correctAnswer = true;
            }
            return questionExample;
        });

        return existExample;
    }

    getUserNameId() {
        return this.examples.findIndex(
            ({ userName }) => userName === this.name.userName,
        );
    }

    resetTable() {
        return (this.examples = []);
    }
}
