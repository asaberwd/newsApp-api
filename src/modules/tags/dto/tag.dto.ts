'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { TagEntity } from '../tag.entity';

export class TagDto extends AbstractDto {
    @ApiModelProperty()
    id: number;
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    slug: string;

    constructor(tag: TagEntity) {
        super(tag);
        this.id = tag.id;
        this.name = tag.name;
        this.slug = tag.slug;
    }
}
