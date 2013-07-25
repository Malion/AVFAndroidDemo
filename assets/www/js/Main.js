//Instagram Page Load
$("#instagram").on("pageinit", function(){
	//Get Instagram popular photos
	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/media/popular?client_id=1003d9b3eaf04af8b8a649fd90936a32",
		success: function(data) {
			//Variable for maximum height of pop-up window
			var maxHeight = $(window).height() - 60 + "px";
			//empty string for html injection
			html = '';
			page = '';
			//Loop for 
			for (var i=0; i<data.data.length; i++) {
				if(i%2 == 0){
					html += '<li>';
					html += '<a href="#'+data.data[i].id+'" data-rel="dialog" data-transition="pop">';
					html += '<img src="'+data.data[i].user.profile_picture+'" />';
					html += '<h3>Posted By: '+JSON.stringify(data.data[i].user.full_name)+'</h3>';
					html += '<p>Caption: '+JSON.stringify(data.data[i].caption.text)+'</p>';
					html += '</a>';
					html += '<a href="#'+data.data[i].id+'iframe"></a>';
					html += '</li>';
				} else {
					html += '<li data-theme="b">';
					html += '<a href="#'+data.data[i].id+'" data-rel="dialog" data-transition="pop">';
					html += '<img src="'+data.data[i].user.profile_picture+'" />';
					html += '<h3>Posted By: '+JSON.stringify(data.data[i].user.full_name)+'</h3>';
					html += '<p>Caption: '+JSON.stringify(data.data[i].caption.text)+'</p>';
					html += '</a>';
					html += '<a href="'+data.data[i].link+'"></a>';
					html += '</li>';
				}
				page += '<div data-role="page" id="'+data.data[i].id+'" class="photopopup" data-theme="a">';
				page += '<div data-role="header" data-position="fixed"><h1>Comments</h1></div>';
				page += '<div data-role="content">';
				page += '<img style="max-height:'+maxHeight+'" src="'+data.data[i].images.standard_resolution.url+'" />';
				page += '<ul data-role="listview">';
				$.each(data.data[i].comments.data, function(k, n){
					if(k%2 == 0){
						page += '<li>';
						page += '<a href="'+data.data[i].link+'">';
						page += '<img width:100% height:auto style="margin-left:auto; margin-right:auto" src="'+n.from.profile_picture+'" />';
						page += '</a>';
						page += '<h3>'+JSON.stringify(n.from.full_name)+'</h3>';
						page += '<p>'+n.text+'</p>';
						page += '</li>';
					} else {
						page += '<li data-theme="b">';
						page += '<a href="'+data.data[i].link+'">';
						page += '<img src="'+n.from.profile_picture+'" />';
						page += '</a>';
						page += '<h3>'+JSON.stringify(n.from.full_name)+'</h3>';
						page += '<p>'+n.text+'</p>';
						page += '</li>';
					}
				})
				page += '</ul></div></div>';
			}
			$('#photos').append(html)
			$('#mainbody').append(page)
			$('#photos').listview('refresh');
		}
	});
});
$("#flickr").on('pageinit', function(){
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",{
		tagmode: "any",
		format: "json"
	},
	function(data) {
		for(var i=0; i<10; i++){
			$('#flickrPhotos').append("<a target='_blank' href='" + data.items[i].link +"'><img style='padding:5px' src='" + data.items[i].media.m +"' /></a>");
		}
	});
	$('#flickrRefresh').on('click', function(){window.location.reload(true)})
})
$(document).on('pageinit', '#camera', function(){
		navigator.camera.getPicture(success, fail, { quality: 50,destinationType: Camera.DestinationType.DATA_URL});
		function success(data) {
    		var image = document.getElementById('cameraImage');
    		image.src = "data:image/jpeg;base64," + data;
		}
		function fail(data) {
    		alert('Taking a picture failed because: ' + data);
		}
})
$('#geobtn').on('click', function(){
	var onSuccess = function(position) {
	    alert('Latitude: '          + position.coords.latitude          + '\n' +
	          'Longitude: '         + position.coords.longitude         + '\n' +
	          'Altitude: '          + position.coords.altitude          + '\n' +
	          'Accuracy: '          + position.coords.accuracy          + '\n' +
	          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	          'Heading: '           + position.coords.heading           + '\n' +
	          'Speed: '             + position.coords.speed             + '\n' +
	          'Timestamp: '         + position.timestamp                + '\n');
		};
		function onError(error) {
    		alert('code: '    + error.code    + '\n' +
         	 	'message: ' + error.message + '\n');
		}
		navigator.geolocation.getCurrentPosition(onSuccess, onError, {maximumAge: 3000,
			timeout: 5000, enableHighAccuracy: true});
})