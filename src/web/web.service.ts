import { Injectable } from '@nestjs/common';
import { UrlToBeParsedInput } from './dto/parse-web.dto';
import { WebDetails } from './model/web-details.interface';
import Axios from 'axios';
import cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';
import * as probe from 'probe-image-size';
import { GetWebDetailsArgs } from './dto/get-web-details.dto';
import { GetSingleWebDetailsArgs } from './dto/get-single-web-details.dto';

@Injectable()
export class WebService {
  private webDetails: WebDetails[] = [];

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
      const title = window.document.querySelector('title').textContent;
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

        console.log('hi');

      let allRequests: any = await Promise.allSettled(requests);
      allRequests = allRequests.filter((item) => item.value !== undefined);
      allRequests = allRequests.sort((a, b) => b.value.length - a.value.length);

      const result: WebDetails = {
        urlId: uuidv4(),
        title: title,
        description: description || 'No description available',
        largestImage: allRequests[0].value.url || 'No images available',
      };
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
