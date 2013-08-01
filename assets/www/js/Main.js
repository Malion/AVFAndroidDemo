function onDeviceReady() {
    //Instagram Page Load
    $("#instagram").on("pageinit", function () {
        //Get Instagram popular photos
        $("#instaRefresh").on('click', function () {
            mypull;
        });

        function checkConnection() {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            var myconfirm = confirm("You are currently using a " + states[networkState] + " do you wish to continue?");
            if (myconfirm) {
                return true;
            } else {
                window.location.assign("#home");
                return false;
            }
        }
        if (checkConnection()) {
            mypull;
        }
        var mypull = $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: "https://api.instagram.com/v1/tags/puppy/media/recent?client_id=1003d9b3eaf04af8b8a649fd90936a32",
            success: function (data) {
                //Variable for maximum height of pop-up window
                var maxHeight = $(window).height() - 60 + "px";
                //empty string for html injection
                html = '';
                page = '';
                //Loop for 
                for (var i = 0; i < data.data.length; i++) {
                    if (i % 2 === 0) {
                        console.log("Start building list item " + i)
                        html += '<li>';
                        console.log("Build link to pop up")
                        html += '<a href="#' + data.data[i].id + '" data-rel="dialog" data-transition="pop">';
                        console.log("Add profile picture to list item " + i)
                        html += '<img src="' + data.data[i].user.profile_picture + '" />';
                        if (data.data[i].user.full_name !== null || data.data[i].user.full_name !== undefined) {
                            console.log("Add name to list item a-" + i)
                            console.log(JSON.stringify(data.data[i].user.full_name))
                            html += '<h3>Posted By: ' + JSON.stringify(data.data[i].user.full_name) + '</h3>';
                        }
                        console.log(data.data[i].link)
                        if (data.data[i].caption.text !== null || data.data[i].caption.text !== undefined) {
                            console.log("Add caption text to list item " + i)
                            html += '<p>Caption: ' + JSON.stringify(data.data[i].caption.text) + '</p>';
                        }
                        html += '</a>';
                        console.log("Add link to instagram to list item " + i)
                        html += '<a href="' + data.data[i].link + '"></a>';
                        html += '</li>';
                    } else {
                        console.log("Start building list item " + i)
                        html += '<li data-theme="b">';
                        console.log("Build link to pop up")
                        html += '<a href="#' + data.data[i].id + '" data-rel="dialog" data-transition="pop">';
                        console.log("Add profile picture to list item " + i)
                        html += '<img src="' + data.data[i].user.profile_picture + '" />';
                        if (data.data[i].user.full_name !== null || data.data[i].user.full_name !== undefined) {
                            console.log("Add name to list item b-" + i)
                            console.log(JSON.stringify(data.data[i].user.full_name))
                            html += '<h3>Posted By: ' + JSON.stringify(data.data[i].user.full_name) + '</h3>';
                        }
                        console.log(data.data[i].link)
                        if (data.data[i].caption.text !== null || data.data[i].caption.text !== undefined) {
                            console.log("Add caption text to list item " + i)
                            html += '<p>Caption: ' + JSON.stringify(data.data[i].caption.text) + '</p>';
                        }
                        html += '</a>';
                        console.log("Add link to instagram to list item " + i)
                        html += '<a href="' + data.data[i].link + '"></a>';
                        html += '</li>';
                    }
                    console.log("Build pop-up page for list item " + i)
                    page += '<div data-role="page" id="' + data.data[i].id + '" class="photopopup" data-theme="a">';
                    console.log("Add header div to pop up for list item " + i)
                    page += '<div data-role="header" data-position="fixed"><h1>Comments</h1></div>';
                    console.log("Add content div to popup for list item" + i)
                    page += '<div data-role="content">';
                    console.log("Add image into pop up for list item" + i)
                    page += '<img style= "max-height:' + maxHeight + '; max-width:100%" src="' + data.data[i].images.standard_resolution.url + '" />';
                    console.log("Add unordered list element to popup for comments and list item " + i)
                    page += '<ul data-role="listview">';
                    if (data.data[i].comments.data.length === 0) {
                        page += '<li>';
                        page += '<h3>There are no comments for this picture!</h3>';
                        page += '</li>';
                    }
                    $.each(data.data[i].comments.data, function (k, n) {
                        if (k % 2 === 0) {
                            console.log("Add list item to unordered list for comment " + k)
                            page += '<li>';
                            console.log("Add link to instagram for comment " + k)
                            page += '<a href="' + data.data[i].link + '">';
                            console.log("Add profile picture for comment " + k)
                            page += '<img width:100% height:auto style="margin-left:auto; margin-right:auto" src="' + n.from.profile_picture + '" />';
                            page += '</a>';
                            console.log("Add commenters name to comment for comment " + k)
                            page += '<h3>' + JSON.stringify(n.from.full_name) + '</h3>';
                            console.log("Add comment to list item for comment" + k)
                            page += '<p>' + n.text + '</p>';
                            page += '</li>';
                        } else {
                            console.log("Add list item to unordered list for comment " + k)
                            page += '<li data-theme="b">';
                            console.log("Add link to instagram for comment " + k)
                            page += '<a href="' + data.data[i].link + '">';
                            console.log("Add profile picture for comment " + k)
                            page += '<img width:100% height:auto style="margin-left:auto; margin-right:auto" src="' + n.from.profile_picture + '" />';
                            page += '</a>';
                            console.log("Add commenters name to comment for comment " + k)
                            page += '<h3>' + JSON.stringify(n.from.full_name) + '</h3>';
                            console.log("Add comment to list item for comment" + k)
                            page += '<p>' + n.text + '</p>';
                            page += '</li>';
                        }
                    })
                    console.log("Close all tags")
                    page += '</ul></div></div>';
                }
                console.log("Append all data to page to build the page.")
                $("#instaError").hide();
                $("#instaRefresh").hide();
                $('#photos').append(html)
                $('#mainbody').append(page)
                $('#photos').listview('refresh');
            }
        });
    });
    $("#flickr").on('pageinit', function () {
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
                tagmode: "any",
                format: "json"
            },
            function (data) {
                for (var i = 0; i < 10; i++) {
                    $('#flickrPhotos').append("<a target='_blank' href='" + data.items[i].link + "'><img style='padding:5px' src='" + data.items[i].media.m + "' /></a>");
                }
            });
        $('#flickrRefresh').on('click', function () {
            window.location.reload(true)
        })
    })
    $('#conbtn').on('click', function () {
        function checkConnection() {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';
            alert('Connection type: ' + states[networkState]);
        }
        checkConnection();
    });
    $('#compbtn').on('click', function () {
        function onSuccess(heading) {
            alert('Heading: ' + heading.magneticHeading);
        };

        function onError(error) {
            alert('CompassError: ' + error.code);
        };
        navigator.compass.getCurrentHeading(onSuccess, onError);
    })
    $(document).on('pageinit', '#camera', function () {
        navigator.camera.getPicture(success, fail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function success(data) {
            var image = document.getElementById('cameraImage');
            image.src = "data:image/jpeg;base64," + data;
        }

        function fail(data) {
            alert('Taking a picture failed because: ' + data);
        }
    })
    $('#geobtn').on('click', function () {
		$('#geoframe').css('display','block');
		function initialize() {
			var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById('geoframe'),mapOptions);
		}

		google.maps.event.addDomListener(window, 'load', initialize);


		$('#geolist').listview().listview('refresh');

		function onSuccessGeo(position) {


			var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map  = new google.maps.Map(document.getElementById('geoframe'), {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: myLocation,
				zoom: 15
			});

			var marker = new google.maps.Marker({
				position: map.getCenter(),
				map: map,
				title: 'Click to zoom'
			});

			navigator.geolocation.clearWatch(watchId);
			watchId=null;
			
		}

		function onErrorGeo(error){

		}

		var watchId = navigator.geolocation.watchPosition(onSuccessGeo, onErrorGeo, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    });
};
document.addEventListener("deviceready", onDeviceReady, false);