'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly slug: string;
}
