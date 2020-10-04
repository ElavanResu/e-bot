/**
 * File: /home/elavanresu/ElavanResu/e-bot/features/checkAndUpdatePerms.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 1:55:55 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 04 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const { getMemberPerms } = require('../dbObjects')
const globalUsers = require('../metaData/globalUsers')
const checkAndUpdatePerms = async (memberId, guildId, permType) => {
  try {
    if (globalUsers.hasOwnProperty(memberId)) {
      return true
    } else {
      const perms = await getMemberPerms(memberId, guildId)
      return perms[permType]
    }
  } catch (error) {
    console.log('Error in checkAndUpdatePerms: ', error)
  }
}

module.exports = checkAndUpdatePerms