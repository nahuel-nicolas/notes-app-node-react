const http = require("http");

const server = http.createServer(function(req, resp) {
    if (req.url == '/notes/' || req.url == '/notes') {
        resp.writeHead(200, 'OK', {'Content-Type': 'application/json'})
        const current_res = http.get('http://127.0.0.1:3001/notes/', res => {
            let data = [];
            console.log('Status Code:', res.statusCode);

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
        current_res.end();
    } else {
        resp.writeHead(200, 'OK', {'Content-Type': 'text/plain'})
        resp.write("Hi world")
        resp.end("\nEnd of message")
    }
});

server.listen(1234, function() {
  console.log("Listening on port 1234");
});