import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {
    async createTag(createTag: CreateTagDto): Promise<TagEntity> {
        let newTag = this.create(createTag);

        newTag = await this.save(newTag);

        return newTag;
    }

    async getTags(): Promise<TagEntity[]> {
        return this.find();
    }

    async getTag(id: number): Promise<TagEntity> {
        const tag = await this.findOne(id);
        if (!tag) {
            throw new NotFoundException('there is no tag with this id');
        }
        return tag;
    }

    async deleteTag(id: number): Promise<void> {
        const tag = await this.getTag(id);
        await this.delete({ id: tag.id });
        // tag.delete()
    }
}
