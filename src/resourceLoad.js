import cheerio from 'cheerio';
import fs from 'mz/fs';


const content = fs.readFileSync('../__tests__/__fixtures__/hexlet-io.html');

const dom = cheerio.load(content);

console.log(dom('link'));
