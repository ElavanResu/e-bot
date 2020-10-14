/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/CustomCommands.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 10:21:07 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Thu Oct 15 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const customCommandsSchema = (sequelize, DataTypes) => {
  return sequelize.define('custom_commands', {
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    custom_command: {
      type: DataTypes.STRING,
      allowNull: false
    },
    custom_message: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}

const getCustomMessage = async (SequelizeConnetion, guildId, customCommand) => {
  try {
    const customCommandObject = await SequelizeConnetion.findOne({
      where: { guild_id: guildId, custom_command: customCommand }
    })

    return customCommandObject
  } catch (error) {
    console.log('Error in getCustomMessage: ', error)
  }
}

const getAllCommands = async (SequelizeConnetion, guildId) => {
  try {
    const customCommandObject = await SequelizeConnetion.findAll({
      where: { guild_id: guildId }
    })
    return customCommandObject
  } catch (error) {
    console.log('Error in getAllCommands: ', error)
  }
}

const addCustomCommand = async (SequelizeConnetion, guildId, customCommand, customMessage) => {
  try {
    const customCommandObject = await getCustomMessage(SequelizeConnetion, guildId, customCommand)
    if (customCommandObject) {
      customCommandObject.custom_message = customMessage
      customCommandObject.save()
      return {
        status: 'success',
        message: `Custom message of **${customCommand}** updated to ${customMessage}`
      }
    }
    SequelizeConnetion.create({
      guild_id: guildId,
      custom_command: customCommand,
      custom_message: customMessage
    })
    return {
      status: 'success',
      message: `Custom message for **${customCommand}** created`
    }
  } catch (error) {
    console.log('Error in addCustomCommand: ', error)
  }
}

const removeCustomCommand = async (SequelizeConnetion, guildId, customCommand) => {
  try {
    const customCommandObject = await getCustomMessage(SequelizeConnetion, guildId, customCommand)
    if (!customCommandObject) return {
      status: 'failed',
      message: `Custom command **${customCommand}** doesn't exist`
    }
    customCommandObject.destroy()
    return {
      status: 'success'
    }
  } catch (error) {
    console.log('Error in removeCustomCommand: ', error)
  }
}

module.exports = {
  customCommandsSchema,
  getCustomMessage,
  getAllCommands,
  addCustomCommand,
  removeCustomCommand
}