/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/Permissions.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 4th 2020, 1:36:18 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Tue Oct 06 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const defaultPemrs = {
  music_back: true,
  music_queue_clear: true,
  music_disconnet: true,
  music_next: true,
  music_play: true,
  music_pause: true,
  music_resume: true,
  music_jump: true,
  music_que_remove_item: true,
  annoy: false,
  hook: false,
  custom_emojis: true,
  custom_emojis_settings: true,
  prune: false,
  reload_cmd: false
}
const permissionsSchema = (sequelize, DataTypes) => {
  return sequelize.define('permissions', {
    member_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    music_back: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_queue_clear: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_disconnet: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_next: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_play: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_pause: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_resume: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_jump: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    music_que_remove_item: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    annoy: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hook: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    custom_emojis: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    custom_emojis_settings: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    prune: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    reload_cmd: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}

const addPermission = async (SequelizeConnetion, memberId, guildId, newPerms) => {
  try {
    return await SequelizeConnetion.create({
      ...defaultPemrs,
      ...newPerms,
      member_id: memberId,
      guild_id: guildId
    })
  } catch (error) {
    console.log('error in addPermission: ', error)
  }
}

const updatePermission = async (SequelizeConnetion, memberId, guildId, permType, permValue) => {
  try {
    if (Object.keys(defaultPemrs).includes(permType)) {
      const permissionObject = await SequelizeConnetion.findOne({
        where: { member_id: memberId, guild_id: guildId }
      })
      if (!permissionObject) {
        await addPermission(SequelizeConnetion, memberId, guildId, {
          [permType]: permValue
        })
        return {
          status: 'success',
          message: 'Perms changed'
        }
      }
      permissionObject[permType] = permValue
      permissionObject.save()
      return {
        status: 'success',
        message: 'Perms changed'
      }
    } else {
      return {
        status: 'failed',
        message: 'Invalid perm type'
      }
    }
  } catch (error) {
    console.log('error in updatePermission: ', error)
  }
}

const deletePermission = async (SequelizeConnetion) => {
  try {
    return null
  } catch (error) {
    console.log('error in deletePermission: ', error)
  }
}

const getMemberPerms = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const permissionObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId },
      attributes: [
        'music_back',
        'music_queue_clear',
        'music_disconnet',
        'music_next',
        'music_play',
        'music_pause',
        'music_resume',
        'music_jump',
        'music_que_remove_item',
        'annoy',
        'hook',
        'custom_emojis',
        'custom_emojis_settings',
        'prune',
        'reload_cmd'
      ]
    })

    if (!permissionObject) {
      return await addPermission(SequelizeConnetion, memberId, guildId)
    }
    return permissionObject
  } catch (error) {
    console.log('Error in getMemberPerms: ', error)
  }
}

module.exports = {
  permissionsSchema,
  addPermission,
  updatePermission,
  deletePermission,
  getMemberPerms
}