import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { TagDto } from './dto/tag.dto';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractEntity<TagDto> {
    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, unique: true })
    slug: string;

    dtoClass = TagDto;
}
