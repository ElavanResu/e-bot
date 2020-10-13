/**
 * File: /home/elavanresu/ElavanResu/e-bot/services/thedogapi/index.js
 * Project: /home/elavanresu/ElavanResu/e-bot
 * Created Date: Wednesday, October 14th 2020, 2:07:33 am
 * Author: Shubham Navale
 * -----
 * Last Modified: Wed Oct 14 2020
 * Modified By: Shubham Navale
 * -----
 * ------------------------------------
 * All Rights reserved
 */
const axios = require('axios')

const getRandomImage = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.thedogapi.com/v1/images/search`,
      headers: {
        'x-api-key': process.env.DOGAPIKEY
      }
    })

    return response.data[0]
  } catch (error) {
    console.log('Error in getRandomImage: ', error)
  }
}

module.exports = {
  getRandomImage
}