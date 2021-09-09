to_physical_layer = (io, frame) => {
    //preprocess frame if needed, maybe randomize the error and also delay
    io.emit(frame)
}

//use from_physical_layer to parse the data and return the json
from_physical_layer = (data) => {
    var frame; //initialize it by parsing data
    return frame
}

//from_network_layer kya krega exactly apne simulation mei woh doubtful
from_network_layer = (array,index) => {
    return array[index] //return the required packet
}

to_network_layer = (data) => {
    console.log('Network layer recieved : ', data)
}