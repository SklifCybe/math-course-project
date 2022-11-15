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
import { MathService } from './math.service';
import { SetUserNameDto } from './dto/set-user-name.dto';

@Controller('math')
export class MathController {
    constructor(private readonly mathService: MathService) {}

    @Get('name')
    getName() {
        const name = this.mathService.getName();

        if (!name) throw new NotFoundException('Not found userName');

        return name;
    }

    @Put()
    resetTable() {
        return this.mathService.resetTable();
    }

    @Post('name')
    setName(@Body() userNameDto: SetUserNameDto) {
        return this.mathService.setName(userNameDto);
    }

    @Patch()
    getNextExample(@Body() replyAnswerDto?: ReplyAnswerDto) {
        if (Object.keys(replyAnswerDto).length !== 0) {
            this.mathService.replyAnswer(replyAnswerDto);
        }

        return this.mathService.getNextExample();
    }
}
