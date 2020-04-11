'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { TagEntity } from '../tag.entity';

export class TagDto extends AbstractDto {
    @ApiModelPropertyOptional()
    name: string;

    @ApiModelPropertyOptional()
    slug: string;

    constructor(tag: TagEntity) {
        super(tag);
        this.name = tag.name;
        this.slug = tag.slug;
    }
}
