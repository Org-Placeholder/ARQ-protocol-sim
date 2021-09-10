import {from_network_layer, to_physical_layer, from_physical_layer,construct_packet_array,construct_frame} from "./util"
import {TIMEOUT_LENGTH} from "./const"
const io = require("socket.io-client");
var packet_array = []
var packet_index = 0
var timer
send = (ip, port) => {
    var socket = io("http://" + ip + ":" + str(port))

    send_current_frame()
    socket.on('message', data => {
        var frame = from_physical_layer(data)
        handle_event(frame)
    })
}

send_current_frame = () => {
    var packet = from_network_layer(frame_array,frame_index)
    var frame = construct_frame(packet, packet_index%2, frame_types.ACK)
    to_physical_layer(io,frame)
    timer = setTimeout(TIMEOUT_LENGTH,  () => {
        console.log('Timer timed out, resending')
        send_current_frame()
    })
    
}

handle_event = (frame) => {
    if(frame.kind != frame_types.ACK){
        console.log('Damaged frame received, doing nothing')
    }
    else{
        if(frame.seq_no == packet_index%2){
            packet_index++
            clearTimeout(timer)
            if(packet_index < packet_array.length){
                send_current_frame()
            }
        }
        else{
            console.log('Out of order acknowledgement received, ignored')
        }
    }
}

var args = process.argv
if(args.length < 5){
    console.log('node sender.js [ip,port,packet]')
}
ip = args[2]
port = args[3]
message = args[4]
packet_array = construct_packet_array(message)

send(ip,port)