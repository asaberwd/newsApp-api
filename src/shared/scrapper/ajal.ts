/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import * as cheerio from 'cheerio';
import fs from 'fs';
import request from 'got';
import { resolve } from 'url';

function trem(str: string): string {
    return str
        .replace(/"/g, "'")
        .replace(/\n|\r|\t|#/g, '')
        .trim();
}

export class Scrapper {
    private _mainUrl: string;

    constructor() {
        this._mainUrl = 'https://ajel.sa';
    }
    public loadPage(url: string) {
        (async () => {
            try {
                const response = await request(url);
                const $ = cheerio.load(response.body);
                const linkList: string[] = [];
                const anc = $(
                    '.tabbable-line .tab-content .tab-pane .news-item .news-details h2 a',
                );
                anc.each((i, e) => {
                    linkList.push(resolve(this._mainUrl, e.attribs.href));
                });

                for (const l of linkList) {
                    try {
                        await this.loadPostAndSave(url);
                    } catch (e) {
                        console.warn(e);
                        this.appendToFile(
                            './logging/error-lower.txt',
                            l + '\n',
                        );
                    }
                }
            } catch (error) {
                console.warn('error:', error);
            }
        })();
    }

    public loadPostAndSave(url: string) {
        (async () => {
            try {
                const response = await request(url);
                console.warn('statusCode:', response.statusCode);
                const $ = cheerio.load(response.body);

                const title = $('.news-titles h1').text();
                const img = $('.main-img img').attr('src');
                let postBody = '';
                const paragraphs = $('#dev-content p');
                paragraphs.each((i, e) => {
                    if (i > 0 && i < paragraphs.length - 1) {
                        postBody += e.children[0].data;
                    }
                });
                const tagsList: string[] = [];
                const tags = $('.tags-news .tag-check a');
                tags.each((i, e) => {
                    tagsList.push(trem(e.children[0].data));
                });

                const postDate = trem($('.team-photo span.h5').text());
                console.warn(postDate.slice(postDate.search('/') + 1));

                // TODO :
                // start saving new post
                console.warn('ti: ', {
                    title,
                    img,
                    postBody,
                    tagsList,
                    postDate,
                });
            } catch (error) {
                console.warn('error:', error);
            }
        })();
    }

    public appendToFile(file: string, content: string): void {
        try {
            fs.appendFile(file, content, err => {
                if (err) {
                    throw err;
                }
            });
            console.warn(`${file} :: ${content}`);
        } catch (e) {
            console.warn(e);
        }
    }
}
