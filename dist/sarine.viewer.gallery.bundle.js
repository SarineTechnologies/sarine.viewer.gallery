
/*!
sarine.viewer.gallery - v0.4.0 -  Tuesday, October 18th, 2016, 3:59:14 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineGallery, Viewer,
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
      SarineGallery.__super__.constructor.call(this, options);
      this.ImagesPath = options.ImagesPath, this.ImageName = options.ImageName, this.ImageExtention = options.ImageExtention;
    }

    SarineGallery.prototype.convertElement = function() {
      this.canvas = $("<canvas>");
      this.ctx = this.canvas[0].getContext('2d');
      return this.element.append(this.canvas);
    };

    SarineGallery.prototype.first_init = function() {
      var defer, src, _t;
      defer = $.Deferred();
      _t = this;
      src = configuration.configUrl + this.ImagesPath + this.ImageName + this.ImageExtention;
      _t.loadImage(src).then(function(img) {
        _t.canvas.attr({
          'width': img.width,
          'height': img.height
        });
        _t.ctx.drawImage(img, 0, 0);
        return defer.resolve(_t);
      });
      return defer;
    };

    SarineGallery.prototype.full_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
      return defer;
    };

    SarineGallery.prototype.play = function() {};

    SarineGallery.prototype.stop = function() {};

    return SarineGallery;

  })(Viewer);

  this.SarineGallery = SarineGallery;

}).call(this);
