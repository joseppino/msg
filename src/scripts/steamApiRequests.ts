const BASE_ADDRESS = "http://127.0.0.1:8000"

export async function getPlayerSummaries(steamIds: string[]) {
  try {
    const steamIdsObj: Object = {
      steamIds: steamIds
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