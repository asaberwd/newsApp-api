'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly slug: string;

    @IsString()
    @IsOptional()
    @ApiModelProperty()
    readonly description: string;
}
