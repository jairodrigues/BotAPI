import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MessageDTO {
    @ApiModelProperty()
    @IsString()
    public conversationId: string;

    @ApiModelProperty()
    @IsString()
    public from: string;

    @ApiModelProperty()
    @IsString()
    public to: string;

    @ApiModelProperty()
    @IsString()
    public text: string;

    @IsString()
    public id: string;

    public timestamp: Date;
}
