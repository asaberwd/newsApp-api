import { NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
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

    async getTagsById(idList: number[]): Promise<TagEntity[]> {
        return this.findByIds(idList);
    }

    async updateTag(
        id: number,
        updateTagDto: UpdateTagDto,
    ): Promise<TagEntity> {
        const tag = await this.getTag(id);
        return this.save({ ...tag, ...updateTagDto });
    }

    findTagsByName(tagsNames: string[]): Promise<TagEntity[]> {
        return this.find({ name: In(tagsNames) });
    }

    async insertManyTags(tagsNames: string[]): Promise<TagEntity[]> {
        const tags = tagsNames.map(
            (tagName: string): CreateTagDto => ({
                name: tagName,
                slug: tagName,
            }),
        );

        const { raw } = await this.insert(tags);

        // map to tag entity form
        return tags.map(
            (tag, index): TagEntity => {
                const t = new TagEntity();
                t.id = raw[index].id;
                t.name = tag.name;
                t.slug = tag.slug;
                t.createdAt = raw[index].created_at;
                t.updatedAt = raw[index].updated_at;
                t.dtoClass = TagDto;
                return t;
            },
        );

        // return newTags;
    }
}
