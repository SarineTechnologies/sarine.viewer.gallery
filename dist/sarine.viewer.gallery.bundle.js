
/*!
sarine.viewer.gallery - v0.4.0 -  Sunday, October 30th, 2016, 8:34:34 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineGallery, Viewer,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Viewer = (function() {
    var error, rm;

    rm = ResourceManager.getInstance();

    function Viewer(options) {
      console.log("");
      this.first_init_defer = $.Deferred();
      this.full_init_defer = $.Deferred();
      this.src = options.src, this.element = options.element, this.autoPlay = options.autoPlay, this.callbackPic = options.callbackPic;
      this.id = this.element[0].id;
      this.element = this.convertElement();
      Object.getOwnPropertyNames(Viewer.prototype).forEach(function(k) {
        if (this[k].name === "Error") {
          return console.error(this.id, k, "Must be implement", this);
        }
      }, this);
      this.element.data("class", this);
      this.element.on("play", function(e) {
        return $(e.target).data("class").play.apply($(e.target).data("class"), [true]);
      });
      this.element.on("stop", function(e) {
        return $(e.target).data("class").stop.apply($(e.target).data("class"), [true]);
      });
      this.element.on("cancel", function(e) {
        return $(e.target).data("class").cancel().apply($(e.target).data("class"), [true]);
      });
    }

    error = function() {
      return console.error(this.id, "must be implement");
    };

    Viewer.prototype.first_init = Error;

    Viewer.prototype.full_init = Error;

    Viewer.prototype.play = Error;

    Viewer.prototype.stop = Error;

    Viewer.prototype.convertElement = Error;

    Viewer.prototype.cancel = function() {
      return rm.cancel(this);
    };

    Viewer.prototype.loadImage = function(src) {
      return rm.loadImage.apply(this, [src]);
    };

    Viewer.prototype.setTimeout = function(delay, callback) {
      return rm.setTimeout.apply(this, [this.delay, callback]);
    };

    return Viewer;

  })();

  this.Viewer = Viewer;

  SarineGallery = (function(_super) {
    __extends(SarineGallery, _super);

    function SarineGallery(options) {
      this.preloadAssets = __bind(this.preloadAssets, this);
      SarineGallery.__super__.constructor.call(this, options);
      this.isAvailble = true;
      this.resourcesPrefix = options.baseUrl + "atomic/v1/assets/";
      this.ImagesArr = [];
      this.atomConfig = configuration.experiences.filter(function(exp) {
        return exp.atomType === "SarineGallery";
      })[0];
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
        var firstImageName, src;
        firstImageName = _t.atomConfig.imagePattern.replace("*", "1");
        src = "" + configuration.rawdataBaseUrl + "/" + _t.atomConfig.imagesPath + "/" + configuration.jewelryId + "/gallery/" + firstImageName;
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
            _t.element.append(this.canvas);
            return defer.resolve(_t);
          }
        });
      });
      return defer;
    };

    SarineGallery.prototype.full_init = function() {
      var defer, i, index, name, _i, _j, _len, _ref, _ref1;
      defer = $.Deferred();
      if (this.isAvailble) {
        for (i = _i = 0, _ref = this.atomConfig.imageCount; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          this.ImagesArr.push(this.atomConfig.imagePattern.replace("*", i + 1));
        }
        this.imageList = this.element.find('.bxslider');
        this.thumbList = this.element.find('#bx-pager');
        _ref1 = this.ImagesArr;
        for (index = _j = 0, _len = _ref1.length; _j < _len; index = ++_j) {
          name = _ref1[index];
          this.fullSrc = "" + configuration.rawdataBaseUrl + "/" + this.atomConfig.imagesPath + "/" + configuration.jewelryId + "/gallery/" + name;
          this.imageName = "" + (name.replace(/\.[^/.]+$/, ''));
          this.imageExt = "" + (name.split('.').pop());
          this.thumbSrc = "" + configuration.rawdataBaseUrl + "/" + this.atomConfig.imagesPath + "/" + configuration.jewelryId + "/gallery/" + this.imageName + "." + this.imageExt;
          this.imageItem = "<li><img src='" + this.fullSrc + "' alt='" + this.imageName + "'/></li>";
          this.thumbItem = "<a data-slide-index='" + index + "' href=''><img src='" + this.thumbSrc + "' alt='" + this.imageName + "-thumb' /></a>";
          this.imageList.append(this.imageItem);
          this.thumbList.append(this.thumbItem);
        }
        this.imageList.bxSlider({
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
