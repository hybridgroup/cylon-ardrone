# Drone Navigation

For this Cylon example, we'll be using an ARDrone again, this time getting data
from it's navigation board. When the board emits an 'update' event, we'll log
the data it's collected to the console.

Before we get started, make sure you've got the `cylon-ardrone` module
installed. First, let's start by loading up Cylon:

    var Cylon = require('cylon');

After we've got that loaded up, let's start defining our robot.

    Cylon.robot({

Our robot will, as with the basic ARDrone example, have a connection to an
ARDrone over an IP address, and a `drone` device to control the drone itself.
Except this time, we're also adding a `nav` device that will bind to the
ARDrone's navigation board.

      connections: {
        ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
      },

      devices: {
        drone: { driver: 'ardrone' },
        nav: { driver: 'ardrone-nav' }
      },

For our robot's work, it's going to enable the nav board's demo mode in the
drone's config, and log data to the console whenever the nav board emits the
'update' event.

      work: function(my) {
        my.drone.config('general:navdata_demo', 'TRUE');
        my.nav.on('navdata', console.log);
      }

Simple enough. Now all that's left is to start the robot:

    }).start();
