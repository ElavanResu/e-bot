/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/badWordExterminator.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 11:29:38 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Sat Feb 20 2021
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { selectedOwnerWords, badBotData } = require('../metaData/words')
const transformSentence = require('../functionHelpers/transformSentence')

const checkWords = new RegExp(selectedOwnerWords.toString().replace(/,+/g, '|'), 'g')

const checkForBadBot = (message) => {
	let badBotDetected = false
	for (let count = 0; count < badBotData.length; count++) {
		const badBotDetails = badBotData[count]
		if (message.author.bot && badBotDetails.id === message.author.id && badBotDetails.username === message.author.username && badBotDetails.discriminator === message.author.discriminator) {
			const modifiedSentence = transformSentence(message.content)
			const regxModifiedWords = new RegExp(badBotDetails.words.toString().replace(/,+/g, '|'), 'g')
			const existHaremWord = modifiedSentence.toLowerCase().match(regxModifiedWords)
			if (existHaremWord) {
				badBotDetected = true
				break
			}
		}
	}
	return badBotDetected
}

module.exports = async (message) => {
	const modifiedSentence = transformSentence(message.content)
	let existHaremWord
	if (selectedOwnerWords.length > 0) existHaremWord = modifiedSentence.toLowerCase().match(checkWords)
	const badBotDetected = checkForBadBot(message)
	if ((existHaremWord !== null && existHaremWord !== undefined) || badBotDetected) {
		await message.delete()
		return true
	}
}