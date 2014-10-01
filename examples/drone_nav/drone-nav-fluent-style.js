var cylon = require('cylon');

cylon.robot({
  connection: { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
  devices: [
    { name: 'drone', driver: 'ardrone' },
    { name: 'nav', driver: 'ardroneNav' }
  ]
})

.on('ready', function(robot) {
    robot.drone.config('general:navdata_demo', 'TRUE');
    robot.nav.on('update', console.log);
})

.start();
