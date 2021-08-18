const fetch  = require('node-fetch');
const {config} = require('../helpers/insruments');
const admin = require("firebase-admin");
const getHuaweiAccessToken = async () => {
  const form = new URLSearchParams({
    'grant_type': "client_credentials",
    'client_id': "104643223",
    'client_secret': "9b2946b330d50dac91afadbf8dc56da49c343d2df9870980df9e419f1bc819e3"
  })
  return new Promise(function(resolve, reject) {
    fetch("https://oauth-login.cloud.huawei.com/oauth2/v3/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: form
    }).then(response => {
      resolve(response.json())
    }).catch((e) => {
      reject(e)
    })
  });
}

const sendPushAndroidApi = async ({title, description, users_list}) => {

  const messages = users_list.filter(user => user.os !== 'android_hws').map(user => {
    if (user.os === 'ios') {
      return {
        token: user.token,
        notification: {
          body: description,
          title: title,
        },
        apns: {
          headers: {
            'apns-priority': '10',
          },
          payload: {
            aps: {
              sound: 'default',
            }
          },
        },
        data: {
          message: description,
          title: title,
        }
      }
    } else {
      return {
        token: user.token,
        data: {
          message: description,
          title: title,
        }
      }
    }

  })

  return admin.messaging().sendAll(messages)
}
const sendPushHuaweiApi = async ({title, description, users_list}) => {

  getHuaweiAccessToken().then(token => {
    const tokens = users_list.filter(user => user.os === 'android_hws').map(user => user.token)
    const message = {
      message: {
        notification: {
          title: title,
          body: description
        },
        android: {
          notification: {
            title: title,
            body: description,
            click_action: {
              type: 1,
              action: "intent://dodoma.vunderkind.media"
            }
          }
        },
        token: tokens
      }
    }

    return fetch("https://push-api.cloud.huawei.com/v1/104643223/messages:send", {
      headers: {
        Authorization: "Bearer " + token.access_token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(message)
    }).then(response => response.json()).then(response => console.log(response)).catch(e => console.error(e))
  })
}

const sendPushApi = async ({title, description, users_list}) => {
  await sendPushAndroidApi({title, description, users_list})
  await sendPushHuaweiApi({title, description, users_list})
}

const sendPushOrders = (title, description, order, configKey, sendFunc) => {
  config.get().then((result) => {
    if (result[configKey] === '1') {
      order && order.phone && sendFunc(order.phone, title, description)
    }
  })
}

module.exports = { sendPushApi, sendPushOrders }
