const fetch  = require('node-fetch');
const {config} = require('../helpers/insruments');
const sendPushApi = async ({title, description, users_list}) => {
  return new Promise((resolve, reject) => {
    const form = {
      registration_ids: users_list.map(item => item.token),
      notification: {
        body: description,
        title: title,
        sound: 'default'
        }
    }
    const form2 = {
      to: users_list.map(item => item.token),
      title:title,
      body: description,
    }
    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'key=AAAARtlGJ7g:APA91bEeoxCh8EqzUmB5sq98T7r3ub-fU25hm8QNFTdz6LoJ5GyeVp4roXOW3LmVvgFKajTT24BIBf_J_I8UkQRYDrsMvsOdm0WHTx0RE_p2w12RkMFBqoHDF2jDlm8Zttljdys8H21T'
      },
      body: JSON.stringify(form)
    }).then(result => result.json())
        .then(result => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form2)
      }).then((result2) => {
        result2.json()
      }).then((result2) => {
        resolve({
          FCM: result,
          EXPO: result2
        })
      })
    }).catch(e=> {
      reject(e)
    })
  })

}

const sendPushOrders = (title, description, order, configKey, sendFunc) => {
  console.log('ORDER', order);
  config.get().then((result) => {
    if (result[configKey] === '1') {
      order && order.phone && sendFunc(order.phone, title, description)
    }
  })
}

module.exports = { sendPushApi, sendPushOrders }
