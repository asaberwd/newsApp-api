import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { Scrapper } from './ajal';

@Injectable()
export class TasksService {
    private readonly _logger = new Logger(TasksService.name);

    @Cron('45 * * * * *')
    handleCron() {
        this._logger.debug('Called when the current second is 45');
        const scrap = new Scrapper();
        scrap.loadPostAndSave('https://ajel.sa/C2b4xS');
    }
}
