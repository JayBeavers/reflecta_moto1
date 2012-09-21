// moto1 interface for the RocketBot Drive Base Teensy project
// Implements node.js API for the SparkFun Monster Moto Board

module.exports = function(reflecta, interfaceStart) {
  return {

    brakeGround : function() {
      reflecta.sendFrame( [interfaceStart] );
    },

    brakeVcc : function() {
      reflecta.sendFrame( [interfaceStart + 1] );
    },

    drive : function(power0, power1) {
      var buffer = new Buffer(7);
      buffer[0] = reflecta.FunctionIds.pushArray;
      buffer[1] = 4;
      buffer[6] = interfaceStart + 2;
      buffer.writeInt16BE(power0, 2);
      buffer.writeInt16BE(power1, 4);

      reflecta.sendFrame(buffer);
    },

    readCurrent : function(callback) {
      reflecta.sendFrame( [interfaceStart + 3] );
      reflecta.sendResponseCount(4, function(buffer) { 
        var currentMotor0 = buffer.readInt16BE(0);
        var currentMotor1 = buffer.readInt16BE(2);
        callback(currentMotor0, currentMotor1);
      });
    },

    configure : function(motor0A, motor0B, motor0PWM, motor0Current, motor0Enabled, motor1A, motor1B, motor1PWM, motor1Current, motor1Enabled) {

      var buffer = new Buffer(13);
      buffer[0] = reflecta.FunctionIds.pushArray;
      buffer[1] = 10;
      buffer[2] = motor0A;
      buffer[3] = motor0B;
      buffer[4] = motor0PWM;
      buffer[5] = motor0Current;
      buffer[6] = motor0Enabled;
      buffer[7] = motor1A;
      buffer[8] = motor1B;
      buffer[9] = motor1PWM;
      buffer[10] = motor1Current;
      buffer[11] = motor1Enabled;
      buffer[12] = interfaceStart + 4;

      reflecta.sendFrame(buffer);
    },

    initialize : function() {
      reflecta.sendFrame( [interfaceStart + 5] );
    }
  };
};