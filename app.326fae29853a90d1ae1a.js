webpackJsonp([3],{0:function(e,t,n){e.exports=n("ET/6")},"0iPh":function(e,t){e.exports=jQuery},"7uq+":function(e,t){window.gtag("config","UA-90187256-1",{linker:{domains:["eventbrite.com"],accept_incoming:!0}})},"ET/6":function(e,t,n){"use strict";function o(){return!window.matchMedia("(display-mode: standalone)").matches&&(!(!s.a.serviceworker||!s.a.android)&&navigator.userAgent.match(/Firefox|Chrome/))}function i(){var e=document.querySelector("template[data-easter-egg=pwa]"),t=document.importNode(e.content,!0),n=t.querySelector("button");n.parentNode.classList.add("match"),n.addEventListener("click",function(e){e.preventDefault(),u()({title:"Yo! You have Service Worker!",text:'You can click "Add the home screen" to install in your phone and access offline',icon:"success"})}),document.body.appendChild(t)}Object.defineProperty(t,"__esModule",{value:!0});var a={};n.d(a,"match",function(){return o}),n.d(a,"add",function(){return i});var r=(n("j1ja"),n("0iPh")),c=n.n(r);n("fX93"),n("7uq+"),n("u/NC");setTimeout(function(){var e=c()("nav");c()(".toc-wrapper").pushpin({top:e.height()+c()(".theme-area").height()+96,offset:e.height()})},100);var d=(n("vZNj"),n("treS")),s=n.n(d);s.a.addTest("android",-1!==navigator.userAgent.indexOf("Android")),s.a.addTest("ios",!!navigator.userAgent.match(/iOS/i)),s.a.addTest("pwa",window.matchMedia("(display-mode: standalone)").matches),s.a.addTest("serviceworker","serviceworker"in navigator),s.a.serviceworker&&navigator.serviceWorker.register("/2018/service-worker.js").then(function(e){console.log("Finish registration"),e.addEventListener("updatefound",function(){var t=e.installing;console.log("A new service worker is being installed: "+t),t.addEventListener("statechange",function(){if("installed"===t.state)if(navigator.serviceWorker.controller){var e=document.querySelector("template[data-easter-egg=update]"),n=document.importNode(e.content,!0),o=n.querySelector("div.notice-card"),i=n.querySelector("i.close"),a=n.querySelector("button.pulse");i.addEventListener("click",function(){o.classList.remove("active"),a.parentNode.classList.remove("hide")}),a.addEventListener("click",function(){o.classList.add("active"),a.parentNode.classList.add("hide")}),document.body.appendChild(n)}else console.log("Content is cached for offline use.")})})});var l=n("thjQ"),u=n.n(l);[a].forEach(function(e){e.match()&&e.add()}),c()(".button-collapse").sideNav(),c()(".collapsible").collapsible(),c()(".collapsible a.collapsible-header").click(function(e){e.preventDefault()}),c()(".scrollspy").scrollSpy(),c()("ul.tabs").tabs()},fX93:function(e,t,n){"localhost"!==window.location.hostname&&"https:"!==window.location.protocol&&(window.location.href=window.location.href.replace("http://","https://"))},treS:function(e,t){e.exports=Modernizr},"u/NC":function(e,t){},vZNj:function(e,t){window.addEventListener("online",function(){document.body.setAttribute("data-network","online")}),window.addEventListener("offline",function(){document.body.setAttribute("data-network","offline")})}},[0]);
//# sourceMappingURL=app.326fae29853a90d1ae1a.js.map