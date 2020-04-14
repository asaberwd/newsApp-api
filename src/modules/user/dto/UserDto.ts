'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
    @ApiModelProperty()
    id: number;
    @ApiModelProperty()
    firstName: string;

    @ApiModelProperty()
    lastName: string;

    @ApiModelProperty()
    username: string;

    @ApiModelProperty({ enum: RoleType })
    role: RoleType;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    avatar: string;

    @ApiModelProperty()
    phone: string;

    constructor(user: UserEntity) {
        super(user);
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.role = user.role;
        this.email = user.email;
        this.avatar = user.avatar;
        this.phone = user.phone;
    }
}
