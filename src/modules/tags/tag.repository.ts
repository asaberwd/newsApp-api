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

    async getTag(id: string): Promise<TagEntity> {
        try {
            return await this.findOne(id);
        } catch (error) {
            if (error.code === '22P02') {
                throw new NotFoundException('this id is not valid');
            }
        }
    }

    async deleteTag(id: string): Promise<void> {
        const tag = await this.getTag(id);
        await this.delete(tag);
    }
}
