import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CategoriesModule } from '../modules/categories/categories.module';
import { PostsModule } from '../modules/posts/posts.module';
import { TasksService } from './scrapper/cron.service';
import { AwsS3Service } from './services/aws-s3.service';
import { ConfigService } from './services/config.service';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';
// import { CategoriesModule } from '../modules/categories/categories.module';

const providers = [
    ConfigService,
    ValidatorService,
    AwsS3Service,
    GeneratorService,
    TasksService,
];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
                // if you want to use token with expiration date
                // signOptions: {
                //     expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
                // },
            }),
            inject: [ConfigService],
        }),
        CategoriesModule,
        PostsModule,
    ],
    exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
