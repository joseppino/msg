const BASE_ADDRESS = "http://127.0.0.1:8000";

export async function getPlayerSummaries(steamIds: string[]) {
  try {
    const steamIdsObj: Object = {
      steam_ids: steamIds
    }
    const req: string = BASE_ADDRESS + "/getPlayerSummaries";
    const res = await fetch(req, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(steamIdsObj),
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer"
    });
    
    const resJson = await res.json(); 
    return resJson.response.players;
  } catch(e) {
    console.error(e);
    return null;
  }
}

export async function getOwnedGames(steamId: string) {
  try {
    const req: string = BASE_ADDRESS + "/getOwnedGames/" + steamId;
    const res = await fetch(req, {
      method: "GET",
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer"
    });

    const resJson = await res.json(); 
    return resJson.response.games;

  } catch(e) {
    console.error(e);
    return null;
  }
}

export async function getFriendsList(steamId: string) {
  try {
    const req: string = BASE_ADDRESS + "/getFriendsList/" + steamId;
    const res = await fetch(req, {
      method: "GET",
      mode: "cors",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer"
    });

    const resJson = await res.json(); 
    const returnArray =  resJson.friendslist.friends;
    returnArray.length = Math.min(returnArray.length, 100); // limit array length to 100
    return returnArray;

  } catch(e) {
    console.error(e);
    return null;
  }
}

export async function checkGameOwnership(steamFriends: Object[], appId: string) {
  try {
    const ownershipReq: Object = {
      steam_friends: steamFriends,
      appid: appId
    }
    const req: string = BASE_ADDRESS + "/checkGameOwnership";
    const res = await fetch(req, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(ownershipReq),
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer"
    });

    return JSON.parse(JSON.parse(await res.text()));

  } catch(e) {
    console.error(e);
    return null;
  }
}
