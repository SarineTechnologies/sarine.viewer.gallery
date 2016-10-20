###!
sarine.viewer.gallery - v0.4.0 -  Thursday, October 20th, 2016, 10:33:11 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class SarineGallery extends Viewer

	constructor: (options) -> 			
		super(options) 
		{@ImagesPath, @ImagesArr, @ImageExtention} = options
		@isAvailble = true
		@resourcesPrefix = options.baseUrl + "atomic/v1/assets/"	
		@resources = [
	      {element:'script',src:'jquery.bxslider.min.js'},
	      {element:'link',src:'jquery.bxslider.css'}
	    ]					

	convertElement : () ->	
		@ul = $("<ul class='bxslider'>")
		@div = $("<div id='bx-pager'>")
		@element.append(@div)
		@element.append(@ul)
		
	preloadAssets: (callback)=>

	    loaded = 0
	    totalScripts = @resources.map (elm)-> elm.element =='script'
	    triggerCallback = (callback) ->
	      loaded++
	      if(loaded == totalScripts.length-1 && callback!=undefined )
	        setTimeout( ()=> 
	          callback() 
	        ,500) 

	    element
	    for resource in @resources
	      element = document.createElement(resource.element)
	      if(resource.element == 'script')
	        $(document.body).append(element)
	        element.onload = element.onreadystatechange = ()-> triggerCallback(callback)
	        element.src = @resourcesPrefix + resource.src + cacheVersion
	        element.type= "text/javascript"

	      else
	        element.href = @resourcesPrefix + resource.src + cacheVersion
	        element.rel= "stylesheet"
	        element.type= "text/css"
	        $(document.head).prepend(element) 

	first_init : ()->
		defer = $.Deferred() 

		@element.append()
		_t = @
		@preloadAssets ()->
			src = configuration.configUrl + _t.ImagesPath + _t.ImagesArr[0]  + _t.ImageExtention
			_t.loadImage(src).then((img)->
				if img.src.indexOf('data:image') == -1 && img.src.indexOf('no_stone') == -1			
					defer.resolve(_t)
				else
					_t.isAvailble = false
					_t.element.empty()
					@canvas = $("<canvas>")		
					@canvas[0].width = img.width
					@canvas[0].height = img.height
					@ctx = @canvas[0].getContext('2d')
					@ctx.drawImage(img, 0, 0, img.width, img.height)
					@canvas.attr {'class' : 'no_stone'}					
					_t.element.append(@canvas)
			)
		defer

	full_init : ()-> 
		defer = $.Deferred() 
		if @isAvailble
			@imageList = @element.find('.bxslider')
			@thumbList = @element.find('#bx-pager')
			for name, index in @ImagesArr
				@fullSrc = configuration.configUrl + @ImagesPath + name + @ImageExtention
				@thumbSrc = configuration.configUrl + @ImagesPath + name + '-thumb' + @ImageExtention
				@imageItem = '<li><img src="' + @fullSrc + '" alt="' + name + '" /></li>'
				@thumbItem = '<a data-slide-index="'+ index + '" href=""><img src="' + @thumbSrc + '" alt="' + name + '-thumb" /></a>'
				@imageList.append(@imageItem)
				@thumbList.append(@thumbItem)
			
			$('.bxslider').bxSlider({
				pagerCustom: '#bx-pager',
				controls: false
			}); 
		
		defer.resolve(@)		
		defer
		
	play : () -> return		
	stop : () -> return

@SarineGallery = SarineGallery
		
