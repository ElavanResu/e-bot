const { findMember } = require("../dbObjects")

/**
 * File: /home/elavanresu/ElavanResu/e-bot/features/checkUserRestrictions.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 11th 2020, 12:45:54 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 11 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const checkUserRestrictions = async (message) => {
  const restrictedUserObject = await findMember(message.author.id, message.guild.id)
  if (restrictedUserObject) {
    message.delete()
    return true
  }
  return false
}

module.exports = checkUserRestrictions