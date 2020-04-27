/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import * as cheerio from 'cheerio';
import fs from 'fs';
import request from 'got';

import { CategoriesService } from '../../modules/categories/categories.service';
import { PostsService } from '../../modules/posts/posts.service';
// import { resolve } from 'url';

function trem(str: string): string {
    return str
        .replace(/"/g, "'")
        .replace(/\n|\r|\t|#/g, '')
        .trim();
}

export class Scrapper {
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
    // public loadPage(url: string) {
    //     (async () => {
    //         try {
    //             const response = await request(url);
    //             const $ = cheerio.load(response.body);
    //             const linkList: string[] = [];
    //             const anc = $(
    //                 '.tabbable-line .tab-content .tab-pane .news-item .news-details h2 a',
    //             );
    //             anc.each((i, e) => {
    //                 // console.log(resolve(this._mainUrl, e.attribs.href));
    //                 linkList.push(resolve(this._mainUrl, e.attribs.href));
    //             });

    //             for (const l of linkList) {
    //                 // console.log(l);
    //                 try {
    //                     await this.loadPostAndSave(url, 0);
    //                 } catch (e) {
    //                     console.warn(e);
    //                     this.appendToFile(
    //                         './logging/error-lower.txt',
    //                         l + '\n',
    //                     );
    //                 }
    //             }
    //         } catch (error) {
    //             console.warn('error:', error);
    //         }
    //     })();
    // }
    public async getCategories(url: string) {
        const response = await request(url);
        const $ = cheerio.load(response.body);
        const categories = [];
        $('.navigation.clearfix.nav-ul LI A').each((i, el) => {
            if (i !== 0) {
                const href = $(el).attr('href');
                if (href !== '/bbc' && href !== 'multimedia') {
                    categories.push({
                        name: href[0] === '/' ? href.split('/')[1] : href,
                        url:
                            href[0] === '/'
                                ? `${url}${href}`
                                : `${url}/${href}`,
                    });
                }
            }
        });

        return categories;
    }

    public async getCategoryNews(categoryUrl: string) {
        // console.log(`scrapping from ${categoryUrl}`);
        const response = await request(categoryUrl);
        const $ = cheerio.load(response.body);
        const newsUrls = [];
        // slider news
        $('.sp-slide.categoryColor .sp-caption A').each((i, el) => {
            newsUrls.push(`${this._mainUrl}${$(el).attr('href')}`);
        });

        // content news
        $('.news-item .news-details .h4 A').each((i, el) => {
            newsUrls.push(`${this._mainUrl}${$(el).attr('href')}`);
        });

        return newsUrls;
    }

    public async loadPostAndSave(url: string, categoryId: number) {
        try {
            const response = await request(url);

            console.warn('statusCode:', response.statusCode);
            const $ = cheerio.load(response.body);

            const title = $('.news-titles h1').text();
            const img = $('.main-img img').attr('src');
            let postBody = '';
            const paragraphs = $('#dev-content p');
            paragraphs.each((i, e) => {
                // if (i > 0 && i < paragraphs.length - 1) {
                //     postBody += e.children[0].data;
                // }
                const text = $(e).text();
                if (i > 0 && text.length > 0) {
                    postBody += text;
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

            return {
                title,
                postDate,
                categoryId,
                imageUrl: `${this._mainUrl}${img}`,
                content: postBody,
                tags: tagsList,
                sourceId: 1,
            };
            // console.warn('ti: ', newPost);
        } catch (error) {
            console.warn('error:', error);
        }
    }

    async beginScrapping() {
        const categories = await this.getCategories(this._mainUrl);

        for (const category of categories) {
            const { id } = await this._categoriesService.getCategoryByName(
                category.name,
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
