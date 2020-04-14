'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CategoryEntity } from '../categoty.entity';

export class CategoryDto extends AbstractDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    slug: string;

    @ApiModelProperty()
    description: string;

    constructor(category: CategoryEntity) {
        super(category);
        this.id = category.id;
        this.name = category.name;
        this.slug = category.slug;
        this.description = category.description;
    }
}
