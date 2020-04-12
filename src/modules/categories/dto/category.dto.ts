'use strict';

import { ApiModelPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CategoryEntity } from '../categoty.entity';

export class CategoryDto extends AbstractDto {
    // @ApiModelPropertyOptional()
    // id: number;

    @ApiModelPropertyOptional()
    name: string;

    @ApiModelPropertyOptional()
    slug: string;

    @ApiModelPropertyOptional()
    description: string;

    constructor(category: CategoryEntity) {
        super(category);
        // this.id = category.id;
        this.name = category.name;
        this.slug = category.slug;
        this.description = category.description;
    }
}
