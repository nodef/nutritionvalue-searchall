'use strict';
const https = require('https');
const jsdom = require('jsdom');
const _slice = Array.prototype.slice;

function text(el) {
  // 1. get text content of an element
  if(!el.children.length) return el.textContent;
  return el.children[0].textContent;
};

function info(td) {
  // 1. get inner anchor href and content
  const a = td.getElementsByTagName('a')[0];
  return {'href': a.getAttribute('href'), 'value': a.textContent};
};

function request(path) {
  // 1. make request with user-agent
  return jsdom.JSDOM.fromURL(`https://www.nutritionvalue.org${path}`, {
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  });
};

function nutritionalValue(path) {
  return request(path).then((dom) => {
    const a = {}, document = dom.window.document;
    var tables = document.getElementsByTagName('table');
    var trs = tables[2].getElementsByClassName('noprint');
    for (var i=1; i<=2; i++) {
      var tds = trs[i].getElementsByTagName('td');
      a[text(tds[0])] = text(tds[2]);
    }
    tables = document.getElementsByClassName('nutrient');
    for(var table of tables) {
      trs = table.getElementsByTagName('tr');
      for(var tr of _slice.call(trs, table===tables[4]? 3 : 2)) {
        var tds = tr.getElementsByTagName('td');
        a[text(tds[0])] = text(tds[1]);
      }
    }
    return a;
  });
};

const $ = function(id) {
  return request(`/search.php?food_query=&page=${id}`).then((dom) => {
    const a = {}, pro = [], document = dom.window.document;
    const tables = document.getElementsByTagName('table');
    if(tables.length<3) return fres({});
    const trs = tables[2].getElementsByTagName('tr');
    const fetch = (key, path) => nutritionalValue(path).then((ans) => a[key] = ans);
    for(var tr of _slice.call(trs, 1, -1)) {
      var i = info(tr.getElementsByTagName('td')[0]);
      pro.push(fetch(i.value, i.href));
    }
    return Promise.all(pro).then(() => a);
  });
};
module.exports = $;

if(require.main===module) {
  const a = {}, arg = process.argv;
  const start = arg.length>2? parseInt(arg[2]) : 0;
  const stop = arg.length>3? parseInt(arg[3]) : start+1;
  const step = arg.length>4? parseInt(arg[4]) : 8;
  const inc = Math.sign(step);
  const fetch = (id) => pro.then(() => $(id)).then((ans) => Object.assign(a, ans));
  for(var i=start, pro = Promise.resolve(); i!==stop;) {
    for(var I=Math.min(stop, i+step), p=[]; i!==I; i+=inc)
      p.push(fetch(i));
    pro = Promise.all(p);
  }
  pro.then(() => console.log(JSON.stringify(a)));
}
