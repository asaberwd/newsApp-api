'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly slug: string;
}
