import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { SourceEntity } from './source.entity';
import { SourceRepository } from './source.repository';

@Injectable()
export class SourcesService {
    constructor(
        @InjectRepository(SourceRepository)
        private _sourceRepository: SourceRepository,
    ) {}

    createSource(createSource: CreateSourceDto): Promise<SourceEntity> {
        return this._sourceRepository.createSource(createSource);
    }

    getSources(): Promise<SourceEntity[]> {
        return this._sourceRepository.getSources();
    }

    getSource(id: number): Promise<SourceEntity> {
        return this._sourceRepository.getSource(id);
    }

    deleteSource(id: number): Promise<void> {
        return this._sourceRepository.deleteSource(id);
    }

    updateSource(
        id: number,
        updateSourceDto: UpdateSourceDto,
    ): Promise<SourceEntity> {
        return this._sourceRepository.updateSource(id, updateSourceDto);
    }
}
