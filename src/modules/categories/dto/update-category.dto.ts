'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
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

    @IsString()
    @IsOptional()
    @ApiModelPropertyOptional()
    readonly description: string;
}
