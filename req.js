var request = require('request');
var url = `https://www.apiopen.top/satinGodApi?type=1&page=1`;

var strurl = encodeURI(url);
request(strurl, function(error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
});