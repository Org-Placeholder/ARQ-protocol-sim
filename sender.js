import {from_network_layer, to_physical_layer, from_physical_layer} from "./util"

const io = require("socket.io-client");
var packet_array = []
var packet_index = 0

send = (ip, port) => {
    var socket = io("http://" + ip + ":" + str(port));

    //send initial info jo bhi ho 
    //and then actual data like that in reciever.js
}

send_current_frame = () => {
    var packet = from_network_layer(frame_array,frame_index)
    var frame = construct_frame(packet)
    to_physical_layer(frame)
}

construct_frame = (packet) => {
    
}