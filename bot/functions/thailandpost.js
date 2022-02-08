const axios = require("axios");

class Thailandpost {

   constructor() {
       // Token ที่ได้จาก ThailandPost
       this.token = 'IZYLR5FnRqP:KRZ!FBJGQuN+FjVtUjB@WVCKBUJ4P$MzMdL1J?N.C_C^XMZ$VIBOX4AaGdB6G;FlQ_TpG2YcJ3FpTvDCGDFjDWY&';
   }

   async getAuthToken() {
       let result = null
       await axios({
           url: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + this.token
           }
       }).then((response) => {
           result = response.data
       }).catch((error) => {
           result = null
       })
       console.log("Token is ready!");
       return result
   }

   async getItemTrack(trackNo) {
       const authToken = await this.getAuthToken()
       const params = {
           "status": "all",
           "language": "TH",
           "barcode": [trackNo]
       }
       let result = null
       await axios({
           url: 'https://trackapi.thailandpost.co.th/post/api/v1/track',
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Token ' + authToken.token
           },
           data: params
       }).then((response) => {
           result = response.data
       }).catch((error) => {
           result = null
       })
       return result
   }
}

module.exports = new Thailandpost();