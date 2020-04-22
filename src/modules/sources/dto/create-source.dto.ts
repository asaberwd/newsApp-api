'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateSourceDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly slug: string;

    @IsNotEmpty()
    @IsUrl()
    @ApiModelProperty()
    readonly url: string;
}
