import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Patch,
    Post,
    Put,
} from '@nestjs/common';
import { ReplyAnswerDto } from './dto/reply.dto';
import { QuestionService } from './question.service';
import { SetUserNameDto } from './dto/set-user-name.dto';

@Controller('question')
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get('name')
    getName() {
        const name = this.questionService.getName();

        if (!name) throw new NotFoundException('Not found userName');

        return name;
    }

    @Put()
    resetTable() {
        return this.questionService.resetTable();
    }

    @Post('name')
    setName(@Body() userNameDto: SetUserNameDto) {
        return this.questionService.setName(userNameDto);
    }

    @Patch()
    getNextExample(@Body() replyAnswerDto?: ReplyAnswerDto) {
        if (Object.keys(replyAnswerDto).length !== 0) {
            this.questionService.replyAnswer(replyAnswerDto);
        }

        return this.questionService.getNextExample();
    }
}
