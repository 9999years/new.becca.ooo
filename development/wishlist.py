import sys
import re
import subprocess
import os.path

import toml
import requests
from bs4 import BeautifulSoup

# literal $, digits, maybe . and more digits
price_pat = re.compile(r'\$(\d+(?:\.\d+)?)')

# illegal in ntfs paths
slug_bad_pat = re.compile(r'[<>:"/\\|?* \x00-\x31]')

def slugify(txt):
    # replace bad characters with -
    # unicode OK!
    return slug_bad_pat.sub('-', txt).lower()

# def img(url, fname):
    # req = requests.get(url)
    # with open(fname, 'wb') as f:
        # f.write(req.content)

def _soup(url):
    req = requests.get(url)
    if not req.ok:
        raise ValueError
    return BeautifulSoup(req.text, 'html.parser')

def wishlist(url):
    soup = _soup(url)

    ret = {}
    # name, photo
    title = soup.find('title')
    if title:
        title = title.text.strip()
        ret['name'] = title
        ret['photo'] = slugify(title)

    # price
    body_txt = soup.text
    price = price_pat.search(body_txt)
    if price:
        # parse float and round to cents
        price = round(float(price.group(1)), 2)
        if price % 1 <= 0.1:
            # close-to-even dollar price
            price = int(price)
        ret['price'] = price

    ret['url'] = url

    return toml.dumps({'items': [ret]})

def argparser():
    parser = argparse.ArgumentParser(description='Outputs TOML for data/wishlist.toml')
    parser.add_argument('url', help='Page URL of wished item')
    parser.add_argument('img', nargs='?', default=None, help='Image URL of wished item')
    args = parser.parse_args()

def main():
    for url in sys.argv[1:]:
        print(wishlist(url))

if __name__ == '__main__':
    main()
