var Cylon = require('cylon');

Cylon
  .robot()
  .connection({ name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' })
  .device({ name: 'drone', driver: 'ardrone' })
  .device({ name: 'nav', driver: 'ardroneNav' })
  .on('ready', function(bot) {
    bot.drone.config('general:navdata_demo', 'TRUE');
    bot.nav.on('update', console.log);
  });

Cylon.start();
