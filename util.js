import {frame_types, MAX_PACKET_LENGTH} from "./const"
to_physical_layer = (io, frame) => {
    //preprocess frame if needed, maybe randomize the error and also delay
    io.emit(frame)
}

//use from_physical_layer to parse the data and return the json
from_physical_layer = (data) => {
    var frame = data; //initialize it by parsing data
    return frame
}

//from_network_layer kya krega exactly apne simulation mei woh doubtful
from_network_layer = (array,index) => {
    return array[index] //return the required packet
}

to_network_layer = (data) => {
    console.log('Network layer recieved : ', data)
}

construct_packet_array = (message) => {
    const packet_array = []
    var str = ""
    for(let i = 0;i < message.length;i++){
        str.concat(message[i])
        if(str.length == MAX_PACKET_LENGTH){
            packet_array.append(str)
            str = ""
        }
    }
    return packet_array
}

construct_frame = (packet,seq_no,kind) => {
    frame = {info:packet, seq_no:seq_no, kind:kind}
    return frame
}