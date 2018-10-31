"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}Object.defineProperty(exports,"__esModule",{value:!0});var ImageInfo=function t(e,i){_classCallCheck(this,t),this.path=e,this.width=i.width,this.height=i.height,this.area=this.width*this.height},Point=function t(e,i){_classCallCheck(this,t),this.x=e,this.y=i},Region=function(){function t(e,i,n,s,r){_classCallCheck(this,t),this.path=r,this.x=e,this.y=i,this.width=n,this.height=s,this.left=e,this.top=i,this.right=this.left+n,this.bottom=this.top+s,this.centerX=(this.left+this.right)/2,this.centerY=(this.top+this.bottom)/2}return _createClass(t,[{key:"isCollided",value:function(t){return Math.abs(this.centerX-t.centerX)<(this.width+t.width)/2&&Math.abs(this.centerY-t.centerY)<(this.height+t.height)/2}}]),t}(),SimpleSprite=function(){function t(){_classCallCheck(this,t),this.points=[],this.regions=[],this.initPoints()}return _createClass(t,[{key:"initPoints",value:function(){var t=new Point(0,0);this.points.push(t)}},{key:"getPossibleRegions",value:function(t,e,i){var n=this,s=[];return this.points.forEach(function(r){var o=new Region(r.x,r.y,t,e,i),a=n.regions.length;if(0===a)s.push(o);else{for(var h=!0,c=0;c<a;c++)n.regions[c].isCollided(o)&&(h=!1);h&&s.push(o)}}),s}},{key:"getSmallestAreaRegion",value:function(t,e,i){var n,s=this,r=this.getPossibleRegions(t,e,i),o=Number.MAX_VALUE;return r.forEach(function(t){var e=s.getTotalAreaOfRegions(t);o>e&&(o=e,n=t)}),n}},{key:"getTotalAreaOfRegions",value:function(t){return this.getTotalWidthOfRegions(t)*this.getTotalHeightOfRegions(t)}},{key:"getTotalWidthOfRegions",value:function(t){var e=t?t.right:0;return this.regions.forEach(function(t){e=Math.max(e,t.right)}),e}},{key:"getTotalHeightOfRegions",value:function(t){var e=t?t.bottom:0;return this.regions.forEach(function(t){e=Math.max(e,t.bottom)}),e}}]),t}(),fs=require("fs"),path=require("path"),images=require("images"),log4js=require("log4js"),logger=log4js.getLogger("ngo-sprite");function main(t){if(t){var e=fs.readdirSync(t).filter(function(t){return"sprite.png"!=t}).filter(function(t){var e=t.substring(t.indexOf(".")).toLowerCase();return".bmp"==e||".png"==e||".gif"==e||".jpg"==e||".jpeg"==e}).map(function(e){return path.join(t,e)}).filter(function(t){return fs.statSync(t).isFile()}).map(function(t){return new ImageInfo(t,images(t).size())});e.sort(function(t,e){return t.area<e.area});var i=new SimpleSprite;e.forEach(function(t,e){var n=i.getSmallestAreaRegion(t.width,t.height,t.path);if(n){i.regions.push(n),i.points.push(new Point(n.right,n.top)),i.points.push(new Point(n.left,n.bottom));var s=i.points.findIndex(function(t){return t.x===n.x&&t.y===n.y});i.points.splice(s,1)}});var n=images(i.getTotalWidthOfRegions(),i.getTotalHeightOfRegions());i.regions.forEach(function(t){n.draw(images(t.path),t.x,t.y)}),n.save(path.join(t,"sprite.png"));var s="";i.regions.forEach(function(t){var e="{".concat(t.path,",background-position: -").concat(t.x,"px -").concat(t.y,"px,width:").concat(t.width,"px,height:").concat(t.height,"px}\n");s+=e}),fs.writeFileSync(path.join(t,"./sprite-css.txt"),s),logger.info("generate sprite image success,it has been saved in ".concat(t,"/sprite.png")),logger.info("generate css success,it has been saved in ".concat(t,"/sprite-css.txt"))}else logger.error("please input image dir.")}logger.level="info",exports.main=main;
