const axios = require("axios");
const LINE_HEADER = {
   "Content-Type": "application/json",
   Authorization: "joG9mi/f6b8Aj7ipv3lYN6MbnK9CKWCiEZxufCs8MQo58vCXWYFmqZbzG7N9jvV/mmSvLrlnvQAIW7+C1AApORTr8cI3sfogMJOonMHa/12hT+mA6bwE/j1VygKMIbJVZNElYOeN3XrNrBT5XVTZ6AdB04t89/1O/w1cDnyilFU="
}

class lineApp {
   async replyMessage(replyToken, message) {
       try {
           const params = {
               replyToken: replyToken,
               messages: [message]
           }
           return await axios({
               url: 'https://api.line.me/v2/bot/message/reply',
               method: 'POST',
               headers: LINE_HEADER,
               data: params
           }).then((response) => {
               result = response.data
           }).catch((error) => {
               result = null
           })
       } catch (error) {
           console.error(`Delivery to LINE failed (${error})`);
       }
   }
}

module.exports = new lineApp();