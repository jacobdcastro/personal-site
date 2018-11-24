"use strict";

exports.__esModule = true;
exports.default = void 0;

const support = function support(feature) {
  if (typeof document === `undefined`) {
    return false;
  }

  const fakeLink = document.createElement(`link`);

  try {
    if (fakeLink.relList && typeof fakeLink.relList.supports === `function`) {
      return fakeLink.relList.supports(feature);
    }
  } catch (err) {
    return false;
  }

  return false;
};

const linkPrefetchStrategy = function linkPrefetchStrategy(url) {
  if (typeof document === `undefined`) {
    return;
  }

  const link = document.createElement(`link`);
  link.setAttribute(`rel`, `prefetch`);
  link.setAttribute(`href`, url);
  const parentElement = document.getElementsByTagName(`head`)[0] || document.getElementsByName(`script`)[0].parentNode;
  parentElement.appendChild(link);
};

const xhrPrefetchStrategy = function xhrPrefetchStrategy(url) {
  const req = new XMLHttpRequest();
  req.open(`GET`, url, true);
  req.withCredentials = true;
  req.send(null);
};

const supportedPrefetchStrategy = support(`prefetch`) ? linkPrefetchStrategy : xhrPrefetchStrategy;
const preFetched = {};

const prefetch = function prefetch(url) {
  if (preFetched[url]) {
    return;
  }

  preFetched[url] = true;
  supportedPrefetchStrategy(url);
};

var _default = prefetch;
exports.default = _default;