const fs = require("fs"),
  request = require("request");
const download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    console.log("content-type:", res.headers["content-type"]);
    console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(`img/${filename}`))
      .on("close", callback);
  });
};

const limit =
  process.argv.slice(2)[0] == undefined ? 10 : process.argv.slice(2)[0];

for (let i = 0; i < limit; i++) {
  download(
    `https://picsum.photos/id/${i}/1920/1080`,
    `image-${i}.png`,
    function() {
      console.log(`${i} image downloaded.`);
    }
  );
}
