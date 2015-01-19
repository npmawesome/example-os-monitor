var monitor = require('os-monitor');
var stream  = require('stream');
var util    = require('util');


function EchoStream () {
  stream.Writable.call(this);
};

util.inherits(EchoStream, stream.Writable);

EchoStream.prototype._write = function (event, encoding, done) {
  event = JSON.parse(event.toString());
  console.log(new Date(event.timestamp * 1000).toString(), JSON.stringify(event));
  done();
}

// more advanced usage with configs.
monitor.start({
  delay      : 3000,         // interval in ms between monitor cycles
  freemem    : 1000000000,   // freemem under which event 'freemem' is triggered
  uptime     : 1000000,      // number of secs over which event 'uptime' is triggered
  critical1  : 0.7,          // loadavg1 over which event 'loadavg1' is triggered
  critical5  : 0.7,          // loadavg5 over which event 'loadavg5' is triggered
  critical15 : 0.7,          // loadavg15 over which event 'loadavg15' is triggered
  silent     : false,        // set true to mute event 'monitor'
  stream     : true,         // set true to enable the monitor as a Readable Stream
  immediate  : false,        // set true to execute a monitor cycle at start()
})
.pipe(new EchoStream());
