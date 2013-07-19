$(document).ready(function() {
	$("#instagram").on('pageinit',function(){
		$(function() {
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: "https://api.instagram.com/v1/media/popular?client_id=1003d9b3eaf04af8b8a649fd90936a32",
				success: function(data) {
					for (var i=0; i<10; i++) {
						$('#photos').append("<a target='_blank' href='" + data.data[i].link +"'><img style='padding:5px' src='" + data.data[i].images.thumbnail.url +"' /></a>");   
					}
				}
			});
		});
		$('#instaRefresh').on('click', function(){window.location.reload(true)})
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
});