import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(TagRepository) private _tagRepository: TagRepository,
    ) {}

    createTag(createTag: CreateTagDto): Promise<TagEntity> {
        return this._tagRepository.createTag(createTag);
    }

    getTags(): Promise<TagEntity[]> {
        return this._tagRepository.getTags();
    }

    getTag(id: string): Promise<TagEntity> {
        return this._tagRepository.getTag(id);
    }

    deleteTag(id: string): Promise<void> {
        return this._tagRepository.deleteTag(id);
    }
}
