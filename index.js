'use strict';
const cheerio = require('cheerio');
const scrapeArange = require('terminal-scrapearange');


function text(elm, $) {
  // 1. get text in element
  if(!elm.childNodes.length) return $(elm).text();
  return $(elm.firstChild).text();
};

function request(path) {
  // 1. make request to nutrition value
  var opt = {method: 'GET', hostname: 'www.nutritionvalue.org', path};
  return scrapeArange.request(opt);
};

function nameParts(z, str, id) {
  // 1. get details from name
  z['Number'] = id;
  z['Name'] = str;
  return z;
};

function headParts(z, $, elm) {
  // 1. get details from header
  var trs = $(elm).find('.noprint');
  for(var i=1; i<=2; i++) {
    var tds = $(trs[i]).find('td');
    z[text(tds[0], $)] = text(tds[2], $);
  }
};

function bodyParts(z, $, elm, i0) {
  // 1. get details from body
  var trs = $(elm).find('tr');
  for(var i=i0, I=trs.length; i<I; i++) {
    var tds = $(trs[i]).find('td');
    z[text(tds[0], $)] = text(tds[1], $);
  }
};

function searchAll(id) {
  return request(`/comparefoods.php?first=${id}&second=${id}`).then((html) => {
    var $ = cheerio.load(html), a = $('td.comp.right a');
    return !a.text()? {}:request(a.attr('href')).then((html) => {
      var $ = cheerio.load(html), z = {'Id': id};
      nameParts(z, $('h1').text(), id);
      headParts(z, $, $('table')[2]);
      $('.nutrient').each((i, elm) => bodyParts(z, $, elm, i===4? 3:2));
      return z;
    });
  });
};
module.exports = $;
