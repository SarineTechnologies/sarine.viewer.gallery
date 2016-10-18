
/*!
sarine.viewer.gallery - v0.4.0 -  Tuesday, October 18th, 2016, 3:59:14 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineGallery,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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
