import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { TagDto } from './dto/tag.dto';

@Entity({ name: 'tags' })
export class TagEntity extends AbstractEntity<TagDto> {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    slug: string;

    dtoClass = TagDto;
}
