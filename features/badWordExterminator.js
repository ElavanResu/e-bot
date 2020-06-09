/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/badWordExterminator.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 11:29:38 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Jun 09 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
module.exports = (message) => {
  const existHaremWord = message.content.toLowerCase().match(/spoof|spoofer|spoofers|spoofs/g);
	if (existHaremWord !== null) {
    message.delete();
    return true;
	}
};