import {from_physical_layer, to_network_layer, to_physical_layer} from "./util";

const http = require('http').createServer()
const io = require('socket.io')(http)
const port = 3000

recieve = (io, port) => {
    http.listen(port, () => log(`server listening on port: ${port}`))
    
    io.on('connection', (socket) => {
        console.log('sender connected')
        socket.on('message', data => {
            handle_event(data)
        })
    })

    io.on('disconnect', (evt) => {
        log('sender disconnected')
    })
}

handle_event = (data) => {
    var frame = from_physical_layer(data)
    // handle data
    // agar packet type barabar hoga toh to_network_layer recieved info and then to_physical_layer ack
    // agar packet type gadbad hua toh console.log("recieved corrupted packet")
}