# LazyLoader

A simple lazy loader javascript library to enhance the webpage loading performance.

## To Do
* make item animate on load

## How It Works

The LazyLoader automatically waits for a scroll event at to load all images that use the attr['data-lazy']. LazyLoader additionally waits for click events on video elements with the class "iframe-play".


## Setup

1. Include jQuery 3+ and the LazyLoader library to your HTML.
```
<script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="./src/lazy-loader.js"></script>
```

2. Then call the LazyLoader to a variable.

```
// initiate LazyLoader
var LL = $LL();
```

3. In your HTML add all the images to your document using the following syntax:
```
<img src="./images/placeholder.png" data-lazy="./images/sample.jpg">
<a href="#" class="iframe-play" data-embed="https://www.youtube.com/embed/dvKeCcxD3rQ&autoplay=1">Click to Play Video</a>
```

4. You can also call LazyLoader as you need it like so:
```
// call on demand using jQuery
$("#playVideoByID").on("click", function() {

	// pass the ID of the video elm you want to play to the LazyLoader
	LL.playVideo("#playVideoByID");

});
```
