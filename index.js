'use strict';
const https = require('https');
const jsdom = require('jsdom');
const _slice = Array.prototype.slice;

function text(el) {
  // 1. get text content of an element
  if(!el.children.length) return el.textContent;
  return el.children[0].textContent;
};

function request(path) {
  // 1. make request with user-agent
  const root = 'https://www.nutritionvalue.org';
  return jsdom.JSDOM.fromURL(path.includes('://')? path : root+path, {
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  });
};

const $ = function(id) {
  return request(`/comparefoods.php?first=${id}&second=${id}`).then((dom) => {
    const document = dom.window.document;
    const a = document.querySelector('td.comp.right a');
    return !a.textContent? {} : request(a.href).then((dom) => {
      const a = {}, b = {}, document = dom.window.document;
      const key = document.querySelector('h1').textContent;
      var tables = document.getElementsByTagName('table');
      var trs = tables[2].getElementsByClassName('noprint');
      for (var i=1; i<=2; i++) {
        var tds = trs[i].getElementsByTagName('td');
        b[text(tds[0])] = text(tds[2]);
      }
      tables = document.getElementsByClassName('nutrient');
      for(var table of tables) {
        trs = table.getElementsByTagName('tr');
        for(var tr of _slice.call(trs, table===tables[4]? 3 : 2)) {
          var tds = tr.getElementsByTagName('td');
          b[text(tds[0])] = text(tds[1]);
        }
      }
      a[key] = b;
      return a;
    });
  });
};
module.exports = $;

if(require.main===module) {
  const z = {}, arg = process.argv;
  const start = parseInt(arg[2])||0;
  const stop = parseInt(arg[3])||start+1;
  const step = parseInt(arg[4])||8;
  const inc = Math.sign(step);
  const fetch = (id) => pro.then(() => $(id)).then((ans) => Object.assign(z, ans));
  for(var i=start, pro = Promise.resolve(); i!==stop;) {
    for(var I=Math.min(stop, i+step), p=[]; i!==I; i+=inc)
      p.push(fetch(i));
    pro = Promise.all(p);
  }
  pro.then(() => console.log(JSON.stringify(z)));
}
