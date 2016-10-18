###!
sarine.viewer.gallery - v0.4.0 -  Tuesday, October 18th, 2016, 3:59:14 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class SarineGallery extends Viewer

	constructor: (options) -> 			
		super(options) 
		{@ImagesPath, @ImageName, @ImageExtention} = options				

	convertElement : () ->	
		@canvas = $("<canvas>")		
		@ctx = @canvas[0].getContext('2d')
		@element.append(@canvas)
	        
	first_init : ()->
		defer = $.Deferred() 
		_t = @
		src = configuration.configUrl + @ImagesPath + @ImageName + @ImageExtention
		_t.loadImage(src).then((img)->
			_t.canvas.attr {'width':img.width, 'height': img.height}
			_t.ctx.drawImage img , 0 , 0 			
			defer.resolve(_t) 				
		)  
		defer

	full_init : ()-> 
		defer = $.Deferred() 
		defer.resolve(@)		
		defer
		
	play : () -> return		
	stop : () -> return

@SarineGallery = SarineGallery
		
