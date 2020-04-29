/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import * as cheerio from 'cheerio';
import fs from 'fs';
import request from 'got';

import { CategoriesService } from '../../modules/categories/categories.service';
import { PostsService } from '../../modules/posts/posts.service';
import { okaz } from './mapping-categories';
// import { resolve } from 'url';

function trem(str: string): string {
    return str
        .replace(/"/g, "'")
        .replace(/\n|\r|\t|#/g, '')
        .trim();
}

export class OkazScrapper {
    private _mainUrl: string;
    private _categoriesService: CategoriesService;
    private _postsService: PostsService;

    constructor(
        mainUrl: string,
        categoriesService: CategoriesService,
        postsService: PostsService,
    ) {
        this._mainUrl = mainUrl;
        this._categoriesService = categoriesService;
        this._postsService = postsService;
    }

    public async getCategories() {
        const response = await request(this._mainUrl);
        const $ = cheerio.load(response.body);
        const categories = [];
        $('.nav.nav-main ul li a').each((i: number, el) => {
            if (i !== 0 && i !== 1) {
                const url = $(el).attr('href');

                if (
                    url !== undefined &&
                    url !== 'https://www.okaz.com.sa/souk-okaz' &&
                    url !== 'https://www.okaz.com.sa/media/latest' &&
                    url !== 'https://www.okaz.com.sa/articles' &&
                    url !== 'https://www.okaz.com.sa/digital' &&
                    url !== 'https://www.okaz.com.sa/culture'
                ) {
                    categories.push({
                        url,
                        name: url.split('.sa/')[1],
                    });
                }
            }
        });
        return categories;
    }

    public async getCategoryNews(categoryUrl: string) {
        const response = await request(categoryUrl);
        const $ = cheerio.load(response.body);
        const newsUrls = [];
        // slider news
        $('.list-links li A').each((i, el) => {
            newsUrls.push($(el).attr('href'));
        });

        // content news
        $('.updates-inline.updates-inline-secondary li a').each((i, el) => {
            newsUrls.push($(el).attr('href'));
        });
        return newsUrls;
    }

    public async loadPostAndSave(url: string, categoryId: number) {
        try {
            const response = await request(url);

            console.warn('statusCode:', response.statusCode);
            const $ = cheerio.load(response.body);

            const title = $('.article-main .shell.shell-secondary h1').text();
            const img = $('.itemLightGallery img').attr('src');
            let postBody = '';
            const paragraphs = $('.bodyText p');
            paragraphs.each((i, e) => {
                const text = $(e).text();
                if (text.length > 0) {
                    postBody += text;
                }
            });
            // check if postbody is empty
            if (postBody === '') {
                const body = $('div.bodyText');

                body['0'].children.forEach(e => {
                    if (e.type === 'text') {
                        postBody += trem(e.data);
                    }
                });
            }
            const tagsList: string[] = [];
            const tags = $('.list-tags li a span');
            tags.each((i, e) => {
                tagsList.push(trem($(e).text()));
            });

            const postDate = $('.media_article_publish_time p span');

            const date = trem(postDate[0].nextSibling.nodeValue);

            return {
                title,
                categoryId,
                imageUrl: img,
                content: postBody,
                tags: tagsList.length ? tagsList : ['عام'],
                postDate: date,
                sourceId: 2,
            };
        } catch (error) {
            console.warn('error:', error);
        }
    }

    async beginScrapping() {
        const categories = await this.getCategories();

        for (const category of categories) {
            const categoryName = okaz[category.name];
            const { id } = await this._categoriesService.getCategoryByName(
                categoryName,
            );
            console.warn(`scrapping from ${category.url}`);
            const news = await this.getCategoryNews(category.url);

            for (const url of news) {
                const post = await this.loadPostAndSave(url, id);
                try {
                    await this._postsService.createPost(post);
                    console.warn('created post');
                } catch (error) {
                    console.warn('duplicated post');
                }
            }
        }
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
