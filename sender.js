import {from_network_layer, to_physical_layer, from_physical_layer} from "./util"

const io = require("socket.io-client");

send = (ip, port) {
    var socket = io("http://" + ip + ":" + str(port));
    //send initial info jo bhi ho 
    //and then actual data like that in reciever.js
}