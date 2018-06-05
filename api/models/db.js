'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.deviceInfoSchema = new Schema({
	ssids : Array [{
        interface : string, 
        noise : Number, 
        signal : Number, 
        bitrate : Number, 
        quality : Number, 
        quality_max : Number,
        bssid : String,
        ssids : String,
        channel : Number}],
    survey : Array [{
        mac : String,
        channel : Number,
        ssid : String,
        encryption : String,
        signal : Number,
        quality : Number,
        quality_max : Number,
        last_seen : Number          
    }],
    stations : Array [{
        interface : String,
        ssid : String,
        mac : String,
        inactive_time : Number,
        rx_packages : Number,
        tx_packages : Number,
        rx_bytes : Number,
        tx_bytes : Number,
        beacon_rx : Number,
        tx_retries : Number,
        tx_failed : Number,
        beacon_loss : Number,
        signal : Number,
        signal_avg : Number,
        tx_bitrate : Number,
        rx_bitrate : Number,
        authorized : Boolean,
        authenticated : Boolean,
        associated : Boolean,
        wmm : Boolean,
        mfp : Boolean,
        tdls : Boolean,
        preamble : Number,
        conn_time : Number,
        expected_tput : Number
    }],
    device : {
        firmware : String,
        serial : String,
        wan_name : String,
        wan_gateway : String,
        wan_ip : String,
        machine_type : String,
        tx_bytes : Number,
        rx_bytes : Number,
        uptime : Number,
        total_ram : Number,
        free_ram : Number,
        procs : Number
    }

});


