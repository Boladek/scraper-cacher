import { Injectable , Inject, CACHE_MANAGER} from '@nestjs/common';
import {Cache} from 'cache-manager';
import { UrlToBeParsedInput } from './dto/parse-web.dto';
import { CacheDetails, WebDetails } from './model/web-details.interface';
import Axios from 'axios';
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';
import * as probe from 'probe-image-size';
import { GetWebDetailsArgs } from './dto/get-web-details.dto';
import { GetSingleWebDetailsArgs } from './dto/get-single-web-details.dto';
import { GetUrlDetailsArgs } from './dto/get-url-cache-details.dto';
import { ThisExpression } from 'ts-morph';

@Injectable()
export class WebService {
  private webDetails: WebDetails[] = [];
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public getSingleWebDetails(
    getSingleWebDetailsArgs: GetSingleWebDetailsArgs,
  ): WebDetails {
    return this.webDetails.find(
      (url) => url.urlId === getSingleWebDetailsArgs.urlId,
    );
  }

  public getWebDetails(getWebDetailsArgs: GetWebDetailsArgs): WebDetails[] {
    return getWebDetailsArgs.urlIds.map((urlId) =>
      this.getSingleWebDetails({ urlId }),
    );
  }

  public async cacheUrl(getUrlArgs: GetUrlDetailsArgs): Promise<CacheDetails> { 
    try{
      const {url} = getUrlArgs;
      const {data} = await Axios.get(url);
      const cached: string = await this.cacheManager.get(url);
      if(cached){
        const result: CacheDetails = {
          cached: 'true',
          details: cached
        }
        return result;
      } else {
        await this.cacheManager.set(url, data, {ttl: 300});
        const result: CacheDetails = {
          cached: 'false',
          details: data
        }
        return result;
      }
    }catch(error){
     console.log(error);
     return error.message;
    }
  }
  
  public async parseUrl(
    urlToBeParsedInput: UrlToBeParsedInput,
  ): Promise<WebDetails> {
    try {
      const images: string[] = [];
      const page = await Axios.get(urlToBeParsedInput.url);
      const $ = cheerio.load(page.data);
      const html = cheerio.load(page.data, {}).html();
      const webInfo = new JSDOM(html);
      const { window } = webInfo;
      const videos = window.document.querySelectorAll('iframe');
      console.log(videos, "hi");
      const title = window.document.querySelector('title') ? window.document.querySelector('title').textContent : 'title'
      const description = $('meta[name="description"]').attr('content');
      const image = window.document.querySelectorAll('img');
      image.forEach((img) => {
        images.push(img.getAttribute('src'));
      });
      
      const requests = images.map(async (item) => {
        if (item !== null) {
          return await probe(item);
        }
      });

      let allRequests: any = await Promise.allSettled(requests);
      allRequests = allRequests.filter((item: any) => item.status !== 'rejected');
      allRequests = allRequests.sort((a: any, b: any) => b.value.length - a.value.length);

      const result: WebDetails = {
        urlId: uuidv4(),
        title,
        description: description || 'No description available',
        largestImage: ( allRequests.length > 0 && allRequests[0].value.url) || 'No image available'
      };

      this.webDetails.push(result);
      return result;
    } 
    catch (error) {
      console.log(error.message);
      return error;
    }
  }
}
