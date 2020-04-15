'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    readonly title: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    readonly content: string;

    @IsOptional()
    @IsUrl()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    readonly imageUrl: string;
}
