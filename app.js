var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(`img/${filename}`)).on('close', callback);
  });
};
for(let i = 0; i < 1000;i++){
  download(`https://picsum.photos/id/${i}/1920/1080`, `image-${i}.png`, function(){
    console.log(`${i} image downloaded.`);
  });
}
