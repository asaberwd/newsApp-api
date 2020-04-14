'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { CategoryDto } from '../../categories/dto/category.dto';
import { SourceDto } from '../../sources/dto/source.dto';
import { TagDto } from '../../tags/dto/tag.dto';
import { PostEntity } from '../post.entity';

export class PostDto extends AbstractDto {
    @ApiModelProperty()
    id: string;

    @ApiModelProperty()
    title: string;

    @ApiModelProperty()
    content: string;

    @ApiModelProperty()
    imageUrl: string;

    @ApiModelProperty()
    sourceId: number;

    @ApiModelProperty()
    source?: SourceDto;

    @ApiModelProperty()
    categoryId: number;
    @ApiModelProperty()
    category?: CategoryDto;

    @ApiModelProperty()
    tags?: TagDto[];

    constructor(post: PostEntity) {
        super(post);
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.imageUrl = post.imageUrl;
        this.sourceId = post.sourceId;
        this.categoryId = post.categoryId;
        if (post.category) {
            this.category = post.category.toDto();
        }
        // post.category ? (this.category = post.category.toDto()) : null;
        if (post.source) {
            this.source = post.source.toDto();
        }
        // post.source ? (this.source = post.source.toDto()) : null;
        if (post.tags) {
            this.tags = post.tags.toDtos();
        }
        // post.tags ? (this.tags = post.tags.toDtos()) : null;
    }
}
