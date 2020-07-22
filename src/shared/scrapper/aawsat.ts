/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import * as cheerio from 'cheerio';
// import fs from 'fs';
import request from 'got';

import { CategoriesService } from '../../modules/categories/categories.service';
import { PostsService } from '../../modules/posts/posts.service';
import { aawsat } from './mapping-categories';

function trem(str: string): string {
    return str
        .replace(/"/g, "'")
        .replace(/\n|\r|\t|#/g, '')
        .trim();
}

export class AawsatScrapper {
    private _mainUrl: string;
    private _categoriesService: CategoriesService;
    private _postsService: PostsService;
    private _neglectedCategories: string[];

    constructor(
        mainUrl: string,
        categoriesService: CategoriesService,
        postsService: PostsService,
    ) {
        this._mainUrl = mainUrl;
        this._categoriesService = categoriesService;
        this._postsService = postsService;
        this._neglectedCategories = [
            'home',
            'gulf',
            'arab-world',
            'world',
            'iran',
            'opinion',
            'supplements',
            'fundamentalism',
            'press',
            'hassad',
            'vehicles',
            'cinema',
            'realestate',
            'books',
            'arts',
            'declassified',
            'multimedia',
            'last-page',
            'food',
        ];
    }

    private _isNeglectedCategory(categoryName: string): boolean {
        for (const currentCategory of this._neglectedCategories) {
            if (currentCategory === categoryName) {
                return true;
            }
        }
        return false;
    }

    public async getCategories() {
        const response = await request(this._mainUrl);
        const $ = cheerio.load(response.body);
        const categories = [];
        let cultureFound = false;
        $('.menu.nav.navbar-nav li a').each((i: number, el) => {
            const url = $(el).attr('href');
            const name = url.includes('/section')
                ? url.split('section/')[1]
                : url.split('international/')[1];
            if (!this._isNeglectedCategory(name)) {
                if (!cultureFound || name !== 'culture') {
                    categories.push({
                        name,
                        url: `${this._mainUrl}${url}`,
                    });
                }
                if (name === 'culture') {
                    cultureFound = true;
                }
            }
        });
        return categories;
    }

    public async getCategoryNews(categoryUrl: string) {
        const response = await request(categoryUrl);
        const $ = cheerio.load(response.body);
        const newsUrls = [];
        // main
        $('.news-big-item-type2 h2 a').each((i, el) => {
            const href = $(el).attr('href');
            newsUrls.push(`${this._mainUrl}${href}`);
        });

        // media news
        $('.media .media-left a').each((i, el) => {
            const href = $(el).attr('href');
            newsUrls.push(`${this._mainUrl}${href}`);
        });
        return newsUrls;
    }

    public async loadPostAndSave(url: string, categoryId: number) {
        try {
            const response = await request(url);

            console.warn('statusCode:', response.statusCode);
            const $ = cheerio.load(response.body);

            const title = trem($('#article_content h2').text());
            const img = $('.node_new_photo img').attr('src');
            let postBody = '';
            const paragraph = $('.node_new_body p');
            paragraph.each((i, e) => {
                if (i === 0) {
                    // to get only first child
                    e.children.forEach(element => {
                        if (element.type === 'text') {
                            postBody += trem(element.data);
                        }
                    });
                }
            });

            const tagsList: string[] = [];
            // const tags = $('.list-tags li a span');
            // tags.each((i, e) => {
            //     tagsList.push(trem($(e).text()));
            // });

            const postDate = trem($('#update_date').text());

            return {
                title,
                categoryId,
                postDate,
                imageUrl: `${this._mainUrl}${img}`,
                content: postBody,
                tags: tagsList.length ? tagsList : ['عام'],

                sourceId: 2,
            };
        } catch (error) {
            console.warn('error:', error);
        }
    }

    async beginScrapping() {
        const categories = await this.getCategories();

        for (const category of categories) {
            const categoryName = aawsat[category.name];

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

    // public appendToFile(file: string, content: string): void {
    //     try {
    //         fs.appendFile(file, content, err => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //         console.warn(`${file} :: ${content}`);
    //     } catch (e) {
    //         console.warn(e);
    //     }
    // }
}
