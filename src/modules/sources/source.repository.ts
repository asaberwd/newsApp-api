import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';

import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './source.entity';

@EntityRepository(SourceEntity)
export class SourceRepository extends Repository<SourceEntity> {
    async createSource(createSource: CreateSourceDto): Promise<SourceEntity> {
        let source = this.create(createSource);
        source = await this.save(source);
        return source;
    }
    async getSources(): Promise<SourceEntity[]> {
        return this.find();
    }
    async getSource(id: number): Promise<SourceEntity> {
        const source = await this.findOne(id);
        if (!source) {
            throw new NotFoundException('there is no source with this id');
        }
        return source;
    }
    async deleteSource(id: number): Promise<void> {
        const source = await this.getSource(id);
        await this.delete({ id: source.id });
    }

    async updateSource(
        id: number,
        updateSourceDto: UpdateSourceDto,
    ): Promise<SourceEntity> {
        const source = await this.getSource(id);
        return this.save({ ...source, ...updateSourceDto });
    }
}
