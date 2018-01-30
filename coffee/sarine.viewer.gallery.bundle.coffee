
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
  loadAssets : (resources, onScriptLoadEnd) ->
    # resources item should contain 2 properties: element (script/css) and src.
    if (resources isnt null and resources.length > 0)
      scripts = []
      for resource in resources
          ###element = document.createElement(resource.element)
          if(resource.element == 'script')
            $(document.body).append(element)
            # element.onload = element.onreadystatechange = ()-> triggerCallback(callback)
            element.src = @resourcesPrefix + resource.src + cacheVersion
            element.type= "text/javascript"###
          if(resource.element == 'script')
            scripts.push(resource.src + cacheVersion)
          else
            element = document.createElement(resource.element)
            element.href = resource.src + cacheVersion
            element.rel= "stylesheet"
            element.type= "text/css"
            $(document.head).prepend(element)
      
      scriptsLoaded = 0;
      scripts.forEach((script) ->
          $.getScript(script,  () ->
              if(++scriptsLoaded == scripts.length) 
                onScriptLoadEnd();
          )
        )

    return      
  setTimeout : (delay,callback)-> rm.setTimeout.apply(@,[@delay,callback]) 
    
@Viewer = Viewer 



class SarineGallery extends Viewer

	constructor: (options) -> 			
		super(options) 		
		@isAvailble = true
		@resourcesPrefix = options.baseUrl + "atomic/v1/assets/"	
		@ImagesArr = []
		@atomConfig = configuration.experiences.filter((exp)-> exp.atom == "jewelryGallery")[0] 
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
			firstImageName = _t.atomConfig.imagePattern.replace("*","1")    
			src = "#{configuration.rawdataBaseUrl}/#{_t.atomConfig.imagesPath}/#{configuration.jewelryId}/gallery/#{firstImageName}"
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
					defer.resolve(_t)
			)
		defer

	full_init : ()-> 
		defer = $.Deferred() 
		if @isAvailble
			for i in [0...@atomConfig.imageCount]
				@ImagesArr.push @atomConfig.imagePattern.replace("*",i + 1)
			@imageList = @element.find('.bxslider')
			@thumbList = @element.find('#bx-pager')
			for name, index in @ImagesArr 
				@fullSrc = "#{configuration.rawdataBaseUrl}/#{@atomConfig.imagesPath}/#{configuration.jewelryId}/gallery/#{name}"
				@imageName = "#{name.replace(/\.[^/.]+$/,'')}"
				@imageExt = "#{name.split('.').pop()}"
				@thumbSrc = "#{configuration.rawdataBaseUrl}/#{@atomConfig.imagesPath}/#{configuration.jewelryId}/gallery/#{@imageName}.#{@imageExt}"
				@imageItem = "<li><img src='#{@fullSrc}' alt='#{@imageName}'/></li>"
				@thumbItem = "<a data-slide-index='#{index}' href=''><img src='#{@thumbSrc}' alt='#{@imageName}-thumb' /></a>"
				@imageList.append(@imageItem)
				@thumbList.append(@thumbItem)
			
			@imageList.bxSlider({
				pagerCustom: '#bx-pager',
				controls: false
			}); 
		
		defer.resolve(@)		
		defer
		
	play : () -> return		
	stop : () -> return

@SarineGallery = SarineGallery
		


