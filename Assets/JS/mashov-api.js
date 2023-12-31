export const loginToMashov = async function (semel, year, username, password) {
  return fetch("https://web.mashov.info/api/login", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://web.mashov.info/students/login",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"semel\":" + semel + ",\"year\":" + year + ",\"username\":\"" + username + "\",\"password\":\"" + password + "\",\"appName\":\"info.mashov.students\",\"apiVersion\":\"3.20200528\",\"appVersion\":\"3.20200528\",\"appBuild\":\"3.20200528\",\"deviceUuid\":\"chrome\",\"devicePlatform\":\"chrome\",\"deviceManufacturer\":\"win\",\"deviceModel\":\"desktop\",\"deviceVersion\":\"87.0.4280.88\"}",
    "method": "POST",
    "mode": "cors"
  })
    .then(res => { return [res.headers.get("set-cookie"), res.headers.get("x-csrf-token"), res] })
};
export const getTestData = async function (loginInfo) {
  loginInfo[2] = await loginInfo[2].json();
  loginInfo[2] = loginInfo[2].credential.userId;
  console.log(loginInfo[2]);
  return fetch(`https://web.mashov.info/api/students/${loginInfo[2]}/homework`, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
}
export const getBirthday = async function (loginInfo) {
  loginInfo[2] = await loginInfo[2].json();
  loginInfo[2] = loginInfo[2].credential.userId;
  return fetch("https://web.mashov.info/api/user/" + loginInfo[2] + "/birthday", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
}
export const getMailIDs = async function (loginInfo, take) {
  const mail = await getMail(loginInfo, take);
  let ids = []
  mail.forEach(element => {
    ids.push(element.conversationId);
  });
  return ids;
}
export const getDisplayName = async function (loginInfo) {
  loginInfo[2] = await loginInfo[2].json();
  loginInfo[2] = loginInfo[2].credential;
  return loginInfo[2].displayName;
}
export const getCredentials = async function (loginInfo) {
  loginInfo[2] = await loginInfo[2].json();
  loginInfo[2] = loginInfo[2].credential;
  return loginInfo[2];
}
export const getMessageData = function (loginInfo, messageID) {
  return fetch("https://web.mashov.info/api/mail/conversations/" + messageID + "/", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
}
export const getSchools = function (loginInfo) {
  return fetch("https://web.mashov.info/api/schools", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};

export const get = async function (loginInfo, get) {
  loginInfo[2] = await loginInfo[2].json()
  loginInfo[2] = loginInfo[2].credential.userId
  return fetch("https://web.mashov.info/api/students/" + loginInfo[2] + "/" + get, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/regularGrades",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
export const getRaw = async function (loginInfo, get) {
  loginInfo[2] = await loginInfo[2].json()
  loginInfo[2] = loginInfo[2].credential.userId
  return fetch("https://web.mashov.info/api/students/" + loginInfo[2] + "/" + get, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/students/" + loginInfo[2] + "/regularGrades",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => console.log(res))
    .then(body => { return body });
};
export const getMail = function (loginInfo, take) {
  return fetch("https://web.mashov.info/api/mail/inbox/conversations?skip=0&take=" + take, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/mailbox/folder/inbox",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
export const getNotifications = function (loginInfo, take) {
  return fetch("https://web.mashov.info/api/user/notifications?skip=0&take=" + take, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/mailbox/folder/inbox",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
};
export const getPicture = function (loginInfo) {
  return fetch("https://web.mashov.info/api/user/" + loginInfo[2] + "/picture", {
    "headers": {
      "accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "same-origin",
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/covidSplash",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.buffer()) // expecting a json response
    .then(json => { return json });
};
export const getUserDetails = function (loginInfo) {
  return fetch("https://web.mashov.info/api/user/" + loginInfo[2] + "/", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": loginInfo[1],
      "cookie": loginInfo[0]
    },
    "referrer": "https://web.mashov.info/students/main/mailbox/folder/inbox",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  })
    .then(res => res.json()) // expecting a json response
    .then(json => { return json });
}