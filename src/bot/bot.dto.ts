import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BotDTO {
    @ApiModelProperty()
    @IsString()
    public name: string;
    @IsString()
    public id: string;
}
