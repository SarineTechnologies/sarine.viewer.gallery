###!
sarine.viewer.gallery - v0.1.0 -  Tuesday, October 18th, 2016, 1:51:02 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class SarineGallery extends Viewer

	constructor: (options) -> 			
		super(options)				

	convertElement : () ->	
		@element
	        
	first_init : ()->
		defer = $.Deferred() 
		defer.resolve(_t)		
		defer

	full_init : ()-> 
		defer = $.Deferred() 
		defer.resolve(_t)		
		defer
		
	play : () -> return		
	stop : () -> return

@SarineSlider = SarineSlider
		
