/**
 * File: /home/elavanresu/ElavanResu/e-bot/models/MemberReactions.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Sunday, October 18th 2020, 5:18:00 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 19 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const memberReactionsSchema = (sequelize, DataTypes) => {
  return sequelize.define('member_reactions', {
    member_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    guild_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reactions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    check_words: {
      type: DataTypes.STRING,
      allowNull: true
    },
    evade_bot: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    below_elavan: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    show_on_mention: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    everytime: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}

const getReactionsDetailsForMember = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const memberReactionsObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId }
    })

    return memberReactionsObject
  } catch (error) {
    console.log('Error in getReactionsDetailsForMember: ', error)
  }
}

const getAllMemberReactionsDetails = async (SequelizeConnetion) => {
  try {
    const memberReactionsObject = await SequelizeConnetion.findAll()
    return memberReactionsObject
  } catch (error) {
    console.log('Error in getAllMemberReactionsDetails: ', error)
  }
}

const addReactionsDetails = async (SequelizeConnetion, memberId, guildId, data) => {
  try {
    console.log('memberId, guildId, data: ', memberId, guildId, data)
    const reactionsDetailsObject = await getReactionsDetailsForMember(SequelizeConnetion, memberId, guildId)
    if (reactionsDetailsObject) {
      reactionsDetailsObject.reactions = data.reactions
      reactionsDetailsObject.check_words = data.checkWords
      reactionsDetailsObject.evade_bot = data.evadeBot
      reactionsDetailsObject.below_elavan = data.belowElavan
      reactionsDetailsObject.show_on_mention = data.showOnMention
      reactionsDetailsObject.everytime = data.everytime
      reactionsDetailsObject.save()

      return {
        status: 'success',
        message: `Details updated`
      }
    }

    await SequelizeConnetion.create({
      member_id: memberId,
      guild_id: guildId,
      reactions: data.reactions,
      check_words: data.checkWords,
      evade_bot: data.evadeBot,
      below_elavan: data.belowElavan,
      show_on_mention: data.showOnMention,
      everytime: data.everytime
    })

    return {
      status: 'success',
      message: `Details added`
    }

  } catch (error) {
    console.log('Error in addReactionsDetails: ', error)
  }
}

const removeReactionsDetails = async (SequelizeConnetion, memberId, guildId) => {
  try {
    const memberReactionsObject = await SequelizeConnetion.findOne({
      where: { member_id: memberId, guild_id: guildId }
    })
    if (!memberReactionsObject) {
      return {
        status: 'failure',
        message: 'User doesn\'t have any reactions'
      }
    }
    memberReactionsObject.destroy()
    return {
      status: 'success',
      message: 'Reaction deleted'
    }
  } catch (error) {
    console.log('Error in removeReactionsDetails: ', error)
  }
}

module.exports = {
  memberReactionsSchema,
  getReactionsDetailsForMember,
  getAllMemberReactionsDetails,
  addReactionsDetails,
  removeReactionsDetails
}