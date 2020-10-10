/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/RestrictedUsers.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Saturday, October 10th 2020, 11:38:03 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sun Oct 11 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const restrictedUsersSchema = (sequelize, DataTypes) => {
  return sequelize.define('restricted_users', {
    member_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}

const findMember = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const restrictedUserObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId }
    })

    return restrictedUserObject
  } catch (error) {
    console.log('Error in findMember: ', error)
  }
}

const getAllMembers = async (SequelizeConnetion, guildId) => {
  try {
    const restrictedUsersListObject = await SequelizeConnetion.findAll({
      where: { guild_id: guildId }
    })

    return restrictedUsersListObject
  } catch (error) {
    console.log('Error in getAllMembers: ', error)
  }
}

const addMember = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const restrictedUserObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId }
    })

    if (!restrictedUserObject) {
      await SequelizeConnetion.create({
        member_id: memberId,
        guild_id: guildId
      })

      return {
        status: 'success'
      }
    }
    return {
      status: 'exists'
    }
  } catch (error) {
    console.log('error in addMember: ', error)
  }
}

const removeMember = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const restrictedUserObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId }
    })

    if (restrictedUserObject) {
      restrictedUserObject.destroy()
      return {
        status: 'success'
      }
    }

    return {
      status: 'notFound'
    }
  } catch (error) {
    console.log('error in removeMember: ', error)
  }
}

module.exports = {
  restrictedUsersSchema,
  findMember,
  getAllMembers,
  addMember,
  removeMember
}