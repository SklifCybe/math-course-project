import { Module } from '@nestjs/common';
import { MathModule } from './math/math.module';

@Module({
    imports: [MathModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
