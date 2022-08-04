// server.js

const http = require('http');
const hostname = '127.0.0.1'
const port = 8000

http
    .get('http://api.open-notify.org/astros.json', resp => {
        let data = ''

        resp.on('data', chunk => {
            data += chunk
        })

        resp.on('end', () => {
            let peopleData = JSON.parse(data)
            console.log(peopleData)

            const server = http.createServer((req, res) => {
                res.statusCode = 200

                res.setHeader('Content-Type', 'application/json')
                res.setHeader('Access-Control-Allow-Origin', '*')

                res.end(JSON.stringify(peopleData.people))
            })

            server.listen(port, hostname, () => {
                console.log(`Server running at http://${hostname}:${port}/`)
            })
        })

        .on('error', err => {
            console.log("Error: ", err.message)
        })
    })