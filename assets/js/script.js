$(window).load(function(){
	
	var imgPath = "assets/img/";
	
	// Let's pull the query strings and get them set for parsing / assign to variables.
	const queryString = window.location.search;
	console.log(queryString);
	var line1;
	var line2;
	var subtitle;
	if (queryString === "")
	{
		console.log("queryString is EMPTY!");
		line1 = window.prompt("Please enter the first line (up to about 35 characters):", "This sentence is about 35 characters." );
		console.log(line1);
		line2 = window.prompt("Please enter the second line (up to about 35 characters):", "This sentence is about 35 characters.");
		subtitle = window.prompt("Enter the subtitle text for below the headline:", "This can be a bit longer. The text wraps. It's magic.");
		// OK, now let's push this to the URL
		const params = new URLSearchParams(location.search);
		params.set('line1', line1);
		params.set('line2', line2);
		params.set('subtitle', subtitle);
		params.toString();
		window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
	}
	else //push the parameters into variables
	{
		const params = new URLSearchParams(window.location.search);
		line1 = params.get('line1');
		line2 = params.get('line2');
		subtitle = params.get('subtitle');
	}
	
	
	//if(
	//const urlParams = new URLSearchParams(queryString);
	
	
	// Define 6 paper covers:
	
	
	//var papers = [
		//{
		//	line1:"This is how long a text line can be",
		//	line2:"chrisis is a hoax!",
		//	subtitle:"123456789 123456789 1234 87658756"
		//}, {
		//	line1:"Deeply fried now",
		//	line2:"considered healthy",
		//	subtitle:"Scientists change the definition of \"Healthy\" 12341234"
		//}
	//];

	// Check whether canvas and CSS3 animations are supported:

	if(!$.support.canvas){
		$('#fin').html('Sorry, your browser does not<br />support &lt;canvas&gt;').show();
		return;
	}
	
	if(!$.support.css3Animation){
		$('#fin').html('Sorry, your browser does not<br />support CSS3 Animations').show();
		return;
	}
	
	// Use jQuery.Deferred to bind a callback when all
	// the images that comprise the paper are loaded:
	
	$.when(
	
		loadImage(imgPath+"paper_center.jpg"),
		
	).then(function( imgCenter ){
		
		// Loop through the paper covers and
		// create a new canvas for each one:
		
		//$.each(papers,function(i){
			
			var canvas	= document.createElement("canvas"),
				c		= canvas.getContext("2d");
		
			canvas.width = 1000;
			canvas.height = 700;

			c.drawImage( imgCenter, 0, 0 );
			
			// Drawing the text using our helper
			// function (see at the bottom):
			
			drawText( line1, line2, c, 500, 270 );
			
			drawSubtitle( subtitle, c, 565, 380 );
			
			// Appending the element to the page.
			// This triggers the CSS3 animation.
			
			setTimeout(function(){
				$("body").append(canvas);
			},0);//5800);
			
		//});

	});

	
	/*------------------------
		Helper functions
	------------------------*/
	

	// Load an image by URL and resolve a jQuery.Deferred:
	
	function loadImage(src){
		
		var def = new $.Deferred(),
			img = new Image();
		
		img.onload = function(){
			
			//	Resolve the deferred. The img parameter
			//	will be available in the then function:
			
			def.resolve(img);
		}
		
		// Always set the src attribute
		// after the onload callback:
		
		img.src = src;
		
		return def.promise();
	}
	
	// Draw two lines of text and a subtitle
	// on the canvas (passed as the c param):
	
	function drawText( line1, line2, c, x, y ){
		
		c.font = "65px Anton,Calibri";
		c.textAlign = "center";
		c.fillStyle = "#252525";
		
		c.fillText(line1.toUpperCase(),x,y);
		c.fillText(line2.toUpperCase(),x,y+80);
		
	}
	
	function drawSubtitle ( subtitle, c, x, y ){
		
		c.textAlign = "center";
		c.font = "italic 20px Georgia,serif";
		c.fillStyle = "#252525";
		"use strict";
		
		var chunks = subtitle.split(" ");
		var thisLine = "";
		var lineLength=0;
		var lineNumber=0;

		chunks.forEach(function(i,xx) {
			lineLength = lineLength + i.length;
				console.log(i);
				console.log(lineLength);
				console.log(thisLine);
				console.log(lineNumber);
				console.log(" ");
			if(lineLength>=25) //line's exceeded the length, so push out the existing line and reset things.
			{
				console.log("length exceeded, pushing line and resetting numbers:");

				console.log(thisLine);
				c.fillText(thisLine,x,y+lineNumber);
				console.log(lineNumber);
				thisLine=i;
				lineNumber=lineNumber+25;
				lineLength=i.length;
			}
			else
			{
				thisLine = thisLine + " " + i;
			}
			
		});
		c.fillText(thisLine,x,y+lineNumber); //push out the last line
		
	}

});

(function(){
	
	// Adding custom checks for canvas and css3
	// animations support, to the jQuery.support object:
	
	$.support.canvas = 'getContext' in document.createElement('canvas');
	
	$.support.css3Animation = (function(){
		var sp = $('<span>');
		
		return (
			sp.css("-webkit-animation") !== undefined	||
			sp.css("-moz-animation") !== undefined		||
			sp.css("animation") !== undefined
		);
		
	})();
})();