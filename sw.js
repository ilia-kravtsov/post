if(!self.define){let e,i={};const r=(r,n)=>(r=new URL(r+".js",n).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const l=e=>r(e,c),f={module:{uri:c},exports:o,require:l};i[c]=Promise.all(n.map((e=>f[e]||l(e)))).then((e=>(s(...e),o)))}}define(["./workbox-cbf83eee"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BdRIJpmY.css",revision:null},{url:"assets/index-DYKuaA7R.js",revision:null},{url:"index.html",revision:"4cf1fa2ba8c7708966feddeb5c60ee56"},{url:"registerSW.js",revision:"8c69be633e79f520049ba569829b02f6"},{url:"favicon.ico",revision:"4161ef9731c71f4d84b0edf62354f7a8"},{url:"apple-touch-icon.png",revision:"cdeed9d61fa3815a465879f13e8144e8"},{url:"maskable_196.png",revision:"de851d93584814f20526681a8dc6843d"},{url:"calculator_192.png",revision:"fd46e1127b3003f09ad6c84d2f84532f"},{url:"calculator_256.png",revision:"64fbb992cecef7861981bccde6d8bfb6"},{url:"calculator_384.png",revision:"f184fb27e60f501bac1776b59a642c99"},{url:"calculator_512.png",revision:"9818821a04df58b31416a30c5c043ddd"},{url:"manifest.webmanifest",revision:"7492d337225172186730d36b06eaf448"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
