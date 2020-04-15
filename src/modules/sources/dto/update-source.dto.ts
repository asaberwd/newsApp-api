'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSourceDto {
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

    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    @ApiModelPropertyOptional()
    readonly url: string;
}
