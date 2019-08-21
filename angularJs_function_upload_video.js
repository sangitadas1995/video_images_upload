function uploadVideo(FILECONFIG, CONFIG, count, $http, $scope, $cookies, start) {

    if (count < fileArray.length) {
        var next_slice = start + slice_size + 1;
        file = fileArray[count];
        var blob = file.slice(start, next_slice);
        if (fileNameArr[count] == undefined || fileNameArr[count] == "") {
            var d = new Date();
            var currFileName = file.name;
            var currFileNameArray = currFileName.split(".");
            var newFileName = "post_" + d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + "_" + (Math.random() * 20) + "." + (currFileNameArray[(currFileNameArray.length) - 1]);

            fileNameArr.splice(count, 0, newFileName);
            fileTypeArr.splice(count, 0, file.type);
            reader = new FileReader();
        }
        reader.onloadend = function (event) {
            if (event.target.readyState !== FileReader.DONE) {
                return;
            }
            $scope.currUppFile = (count + 1);
            var postform = new FormData();
            postform.append("media", event.target.result);
            postform.append("filename", fileNameArr[count]);
            postform.append("filetype", fileTypeArr[count]);
            $http.post(MODELUPLOAD, postform, FILECONFIG).then(function (response) {
                console.log(response.data);
                if (response.data.result == "success") {
                    if (next_slice < file.size) {
                        var size_done = start + slice_size;
                        var percent_done = Math.floor((size_done / file.size) * 100);
                        $scope.upPercentage = percent_done;
                        uploadFile(FILECONFIG, CONFIG, count, $http, $scope, $cookies, next_slice);
                    } else {
                        $scope.upPercentage = 100;
                        count++;
                        uploadFile(FILECONFIG, CONFIG, count, $http, $scope, $cookies, 0);
                    }
                }
            })
        };
        reader.readAsDataURL(blob);
    } else {
        console.log("File Upload Complete");
        console.log(fileNameArr);
        console.log(fileTypeArr);
      
    }

}





//////////////////////////////// call funtion in html//////////////////////////


var fileTotal = 0;

function readFile(input) {

    $("#status").html('Processing...');
    counter = input.files.length;

    //var fileArray     =   [];

    for (x = 0; x < counter; x++) {

        if (input.files && input.files[x]) {

            fileArray.push(input.files[x]);

            var reader = new FileReader();

            var fileTypeAll = input.files[x].type;
            var fileType = fileTypeAll.split("/");

            if (fileType[0] == "image") {
                reader.onload = function (e) {
                    //var idValue       =   Math.floor((Math.random() * 1000) + 1);
                    var html = '';
                    html += '<div class="col-md-2 col-sm-3 col-xs-3" id="divId' + fileTotal + '">';
                    html += '<div style="position:absolute; margin-left:82px; background:#ded8d8; border-radius:100%; width:15px; text-align:center; margin-top:1px;"><a href="javascript:void(0);" id="remove' + fileTotal + '" onclick="removeMediaItem(' + fileTotal + ')">X</a></div>';
                    html += '<img src="' + e.target.result + '" class="img-thumbnail" style="height:100px">';
                    //$("#photos").append('<div class="col-md-3 col-sm-3 col-xs-3" id="divId'+idValue+'"><img src="'+e.target.result+'" class="img-thumbnail"><a href="#" id="remove'+idValue+'">X</a></div>');
                    html += '</div>';
                    $("#photos").append(html);
                    fileTotal++;
                };

                reader.readAsDataURL(input.files[x]);
            } else if (fileType[0] == "video") {
                var idValue = Math.floor((Math.random() * 1000) + 1);
                var html = '';
                html += '<div class="col-md-2 col-sm-3 col-xs-3" id="divId' + fileTotal + '">';
                html += '<div style="position:absolute; margin-left:82px; background:#ded8d8; border-radius:100%; width:15px; text-align:center; margin-top:2px;"><a href="#" id="remove' + fileTotal + '" onclick="removeMediaItem(' + fileTotal + ')">X</a></div>';
                html += '<img src="images/download.png" class="img-thumbnail" style="height:100px">';
                html += '</div>';
                $("#photos").append(html);
                fileTotal++;
            }
        }
    }

    //console.log(fileArray);

    if (counter == x) {
        $("#status").html('');
    }
}


// ///////////////////////////////////get image 
function getImage(input) {
    file = [];
    file.push(input.files[0]);
    console.log(file);


}