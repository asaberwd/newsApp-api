'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { SourceEntity } from '../source.entity';

export class SourceDto extends AbstractDto {
    // @ApiModelPropertyOptional()
    // id: number;

    @ApiModelPropertyOptional()
    name: string;

    @ApiModelPropertyOptional()
    slug: string;

    @ApiModelPropertyOptional()
    url: string;

    constructor(source: SourceEntity) {
        super(source);
        // this.id = category.id;
        this.name = source.name;
        this.slug = source.slug;
        this.url = source.url;
    }
}
