function mediastreamplayer( )
{
	//var type = "video/mp4" + '; codecs="' + "avc1.4d401f" + '"';
	var type = "video/mp4" + '; codecs="' + "avc1.4d4028" + '"'
	
	//var type = "video/mp2t" + '; codecs="' + "avc1.42c01f" + '"'
	var mediasourceobj ;
	var sourcebuffer ;
	var URL = window.URL || window.wekitURL;
    if(window.WebKitMediaSource != null){
        window.MediaSource = window.WebKitMediaSource;
    }
    var MSE = new window.MediaSource();
	var video = document.querySelector('video');
	video.src = URL.createObjectURL(MSE);

    MSE.addEventListener('webkitsourceopen', onOpenSource, false);
	MSE.addEventListener('sourceopen', onOpenSource, false);

	MSE.addEventListener('webkitsourceended', onSourceEnded);
	MSE.addEventListener('sourceended', onSourceEnded, false);
	function onOpenSource( mediaSource )
	{
		mediasourceobj =  mediaSource.target ;
		sourcebuffer = mediasourceobj.addSourceBuffer(type);
		playvideo( );
	}
	 function onSourceEnded(e)
	 {
		console.log('source end');
	 }
	 var xx = 0 ;
	 this.playDirect = function( data)	
	 {
	  console.log("play");
			sourcebuffer.append(data);
		video.play();
	 	for( var i = 0 ; i < data.length ;i++)
	 	{
	 		
	 	
	 		globalarray[globalindex++] =  data[i];
	 	}
	 	xx++ ;
	}

 
}



