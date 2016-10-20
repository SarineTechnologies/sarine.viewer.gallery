
/*!
sarine.viewer.gallery - v0.4.0 -  Thursday, October 20th, 2016, 10:33:11 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineGallery,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SarineGallery = (function(_super) {
    __extends(SarineGallery, _super);

    function SarineGallery(options) {
      this.preloadAssets = __bind(this.preloadAssets, this);
      SarineGallery.__super__.constructor.call(this, options);
      this.ImagesPath = options.ImagesPath, this.ImagesArr = options.ImagesArr, this.ImageExtention = options.ImageExtention;
      this.isAvailble = true;
      this.resourcesPrefix = options.baseUrl + "atomic/v1/assets/";
      this.resources = [
        {
          element: 'script',
          src: 'jquery.bxslider.min.js'
        }, {
          element: 'link',
          src: 'jquery.bxslider.css'
        }
      ];
    }

    SarineGallery.prototype.convertElement = function() {
      this.ul = $("<ul class='bxslider'>");
      this.div = $("<div id='bx-pager'>");
      this.element.append(this.div);
      return this.element.append(this.ul);
    };

    SarineGallery.prototype.preloadAssets = function(callback) {
      var element, loaded, resource, totalScripts, triggerCallback, _i, _len, _ref, _results;
      loaded = 0;
      totalScripts = this.resources.map(function(elm) {
        return elm.element === 'script';
      });
      triggerCallback = function(callback) {
        loaded++;
        if (loaded === totalScripts.length - 1 && callback !== void 0) {
          return setTimeout((function(_this) {
            return function() {
              return callback();
            };
          })(this), 500);
        }
      };
      element;
      _ref = this.resources;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resource = _ref[_i];
        element = document.createElement(resource.element);
        if (resource.element === 'script') {
          $(document.body).append(element);
          element.onload = element.onreadystatechange = function() {
            return triggerCallback(callback);
          };
          element.src = this.resourcesPrefix + resource.src + cacheVersion;
          _results.push(element.type = "text/javascript");
        } else {
          element.href = this.resourcesPrefix + resource.src + cacheVersion;
          element.rel = "stylesheet";
          element.type = "text/css";
          _results.push($(document.head).prepend(element));
        }
      }
      return _results;
    };

    SarineGallery.prototype.first_init = function() {
      var defer, _t;
      defer = $.Deferred();
      this.element.append();
      _t = this;
      this.preloadAssets(function() {
        var src;
        src = configuration.configUrl + _t.ImagesPath + _t.ImagesArr[0] + _t.ImageExtention;
        return _t.loadImage(src).then(function(img) {
          if (img.src.indexOf('data:image') === -1 && img.src.indexOf('no_stone') === -1) {
            return defer.resolve(_t);
          } else {
            _t.isAvailble = false;
            _t.element.empty();
            this.canvas = $("<canvas>");
            this.canvas[0].width = img.width;
            this.canvas[0].height = img.height;
            this.ctx = this.canvas[0].getContext('2d');
            this.ctx.drawImage(img, 0, 0, img.width, img.height);
            this.canvas.attr({
              'class': 'no_stone'
            });
            return _t.element.append(this.canvas);
          }
        });
      });
      return defer;
    };

    SarineGallery.prototype.full_init = function() {
      var defer, index, name, _i, _len, _ref;
      defer = $.Deferred();
      if (this.isAvailble) {
        this.imageList = this.element.find('.bxslider');
        this.thumbList = this.element.find('#bx-pager');
        _ref = this.ImagesArr;
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          name = _ref[index];
          this.fullSrc = configuration.configUrl + this.ImagesPath + name + this.ImageExtention;
          this.thumbSrc = configuration.configUrl + this.ImagesPath + name + '-thumb' + this.ImageExtention;
          this.imageItem = '<li><img src="' + this.fullSrc + '" alt="' + name + '" /></li>';
          this.thumbItem = '<a data-slide-index="' + index + '" href=""><img src="' + this.thumbSrc + '" alt="' + name + '-thumb" /></a>';
          this.imageList.append(this.imageItem);
          this.thumbList.append(this.thumbItem);
        }
        $('.bxslider').bxSlider({
          pagerCustom: '#bx-pager',
          controls: false
        });
      }
      defer.resolve(this);
      return defer;
    };

    SarineGallery.prototype.play = function() {};

    SarineGallery.prototype.stop = function() {};

    return SarineGallery;

  })(Viewer);

  this.SarineGallery = SarineGallery;

}).call(this);
