import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { CategoriesService } from '../../modules/categories/categories.service';
import { PostsService } from '../../modules/posts/posts.service';
import { Scrapper } from './ajal';

@Injectable()
export class TasksService {
    private readonly _logger = new Logger(TasksService.name);
    constructor(
        private readonly _categoriesService: CategoriesService,
        private readonly _postsService: PostsService,
    ) {}

    @Cron('0 */25 * * * *')
    async handleCron() {
        this._logger.debug('Called when the current second is 59');
        const scrap = new Scrapper(
            'https://ajel.sa',
            this._categoriesService,
            this._postsService,
        );

        await scrap.beginScrapping();
    }
}
