import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';

import { RoleType } from '../../common/constants/role-type';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
// import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
// import { IFile } from '../../interfaces/IFile';
import { ValidatorService } from '../../shared/services/validator.service';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { UsersPageDto } from './dto/UsersPageDto';
import { UsersPageOptionsDto } from './dto/UsersPageOptionsDto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        public readonly userRepository: UserRepository,
        public readonly validatorService: ValidatorService,
        public readonly awsS3Service: AwsS3Service,
    ) {}

    /**
     * Find single user
     */
    findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOne(findData);
    }
    async findByUsernameOrEmail(
        options: Partial<{ name: string; email: string }>,
    ): Promise<UserEntity | undefined> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');

        if (options.email) {
            queryBuilder.orWhere('user.email = :email', {
                email: options.email,
            });
        }
        if (options.name) {
            queryBuilder.orWhere('user.username = :username', {
                username: options.name,
            });
        }

        return queryBuilder.getOne();
    }

    async createUser({
        name,
        email,
        password,
        role,
    }: UserRegisterDto): // file: IFile,
    Promise<UserEntity> {
        // let avatar: string;
        // if (file && !this.validatorService.isImage(file.mimetype)) {
        //     throw new FileNotImageException();
        // }

        // if (file) {
        //     avatar = await this.awsS3Service.uploadImage(file);
        // }

        const user = this.userRepository.create({
            name,
            email,
            password,
            role: RoleType[role],
        });

        return this.userRepository.save(user);
    }

    async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const [users, usersCount] = await queryBuilder
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)
            .getManyAndCount();

        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: usersCount,
        });
        return new UsersPageDto(users.toDtos(), pageMetaDto);
    }
}
