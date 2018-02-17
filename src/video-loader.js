(function(window, $, undefined) {
	var document = window.document,
		$document = $( document );

	/**
	 * Universal callback to load a video player iFrame into a modal window.
	 * 
	 * @param {Event} e
	 */
	function play_video( e ) {
		var $this = $( this ),
			video = this.getAttribute( 'data-embed' ),
			content = document.createElement( 'iframe' ),
			overlay = document.createElement( 'div' ),
			modal = document.createElement( 'div' ),
			closer = document.createElement( 'a' ),
			$overlay = $( overlay ), $modal = $( modal ), $closer = $( closer ),
			close_video;

		// Build out the iFrame that will contain our video player. We want the iFrame to be full-screen in this implementation.
		content.width = '100%';
		content.height = '100%';
		content.src = video;
		content.className = 'iframe_video';

		// Set up the styling for the modal overlay atop which the player will display.
		overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000;z-index: 159900;';

		// jQuery is used to set the overlay's opacity for cross browser-compatibility. Immediately wire close_video as a click
		// callback - we've declared the variable already so it's available, but we'll define the callback function itself later.
		$overlay.css( 'opacity', 0.7 ).on( 'click', close_video );

		// Set up the styling for the modal window in which the video plays.
		modal.style.cssText = 'position: fixed; top: 30px; left: 30px; right: 30px; bottom: 30px; background-color: #fff; z-index: 160000;';

		// Set up an anchor tag to serve as our close trigger. This tag, when clicked, will remove the video and overlay from the DOM.
		closer.className = 'iframe_close';
		closer.href = '#';
		closer.innerText = 'close';
		$closer.on( 'click', function( e ) { 
			e.preventDefault(); 
			close_video(); 
		} );
		modal.appendChild( closer );

		/**
		 * Define the close video callback. Both `$modal` and `$overlay` must be defined first before we can build out the function.
		 */
		close_video = function() {
			$modal.remove();
			$overlay.remove();
		};

		// Append our elements to the page
		modal.appendChild( content );
		document.appendChild( modal );

		console.log($overlay);
	}

	$document.on( 'click', '.iframe_play', play_video );

})(window, jQuery, undefined);