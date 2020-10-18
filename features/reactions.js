/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/reactions.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Sunday, May 24th 2020, 8:04:11 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Mon Oct 19 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { getAllMemberReactionsDetails } = require('../dbObjects')

const initiateReactionAlgo = async (message) => {
	try {
		const memberReactionsDetails = await getAllMemberReactionsDetails(message.author.id)
		if (!memberReactionsDetails) return
		for (let memberCount = 0; memberCount < memberReactionsDetails.length; memberCount++) {
			// Get member reaction details
			const memberObject = memberReactionsDetails[memberCount].dataValues

			// Check for everytime conditions
			const checkEverytime = memberObject.everytime && message.author.id === memberObject.member_id

			// Get mentioned user if present
			const mentionedUser = message.mentions.users.get(memberObject.member_id)

			// Check for words
			let matchedWords = null
			if (memberObject.check_words !== null) {
				const checkWords = new RegExp(memberObject.check_words, 'g')
				matchedWords = message.content.toLowerCase().match(checkWords)
			}

			// Get the final check
			const confirmReact = (memberObject.show_on_mention && mentionedUser !== undefined) || (matchedWords !== null)

			// Check for bot
			const checkBot = !(memberObject.evade_bot && message.author.bot)

			// Check for Elavan's mention
			const checkElavanMention = message.mentions.users.get('234249678328299520')

			// Check for Elavan words
			const matchedElavanWords = message.content.toLowerCase().match(/elavan|elavanresu|resu|navale|shubham/g)

			// Final check for elavan
			const checkElavan = !(memberObject.bellow_elavan && (checkElavanMention !== undefined || matchedElavanWords !== null))
			if ((checkElavan && (checkEverytime || confirmReact)) && checkBot) {
				const reactions = memberObject.reactions.split(/,+/g)
				for (let counter = 0; counter < reactions.length; counter++) {
					message.react(reactions[counter])
				}
			}
		}
	} catch (error) {
		console.log('Error in initiateReactionAlgo: ', error)
	}
}

module.exports = {
	initiateReactionAlgo,
}
