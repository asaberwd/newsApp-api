'use strict';

import { ApiModelProperty } from '@nestjs/swagger';

import { RoleType } from '../../../common/constants/role-type';
import { AbstractDto } from '../../../common/dto/AbstractDto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
    @ApiModelProperty()
    id: number;
    @ApiModelProperty()
    name: string;

    @ApiModelProperty({ enum: RoleType })
    role: RoleType;

    @ApiModelProperty()
    email: string;

    @ApiModelProperty()
    phone: string;

    constructor(user: UserEntity) {
        super(user);
        this.id = user.id;
        this.name = user.name;

        this.role = user.role;
        this.email = user.email;
    }
}
