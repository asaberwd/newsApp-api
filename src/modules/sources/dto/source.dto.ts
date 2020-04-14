'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { SourceEntity } from '../source.entity';

export class SourceDto extends AbstractDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    slug: string;

    @ApiModelProperty()
    url: string;

    constructor(source: SourceEntity) {
        super(source);
        this.id = source.id;
        this.name = source.name;
        this.slug = source.slug;
        this.url = source.url;
    }
}
