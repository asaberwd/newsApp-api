'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    readonly name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    readonly slug: string;
}
