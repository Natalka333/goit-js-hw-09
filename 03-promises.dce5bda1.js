!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var u=r("6JpON"),i=document.querySelector(".form");document.querySelector('input[name="delay"]'),document.querySelector('input[name="step"]'),document.querySelector('input[name="amount"]'),document.querySelector('button[type="submit"]');function a(e,t){return new Promise((function(n,o){var r=Math.random()>.3;setTimeout((function(){r?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}i.addEventListener("click",(function(t){t.preventDefault();for(var n=t.currentTarget.elements,o=n.delay,r=n.step,i=n.amount,c=Number(o.value),l=Number(r.value),d=Number(i.value),f=1;f<=d;f+=1)a(f,c).then((function(t){var n=t.position,o=t.delay;e(u).Notify.success("✅ Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(t){var n=t.position,o=t.delay;e(u).Notify.failure("❌ Rejected promise ".concat(n," in ").concat(o,"ms"))})),c+=l,t.currentTarget.reset()}))}();
//# sourceMappingURL=03-promises.dce5bda1.js.map
