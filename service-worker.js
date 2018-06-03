/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["0.4558c67c67ddb93946cf.js","230991c12673b64c8e9aae7045de31ff"],["0.4558c67c67ddb93946cf.js.map","867eb9965586399436dd53334e60ccb1"],["1.cee9ed7c6364cb579752.js","6f0324d525b84e663b3fa46329ffcac6"],["1.cee9ed7c6364cb579752.js.map","6d56ec8e99c055d59db730f6356915c8"],["5.1a97782569b2181ed176.js","1aa647a12cacc837f60dbee54a2f2d58"],["5.1a97782569b2181ed176.js.map","9c4de9ac6a5092571189129339197967"],["6.9eaf269e33f50f16fd4a.js","cb853bd5df0affa0e05b048b4b7d3c22"],["6.9eaf269e33f50f16fd4a.js.map","59df6875eb9d4add82dc50a8601e6f08"],["7.8760050fbe37c5adc7b8.js","24961d8235cda6618d22340378ae8148"],["7.8760050fbe37c5adc7b8.js.map","0281fe407318a180a58974d0b1777ccd"],["8.38b136697f414c929201.js","279e45314028e0afa417ddfec541932e"],["8.38b136697f414c929201.js.map","3b1fae48509e0fccf44880a881118649"],["9.f22251c9c7b9acc75ff7.js","e13506a27a0f6baa51656c6be7fd64d9"],["9.f22251c9c7b9acc75ff7.js.map","2dcf2f58dd69fa867e0216505f4a9635"],["about-coc.html","b388e19aa1ad37fe6ed0746a470887ac"],["about-committee.html","ae27acb7187903d562fd312ece87a62c"],["app.326fae29853a90d1ae1a.js","fe9ce48bcf36c9678469cb3110a3e874"],["app.326fae29853a90d1ae1a.js.map","901acbf937b7d0cd9131920b9aa9ed24"],["app.36187e9688ab7d2d63769023c1664ce1.css","459d175d554af336bb3eac3322c6ffdd"],["assets.json","04f477f71fd9db6e6dbfc829130da0cc"],["cfc.html","74680f22285e1ee832b4931c8c17c64a"],["cfp.html","237111ec2a2c17ff670a077b76580d76"],["data/cfp.yml","b65395f8bc8ec35b6c50481d9b14eb54"],["data/community.yml","97a422185106c43f1c36fac6f5a715e9"],["data/general.json","5402e8353b0c2796a32822c9fcd3abfc"],["data/site.yml","57a5d07879d37c810fd7fc7bc507da52"],["data/timetable-schema.yml","bb7808550ef501ed7f4f09d113e9d0d5"],["data/timetable.json","aa3ba44c4a2e03992174b4da54adb276"],["images/banner.jpg","9768d02a027b70840243d53a3f708a50"],["images/cover.jpg","3f1ffa6f7cf5ec7dbd79bd6164f28467"],["images/favicon.png","4634634056d4299d4f1a856d4e52e500"],["images/keyvisual.jpg","85a9cf8ed7185b1eb3109fb0180f86ca"],["images/theme-day1.jpg","e1645b5f0388e69308bb8fa1d4875156"],["images/theme-day2.jpg","4ce1064fcd8843b6363844ec866e417b"],["index.html","b1ce37c69175ae20e1c3a66a7437361c"],["manifest.635a656a569d0ad11d73.js","ecbc1665cdf35e846df77bebae3db8ef"],["manifest.635a656a569d0ad11d73.js.map","b706b736607f8012743492c1276b2100"],["manifest.json","bab2f310e98acf8fe10106f573b72bc7"],["sponsors/index.html","f2778fe59c7df5e8cccd6e8353081068"],["timetable.1407d343192a94a9e5e9.js","bc9c5dd62d06c894a861f8a32d7324f3"],["timetable.1407d343192a94a9e5e9.js.map","2578bce51f36237bbef308b01254ccd8"],["timetable/index.html","4bf5d22833065280290853d2e9329560"],["topic/blockchain-and-distributed-ledger-technology-documents/index.html","d4177fa288ac5a9fe4d901fb44a213a8"],["topic/blockchain-creative-contents-what-we-do-likecoin/index.html","2b077d7241be4957eebd5c7d8fc319e9"],["topic/blockchain-discussion-panel/index.html","1fdaecadee13174d904317a66fe84783"],["topic/blockchain-scalability-solutions-how-build-decentralized-exchanges/index.html","406a69fa22fb8c19af26d41944cd22d4"],["topic/boring-ai-business/index.html","fa43f8caef55b4eebc2f6a6b705eeff5"],["topic/browsers-behind-scenes/index.html","8fb44507248e69d7d2c3e63031160f31"],["topic/containerized-high-availability-virtual-hosting-deployment-kubernetes-docker-and-ansible/index.html","97a248dce11c47384d75cc5f9b6c7e82"],["topic/crossing-relation-and-document-database-using-mysql/index.html","1f345cf476ae7151fd2eaa5877b0fa19"],["topic/dapp-new-approach-combine-blockchain-and-cryptography-web-application/index.html","bdf4d4688231b6aa5d75a695d14b2a3d"],["topic/data-pipeline-apache-kafka/index.html","20dc9ba99f2b86dcebae6e6c9ee437f5"],["topic/deploy-serverless-chat-bot-quick-skygear/index.html","05f1a63d3a09c2da8438f98308073d2c"],["topic/disruption-system-how-open-data-changing-genomic-research/index.html","7931f1a58ac7fabd72e576acff2de8f9"],["topic/fn-project-how-serverless-empowers-developers-adopt-different-programming-languages/index.html","5e7a0f06d58c792e49a7862ea8d76ecd"],["topic/git-time-travellers/index.html","a8a025ede11dd2657ecff446bb52be99"],["topic/haxe-better-javascript-practical-guide-making-front-end-development-fun-fast-and-less/index.html","67a22865e7aa720e5b5161636c68ff57"],["topic/heading-new-stage-mysql-80/index.html","723bbe675021aab3b3d5259b4667ec6d"],["topic/how-openresty-guarantees-code-quality-open-source-projects/index.html","34c783cebd0663ff9ea280b2426613f3"],["topic/lets-fix-internet/index.html","bcf79384f0644da0916296f7033bb3ba"],["topic/maintaining-open-source-while-maintaining-your-sanity/index.html","0ce65237726272a0095746bca16f2d63"],["topic/managing-domain-names-your-open-source-projects-gandi/index.html","d770e150676ae646574aaf9457d7ad1a"],["topic/memory-forensics-101/index.html","843d6d860de385b4aef37a21f6b1ec84"],["topic/mixed-reality-web/index.html","189e761ade483940968d47cda898d1a9"],["topic/mysql-fault-tolerant-best-practice-lesson-learned-cases-i-experienced/index.html","94311fc80b735c41691676c93ca7215d"],["topic/mysql-group-replicationzaijinrongchangjingdeyingyongshijian/index.html","5f4d5b19345ab07ea5beb14f77fcf5a3"],["topic/open-source-agriculture/index.html","d6a06b7b2cfad80cf06f3f2b79b16aa9"],["topic/practical-javascript-fuzzing/index.html","e2277fced78de6f0dff0c66b1bf6b0e0"],["topic/qilaizaofangeguangdonghuazi/index.html","d8d490c586b90792c1f8eac5c42b71fd"],["topic/r-short-talks/index.html","93907b63fa7e42dca66de6fc793e9e46"],["topic/raspberry-pi-r3-scalable-high-availability-mysql-innodb-cluster-and-apache-kafkar-distributed/index.html","de9a9ef48c33ea1bb4f16911459fe2b2"],["topic/refactoring-gibbon/index.html","df4a81c132f867ed8fb905ba517b36ee"],["topic/run-multiple-isolated-web-applications-containers-single-ip-cloud/index.html","123d60dc9ffe49552bec8a684fa53c8f"],["topic/scaling-tbs-data-apache-spark-and-scala-dsl-production/index.html","aee5377760e3ce7f2d705c1307312791"],["topic/type-safe-rest-api-haxe/index.html","764e46ecc7dc5c3243b62628ab9596a5"],["topic/unconference-track-1/index.html","8a57f5bcad4af661be4a5ca8f85d215e"],["topic/unconference-track-2/index.html","8166b337e1647d20a8802a451721272b"],["topic/using-web-software-architecture-traditional-desktop-app-development-how-fluxredux-was-ported/index.html","820e8496b856d579b28a5173d6e7bba3"],["topic/videojs-hls/index.html","3153b6c2bdcf33d4be7eb8a17770a76e"],["topic/why-your-domain-name-matters/index.html","50c638459936d8bb934d61f021edbad0"],["vendor.a90b1f6b82c584c7c3e3.js","51ed80f4b4e390374453977156dc2574"],["vendor.a90b1f6b82c584c7c3e3.js.map","e1df5176287454e5dd6c92029665a0c6"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







