const http = require("http");
// const url = require("url");
// const StringDecoder = require("string_decoder").StringDecoder;
// const util = require("util");
// const formidable = require("formidable");

const server = http.createServer(function(req, resp) {
    // console.log(req)
    // console.log('hi world')
    // console.log(typeof req)
    // console.log(Object.keys(req))
    // console.log(req.url)
    

    if (req.url == '/notes/' || req.url == '/notes') {
        console.log('notes endpoint')
        resp.writeHead(200, 'OK', {'Content-Type': 'application/json'})
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
                const current_data = Buffer.concat(data).toString();
                const notes = JSON.parse(current_data);
                console.log([current_data, 'nba', typeof current_data])
                resp.write(JSON.stringify(notes))
                resp.end("\nEnd of message")
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
        });
        console.log([current_res.body, current_res.data, Object.keys(current_res), 'nbx', current_res.res])
    } else {
        resp.writeHead(200, 'OK', {'Content-Type': 'text/plain'})
        resp.write("Hi world")
        resp.end("\nEnd of message")
    }
});

server.listen(1234, function() {
  console.log("Listening on port 1234");
});