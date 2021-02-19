# e-bot
A small discord bot with awesome featues


# Documentation

## **annoy**
**CMD: e annoy [mention] [message OR default message]**
* Sends message to tagged user in their DM.
If message not provided then default message message is sent
"Hue hue hue hue hue I am sent by [sender] to annoy you. YEET YEET YEET YEET"

================================================================

## **avatar**
**ALIASES: icon, pfp**

**CMD: e avatar [mention]**
* Shows profile picture of the tagged user

**CMD: e avatar**
* Shows profile picture of the author

================================================================

## **cat**
**ALIASES: getcat, kitty**

**CMD: e cat**
* Posts a random picture of adorable cat

================================================================

## **dog**
**ALIASES: getdog, doggo**

**CMD: e avatar**
* Posts a random picture of adorable cat

================================================================

## **cc**
**ALIASES: customcommand, custom**

**CMD: e cc set [custom command] [message for command]**
* Sets a custom message for a custom command. Custom command can also contains mentions

**CMD: e cc rm [custom command]**
* Removes the custom command and its message

**CMD: e cc list**
* Lists all the available custom commands

================================================================

## **connectlom**
**CMD: e connectlom**
* Sends a dummy embedded message to the LOM server

================================================================

## **custrec**
**ALIASES: crec**

**CMD: e custrec add [mention] [emojis or nitro code, separated by ','] [react words separated by '|'] [evade bot] [below elavan] [show on mention] [everytime]**
* Reacts to mention or custom words with an emoji or custom emoji based on the conditions like
evade bot: no react for bot's message
below elavan: no react when elavan is mentioned
show on mention: react when user is mentioned
everytime: react on every user's message

**CMD: e custrec rm [mention]**
* Removes custom react for the mentioned user

================================================================

## **das**
**ALIASES: crec**

**CMD: e das**
* Poor Dev Das command requested by Jaegar (Fat gurl). It posts an image of dev das

================================================================

## **del**
**CMD: e del [message id]**
* Deletes the message

================================================================

## **ding**
**CMD: e ding**
* Posts "Dong"

================================================================

## **em**
**ALIASES: emote, emoji, e**

**CMD: e em [nitro emoji name]**
* Post a nitro emoji by impersonating the authur.

================================================================

## **emo**
**ALIASES: emoset, emset**

**CMD: e emo list**
* Lists all the nitro emojis.

**CMD: e emo checkall**
* Posts all the available nitro emojis.

**CMD: e emo custlist    OR    e emo customlist**
* Posts all the custom name assigned to nitro emojis.

**CMD: e emo custlist [mention]    OR    e emo customlist [mention]**
* Posts all the custom name assigned to nitro emojis of the mentioned user.

**CMD: e emo favlist**
* Posts all the favorite nitro emojis

**CMD: e emo favlist [mention]**
* Posts all the favorite nitro emojis of the mentioned user.

**CMD: e emo manset [nitro emoji] [nitro emoji code]**
* Adds nitro emoji in the bot

**CMD: e emo manset [nitro emoji] [nitro emoji code] a**
* Adds animated nitro emoji in the bot

**CMD: e emo set [custom name] [nitro emoji name]**
* Assigns custom name for nitro emoji.

**CMD: e emo setfav [nitro emoji name]**
* Adds nitro emoji name to favorite list

**CMD: e emo del [custom emoji name]**
* Removes the custom name assigned to nitro emoji

**CMD: e emo delfav [favorite emoji name]**
* Removes the emoji from favorite list

===================================================================

## **gn**
**CMD: e gn**
* Wishes good night

**CMD: e gn [mention]**
* Wishes good night to the mentioned user

===================================================================

## **help**
**CMD: e help**
* Sends the list of commands to author's DM.

**CMD: e help [command]**
* Posts the information about the command.

===================================================================

## **hook**
**CMD: e hook [mention] [message]**
* Impersonates the mentioned user and posts the message.

===================================================================

## **intro**
**CMD: e intro**
* Gives a small intro

===================================================================

## **kill**
**CMD: e kill [mention]**
* Posts a killing message

===================================================================

## **perms**
**ALIASES: permissions**

**CMD: e perms list**
* Lists the permission list of the author

**CMD: e perms list [mention]**
* Lists the permission list of the mentioned user

**CMD: e perms set [mention] [perm type] [perm value 0 OR 1]**
* Sets perms to the mentioned user

======================================================================

## **prune**
**CMD: e prune [number of messages, 2-99]**
* Deletes the messages in a range from 2 to 99

======================================================================

## **qn**
**CMD: e qn [questions]**
* Asks questions to bot
Questions:
*"how are you?"*,
*"am i loosing brain cells?" and*
*"what should i do?"*

======================================================================

## **re**
**ALIASES: react**

**CMD: e re [message id] [emoji name]**
* Reacts to the message with an emoji, considering the emoji is in the server in which bot is also present

======================================================================

## **reload**
**ALIASES: rld**

**CMD: e reload**
* Reloads the code of the commands

======================================================================

## **res**
**ALIASES: restrict**

**CMD: e res list**
* Sends the list of restricted user to the Author's DM

**CMD: e res [mention]**
* Restricts the user to post any message on server. Each message will get deleted by the e-bot

======================================================================

## **rmvres**
**ALIASES: removeres, rmvrestrictions**

**CMD: e rmvres [mention]**
* Removes the user from the restricted list

======================================================================

## **server**
**CMD: e server**
* Posts the server info

======================================================================

## **b**
**ALIASES: back**

**CMD: e b**
* Moves back in the music queue and plays the song

======================================================================

## **clear**
**ALIASES: c**

**CMD: e clear**
* Clears the music queue

======================================================================

## **d**
**ALIASES: die, disconnect, shine**

**CMD: e d**
* Disconnects the e-bot from the voice chat

======================================================================

## **jump**
**ALIASES: jp**

**CMD: e jump [song number]**
* Jumps to the song number and plays the song

======================================================================

## **n**
**ALIASES: next**

**CMD: e n**
* Moves forward in the music queue and plays the song

======================================================================

## **p**
**ALIASES: play**

**CMD: e play [song name]  OR   e play [youtube link]  OR  e play [Spotify playlist, song or track link]**
* Add the song to the music queue and plays the song which is on the queue list

======================================================================

## **pause**
**CMD: e pause**
* Pauses the song

======================================================================

## **q**
**ALIASES: queue**

**CMD: e q  OR  e q [page number]**
* Displays the queue

======================================================================

## **r**
**ALIASES: resume**

**CMD: e resume**
* Resumes the song

======================================================================

## **pl**
**ALIASES: playlist**

**CMD: e pl play [playlist name]**
* Adds all the songs of the mentioned playlist to the  queue and plays the song in the queue

**CMD: e pl create [playlist name]**
* Creates the playlist with name and empty list

**CMD: e pl list**
* Lists all the playlists created by the author

**CMD: e pl list [mention]**
* Lists all the playlists created by the mentioned user

**CMD: e pl list [playlist name]**
* Lists all the songs of playlist added by the author

**CMD: e pl list [playlist name] [mention]**
* Lists all the songs of playlist added by the mentioned user

**CMD: e pl add [playlist name];[song names separated by ';']**
* Adds songs to the playlist

**CMD: e pl rm [playlist name]**
* Removes the playlist

**CMD: e pl rm [song number] [playlist name]**
* Removes the song from the playlist

======================================================================