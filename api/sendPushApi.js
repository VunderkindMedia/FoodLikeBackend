const fetch  = require('node-fetch');
const {config} = require('../helpers/insruments');
const sendPushApi = async ({title, description, users_list}) => {
  const form = {
    registration_ids: users_list.map(item => item.token),
    notification: {
      body: description,
      title: title,
      sound: 'default'
    }
  }
    return fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=EcNEM1PFSQpqpFOy4kS3QxQ:APA91bEJk4CTfRBede0dd9t6u05tUrD19Soc5b1w6nhC678J9WE-qlQflAd9t-Fgv8FY_Ps_L6qN1oOYHfAetO_4srkn3zv4RtBP2ES7_SrH4j1PFrVRLBVhzZ1jPPdJr8YQ7pXyndMB'
      },
      body: JSON.stringify(form)
    })
    .then(result => {
      console.log(result.json());
      return result.json()
    })
}

const sendPushOrders = (title, description, order, configKey, sendFunc) => {
  config.get().then((result) => {
    if (result[configKey] === '1') {
      order && order.phone && sendFunc(order.phone, title, description)
    }
  })
}

module.exports = { sendPushApi, sendPushOrders }
