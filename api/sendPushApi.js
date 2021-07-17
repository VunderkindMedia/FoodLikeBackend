const fetch  = require('node-fetch');
const {config} = require('../helpers/insruments');
const sendPushApi = async ({title, description, users_list}) => {

  const form = {
    registration_ids: users_list.map(item => item.token),
    notification: {
      body: description,
      title: title,
      sound: 'default'
    },
    data: {
      body: description,
      title: title,
    }
  }
    return fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAA0AJjAN0:APA91bGVrx2qx6iBn3cc09-dSPLiKaszeUzK3YkS_M4v6y9uy2K_j25G3Y49mkQ6HDPiLHrr9WcRJDBQb_ezIa6J5fUNxp_aj9QTO48HRDkwXmcmlwoTdznf_wA1GybutEoqLNDhY3VT'
      },
      body: JSON.stringify(form)
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
