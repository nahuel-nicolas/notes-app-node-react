const http = require("http");
// const url = require("url");
// const StringDecoder = require("string_decoder").StringDecoder;
// const util = require("util");
// const formidable = require("formidable");

const server = http.createServer(function(req, resp) {
    console.log(req)
    console.log('hi world')
    console.log(typeof req)
    console.log(Object.keys(req))
    console.log(req.url)
    resp.writeHead(200, 'OK', {'Content-Type': 'text/plain'})

    if (req.url == '/notes/' || req.url == '/notes') {
        console.log('notes endpoint')

        const current_res = http.get('http://127.0.0.1:8000/notes/', res => {
            let data = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                console.log('Response ended: ');
                const notes = JSON.parse(Buffer.concat(data).toString());
                // console.log([notes, 'nba'])
                // for (const user of users) {
                //     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
                // }
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
        });

        console.log([current_res.data, current_res, 'nbx'])
        resp.write("Notes")
    } else {
        resp.write("Hi world")
    }
    resp.end("\nEnd of message")
});

server.listen(1234, function() {
  console.log("Listening on port 1234");
});