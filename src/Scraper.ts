import axios from "axios";
import { Cheerio } from "cheerio";
import * as cheerio from "cheerio";
class Scraper {
  constructor() {}
  async hit() {
    const cfg = {};
    await axios("https://coinmarketcap.com/", cfg)
      .then((res) => {
        // console.log(res.data);
        const $ = cheerio.load(res.data);
        const selectedElem = "div.main-content > table > tbody > tr";
        const keys = [
          "No.",
          "Coin",
          "Price",
          "24h",
          "7d",
          "Marketcap",
          "Volume",
          "CirculatingSupply",
        ];
        const coinArray = [];
        $(selectedElem).each((parentIndex, parentElem) => {
          let keyIndex = 0;
          let coinDetails: any = {};
          if (parentIndex <= 9) {
            $(parentElem)
              .children()
              .each((childId, childElem) => {
                const value = $(childElem).text();
                if (value) {
                  coinDetails[keys[keyIndex]] = value;

                  keyIndex++;
                }
              });
            // console.log(coinDetails);
            coinArray.push(coinDetails);
          }
        });
        // console.log(res.data);

        // console.log($("article #post-366").attr("class"));
      })
      .catch((e) => {
        console.log("lol");
      });
  }
}
const scraper = new Scraper();
scraper.hit();
