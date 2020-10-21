/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/badWordExterminator.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Tuesday, June 9th 2020, 11:29:38 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 21 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const { selectedOwnerWords } = require('../metaData/words')
const transformSentence = require('../functionHelpers/transformSentence')

const checkWords = new RegExp(selectedOwnerWords.toString().replace(/,+/g, '|'), 'g')

module.exports = async (message) => {
	const modifiedSentence = transformSentence(message.content)
	const existHaremWord = modifiedSentence.toLowerCase().match(checkWords)
	if (existHaremWord !== null) {
		await message.delete()
		return true
	}
}