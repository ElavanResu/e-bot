/**
 * File: /Users/shubham/ElavanResu/asach-bot/features/reactions.js
 * Project: /Users/shubham/ElavanResu/asach-bot
 * Created Date: Sunday, May 24th 2020, 8:04:11 pm
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Sep 30 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */

const userTable = {
	elavan: {
		id: '234249678328299520',
		reactions: ['✋', '👁️', '🤚'],
		// reactions: ['🅰️'],
		checkWords: /elavan|elavanresu|resu|navale|shubham/g,
		evadeBot: true,
		bellowElavan: false,
		showOnMention: true,
		everytime: false,
	},
	jaegar: {
		id: '427000717681885185',
		reactions: ['🏳️‍🌈'],
		checkWords: /jaegar|gulkand|gulkandkush|jae/g,
		evadeBot: false,
		bellowElavan: true,
		showOnMention: true,
		everytime: false,
	},
	being: {
		id: '312541974844669952',
		reactions: ['🥺'],
		checkWords: /being|ancient/g,
		evadeBot: false,
		bellowElavan: true,
		showOnMention: true,
		everytime: false,
	},
	pushkie: {
		id: '686973497250938929',
		reactions: ['👑'],
		checkWords: /flaca|pushkie|pushkraj|pushieee/g,
		evadeBot: false,
		bellowElavan: false,
		showOnMention: true,
		everytime: true,
	},
	// pounder: {
	// 	id: '213519729296539648',
	// 	reactions: ['🍔'],
	// 	// checkWords: /being|ancient/g,
	// 	evadeBot: false,
	// 	bellowElavan: true,
	// 	showOnMention: false,
	// 	everytime: true,
	// },
	clover: {
		id: '545307696988160011',
		reactions: ['🐝'],
		evadeBot: false,
		bellowElavan: false,
		showOnMention: true,
		everytime: false,
	},
	// dhruv: {
	// 	id: '460488764511223848',
	// 	reactions: ['🍄'],
	// 	evadeBot: false,
	// 	bellowElavan: true,
	// 	showOnMention: true,
	// 	everytime: true,
	// },
	nathan: {
		id: '232793743374155777',
		reactions: ['🇫', '🇦', '🇬'],
		evadeBot: false,
		bellowElavan: true,
		showOnMention: true,
		everytime: true,
	},
	jerry: {
		id: '485378865481383987',
		reactions: ['🎶'],
		checkWords: /jerry/g,
		evadeBot: false,
		bellowElavan: true,
		showOnMention: true,
		everytime: false,
	},
};

const initiateReactionAlgo = async (message) => {
	const allUsers = Object.keys(userTable);
	for (let userCount = 0; userCount < allUsers.length; userCount++) {
		const userObject = userTable[allUsers[userCount]];
		const checkEverytime = userObject.everytime && message.author.id === userObject.id;

		const mentionedUser = message.mentions.users.get(userObject.id);
		const matchedWords = message.content.toLowerCase().match(userObject.checkWords || null);

		const confirmReact = (userObject.showOnMention && mentionedUser !== undefined) || (userObject.checkWords !== undefined && matchedWords !== null);

		const checkBot = !(userObject.evadeBot && message.author.id === '712367845572345977');

		const checlElavanMention = message.mentions.users.get('234249678328299520');
		const matchedElavanWords = message.content.toLowerCase().match(/elavan|elavanresu|resu|navale|shubham/g);
		const checkElavan = !(userObject.bellowElavan && (checlElavanMention !== undefined || matchedElavanWords !== null));

		// console.log(`------------------------${allUsers[userCount]}--------------------------`);
		// console.log('checkeverytime: ', checkEverytime);
		// console.log('mactchedWords: ', matchedWords);

		// console.log('confirmReact: ', confirmReact);
		// console.log('checkbot: ', checkBot);
		// console.log('checkElavan: ', checkElavan);
		// console.log('Final check: ', (checkElavan && (checkEverytime || confirmReact)) && checkBot);
		// console.log('----------------------------------------------------------');

		if ((checkElavan && (checkEverytime || confirmReact)) && checkBot) {
			try {
				for (let counter = 0; counter < userObject.reactions.length; counter++) {
					await message.react(userObject.reactions[counter]);
				}
			}
			catch (error) {
				console.error('One of the emojis failed to react');
			}
		}
	}
};

module.exports = {
	initiateReactionAlgo,
};
