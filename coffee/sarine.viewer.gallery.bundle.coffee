###!
sarine.viewer.gallery - v0.4.0 -  Tuesday, October 18th, 2016, 3:59:14 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###

class Viewer
  rm = ResourceManager.getInstance();
  constructor: (options) ->
    console.log("")
    @first_init_defer = $.Deferred()
    @full_init_defer = $.Deferred()
    {@src, @element,@autoPlay,@callbackPic} = options
    @id = @element[0].id;
    @element = @convertElement()
    Object.getOwnPropertyNames(Viewer.prototype).forEach((k)-> 
      if @[k].name == "Error" 
          console.error @id, k, "Must be implement" , @
    ,
      @)
    @element.data "class", @
    @element.on "play", (e)-> $(e.target).data("class").play.apply($(e.target).data("class"),[true])
    @element.on "stop", (e)-> $(e.target).data("class").stop.apply($(e.target).data("class"),[true])
    @element.on "cancel", (e)-> $(e.target).data("class").cancel().apply($(e.target).data("class"),[true])
  error = () ->
    console.error(@id,"must be implement" )
  first_init: Error
  full_init: Error
  play: Error
  stop: Error
  convertElement : Error
  cancel : ()-> rm.cancel(@)
  loadImage : (src)-> rm.loadImage.apply(@,[src])
  setTimeout : (delay,callback)-> rm.setTimeout.apply(@,[@delay,callback]) 
    
@Viewer = Viewer 

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
		


