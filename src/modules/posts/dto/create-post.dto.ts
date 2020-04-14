'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUrl,
    Min,
} from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly content: string;

    @IsUrl()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly imageUrl: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiModelProperty()
    readonly sourceId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiModelProperty()
    readonly categoryId: number;

    @IsArray()
    @ArrayMinSize(1)
    @ApiModelProperty()
    readonly tags: string[];
}
