import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { ReplyAnswerDto } from './dto/reply.dto';
import { SetUserNameDto } from './dto/set-user-name.dto';
import { MathExample } from './entities/math-example.entity';
import { Example } from './entities/example.entity';
import * as mathExamplesDb from '../full-db.json';

@Injectable()
export class MathService {
    private mathExamples: MathExample[] = mathExamplesDb;
    private currentExample = 0;
    private name: { userName: string };
    private examples: Example[] = [];
    private countRandomExamples = 10;

    getName() {
        return this.name?.userName;
    }

    getRandomExamples() {
        const resultExamples: Set<MathExample> = new Set();

        for (let i = 0; resultExamples.size < this.countRandomExamples; i++) {
            const min = 0;
            const max = this.mathExamples.length;

            const index = Math.floor(Math.random() * (max - min) + min);

            resultExamples.add(cloneDeep(this.mathExamples[index]));
        }

        return Array.from(resultExamples);
    }

    setName(userNameDto: SetUserNameDto) {
        this.name = userNameDto;

        this.examples.push({
            userName: this.name.userName,
            example: this.getRandomExamples(),
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

    replyAnswer({ id, solution, time }: ReplyAnswerDto) {
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
                return example.find((mathExample) => mathExample.id === id);
            }
        });

        if (!existExample) return undefined;

        this.examples[userNameId].example = this.examples[
            userNameId
        ].example.map((mathExample: MathExample) => {
            if (mathExample.id === id && mathExample.solution === solution) {
                mathExample.correctAnswer = true;
            }
            return mathExample;
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
