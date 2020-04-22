'use strict';

import { ApiModelProperty } from '@nestjs/swagger';
import { RoleType } from 'aws-sdk/clients/cognitoidentity';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiModelProperty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    @ApiModelProperty({ minLength: 6 })
    readonly password: string;

    @IsString()
    @ApiModelProperty()
    readonly role: RoleType;
}
