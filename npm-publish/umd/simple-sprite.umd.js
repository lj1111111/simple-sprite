!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.sprite={})}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var o=function t(i,n){e(this,t),this.path=i,this.width=n.width,this.height=n.height,this.area=this.width*this.height},s=function t(i,n){e(this,t),this.x=i,this.y=n},r=function(){function t(i,n,o,s,r){e(this,t),this.path=r,this.x=i,this.y=n,this.width=o,this.height=s,this.left=i,this.top=n,this.right=this.left+o,this.bottom=this.top+s,this.centerX=(this.left+this.right)/2,this.centerY=(this.top+this.bottom)/2}return n(t,[{key:"isCollided",value:function(t){return Math.abs(this.centerX-t.centerX)<(this.width+t.width)/2&&Math.abs(this.centerY-t.centerY)<(this.height+t.height)/2}}]),t}(),h=function(){function t(){e(this,t),this.points=[],this.regions=[],this.initPoints()}return n(t,[{key:"initPoints",value:function(){var t=new s(0,0);this.points.push(t)}},{key:"getPossibleRegions",value:function(t,e,i){var n=this,o=[];return this.points.forEach(function(s){var h=new r(s.x,s.y,t,e,i),a=n.regions.length;if(0===a)o.push(h);else{for(var u=!0,c=0;c<a;c++)n.regions[c].isCollided(h)&&(u=!1);u&&o.push(h)}}),o}},{key:"getSmallestAreaRegion",value:function(t,e,i){var n,o=this,s=this.getPossibleRegions(t,e,i),r=Number.MAX_VALUE;return s.forEach(function(t){var e=o.getTotalAreaOfRegions(t);r>e&&(r=e,n=t)}),n}},{key:"getTotalAreaOfRegions",value:function(t){return this.getTotalWidthOfRegions(t)*this.getTotalHeightOfRegions(t)}},{key:"getTotalWidthOfRegions",value:function(t){var e=t?t.right:0;return this.regions.forEach(function(t){e=Math.max(e,t.right)}),e}},{key:"getTotalHeightOfRegions",value:function(t){var e=t?t.bottom:0;return this.regions.forEach(function(t){e=Math.max(e,t.bottom)}),e}}]),t}(),a=require("fs"),u=require("path"),c=require("images"),f=require("log4js").getLogger("ngo-sprite");f.level="info",t.main=function(t){if(t){var e=a.readdirSync(t).filter(function(t){return"sprite.png"!=t}).filter(function(t){var e=t.substring(t.indexOf(".")).toLowerCase();return".bmp"==e||".png"==e||".gif"==e||".jpg"==e||".jpeg"==e}).map(function(e){return u.join(t,e)}).filter(function(t){return a.statSync(t).isFile()}).map(function(t){return new o(t,c(t).size())});e.sort(function(t,e){return t.area<e.area});var i=new h;e.forEach(function(t,e){var n=i.getSmallestAreaRegion(t.width,t.height,t.path);if(n){i.regions.push(n),i.points.push(new s(n.right,n.top)),i.points.push(new s(n.left,n.bottom));var o=i.points.findIndex(function(t){return t.x===n.x&&t.y===n.y});i.points.splice(o,1)}});var n=c(i.getTotalWidthOfRegions(),i.getTotalHeightOfRegions());i.regions.forEach(function(t){n.draw(c(t.path),t.x,t.y)}),n.save(u.join(t,"sprite.png"));var r="";i.regions.forEach(function(t){var e="{".concat(t.path,",background-position: -").concat(t.x,"px -").concat(t.y,"px,width:").concat(t.width,"px,height:").concat(t.height,"px}\n");r+=e}),a.writeFileSync(u.join(t,"./sprite-css.txt"),r),f.info("generate sprite image success,it has been saved in ".concat(t,"/sprite.png")),f.info("generate css success,it has been saved in ".concat(t,"/sprite-css.txt"))}else f.error("please input image dir.")},Object.defineProperty(t,"__esModule",{value:!0})});
