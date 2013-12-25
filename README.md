# The-Web-Panel
=============

HTML5's WebRTC and MediaSource APIs make it possible to perform functions which were earlier not feasible from the browser. This panel has some cool features for which you would never have to open your command prompt again. Open the browser and Voila.

#MediaSource API

## What is MediaSource?

In a Nutshell, Media Source API does the following two things:
Get the video as binary data and append to the video source.
* Full JS control of the video stream
* Ideal for adaptive streaming, time shifting and video preprocessing

## Modus Operandi
There are three ways of getting append able stream of data.
* Websocket
* XHR
* Direct input of binary stream
The response type has to be arraybuffer.

## Core API Code

```
Var mediaSource = new MediaSource();
Var sourceBuffer;
MediaSource.addEventListener(‘sourceopen’, function(e){
sourceBuffer = mediaSource.addSourceBuffer(‘video/webm;codecs=”vp8, vorbis”’);}, false);
video.src = window.URL.createObjectURL(mediaSource);
sourceBuffer.append(data)
```

## Analysis
Entry Points to the API
```
1. XHR – The Cross origin request rules will be applied in this scenario. If access-control-allow-origin header is used, then the data can be fetched and appended.
2. Websockets – Origin based checks can be made for additional security.
3. Directly fetching data – Very unlikely that data would be fetched using this mechanism, however if a javascript file containing data is fetched from a server, then there is no blocker.
```

## Chrome Browser Testing
```
1. Is MediaSource API is accessible from sandboxed iframe?	
Yes

2. Does MediaSource API follow same-origin-policy?
No, origin based control lies above the MediaSource API

3. Is it possible to fetch the data from an insecure channel, when the source origin is secure? HTTPS/HTTP mismatch	Yes, either CORS is allowed or it’s directly being loaded using a script tag otherwise no.

4. Are the mediaSource buffer cached. If Yes, are they removed automatically?
No, they are not removed automatically. Currently the specification has mentioned about the Buffer remove API’s however they don’t seem to have been implemented in the latest version of Chrome. To handle this Chrome continues to increase the memory till a certain limit 800K and then starts deallocating memory to ensure that it doesn’t crash. 
```

# GetUserMedia API
With navigator.getUserMedia() API the webcam, microphone or any streamed data can be accessed by the media elements without the need of a separate plugin. It’s part of the greater WebRTC project which will enable real-time video/audio/data connections from within the browser.

## Setting things in Chrome
* Chrome://Flags – enable Media Source API (Enabled by default after Chrome 21)
* navigator.webkitGetUserMedia()

## Setting up in Firefox
* Firefox for Desktop supports navigator.mozGetUserMedia().
* mozGetUserMedia is still preffed off by default,  browse to about:config and set media.navigator.enabled to true (it’s a boolean)

1. Are different permissions given for various features in a normal browsing context also valid in a sandboxed context or vice-versa?
For Chrome - No, We need to set the permission again for both contexts
For Firefox - Very Interesting behaviour inside a sandbox, details of the test below

Setup
```
Parent Page – parent.html
Iframed page(Different Origin) – iframed.html(This page captures the data from webcam using localmediastream object and passes it to the video element)

Case 1
Parent.html has iframed iframed.html using sandbox with attributes “allow-scripts” and allow-same-origin”

Observation
Expected - The origin of iframed.html should be displayed for getting user permissions for webcam and microphone.

Actual – parent.html origin is displayed for getting user permissions for access

Case 2
Parent.html has iframed iframed.html using sandbox with attributes “allow-scripts” only

Expected – Since the allow-same-origin is not set, the origin has to be NULL. Document.domain = “”, the request has to be denied (Works perfectly in Chrome)

Actual
Even though document.domain=””, the origin of parent.html shows the permission bar and allows access.
```

2	Are different permissions given for various features in a normal browsing context also valid in a private browsing mode context or vice-versa?
```
For Chrome - No, We need to set the permission again for both contexts	
For Firefox - No, We need to set the permission again for both contexts
```
3	Is MediaStream API is accessible from sandboxed iframe?	
```
For Chrome - Yes
For Firefox - Yes
```
4	Does MediaStream API follow same-origin-policy?	
```
For Chrome - Yes
For Firefox - Yes
```

# IP FINDER
Thanks to Einar Otto Stangvik

Multiple browser mean different browsing profiles. Both browsers will have same public IP address however their headers and tracking cookies will be different. With the WebRTC local IP discovery technique, those interested in tracking you, be that ad agencies or some spy organization, will be able to do make connections between browsers based on a combination of public and local IP. This can lead to significant privacy issues.



