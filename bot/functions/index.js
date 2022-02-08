const functions = require("firebase-functions");
const thailandpost = require("./thailandpost");
const lineApp = require("./lineapp");
const msgTemplate = require("./message");

exports.LineWebhook = functions.https.onRequest(async(req, res) => {
   let event = req.body.events[0];

   if (event.type === 'message' && event.message.type === 'text') {
       const postCode = event.message.text;
       const result = await thailandpost.getItemTrack(postCode);
       let { response } = result;
       let { items } = response;
       let key = Object.keys(result.response.items);
       let payload;
       if (items[key[0]].length > 0) {
           let trackItems = [];
           items[key[0]].forEach(function(detail) {
               const bgcolor = (detail.delivery_status == 'S') ? '#ABEBC6' : '#EEEEEE';
               const item_temp = msgTemplate.trackMainItem(detail, bgcolor);
               trackItems.push(item_temp);
           });
           payload = msgTemplate.trackMainPayload(postCode, trackItems)
       } else {
           payload = msgTemplate.trackNotFound()
       }
      
       await lineApp.replyMessage(event.replyToken, payload);
       return res.status(200).send(req.method);
   } else {
       return res.status(200).send(req.method);
   }
  
});