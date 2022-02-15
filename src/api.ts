

/*------------------ */
// This way we can load our `conf.js` file dynamically

declare global {
  interface Window {
    Configs: any;
  }
}

let API_URL = "/";

if (window?.Configs?.API_URL) {
  API_URL = window?.Configs?.API_URL
}

/*--------------*/

export type HttpError = {
  status: number;
  message: string;
};

async function failResp(resp: Response) {
  var text = await resp.text();
  throw { status: resp.status, message: text } as HttpError;
}

/*--------------*/
export type Pagination = {
  current_page: number;
  total_entries: number;
  total_pages: number;
};

/*--------------*/

export type VerificationData = {
  Email: string;
  KYCId: string;
};

export type Winner = {
  Address: string;
  Rewards: number;
  Verified: boolean;
  VerificationData: VerificationData;
};

export async function getAllWinners(): Promise<Winner[]> {
  var resp = await fetch(API_URL + "winners");
  if (!resp.ok) await failResp(resp);
  return await resp.json();
}

/*--------------*/

export type WinnerChallenge = {
  Challenge: string;
  Rewards: number;
};

export async function getWinnerChallenges(address: string): Promise<WinnerChallenge[]> {
  var resp = await fetch(API_URL + `winners/${address}`);
  if (!resp.ok) await failResp(resp);
  return await resp.json();
}

/*--------------*/

export async function getWinnersByChallenge(challengeName: string): Promise<Winner[]> {
  var resp = await fetch(API_URL + `challenges/${challengeName}`);
  if (!resp.ok) await failResp(resp);
  return await resp.json();
}

/*--------------*/

export async function getAllChallenges(): Promise<string[]> {
  var resp = await fetch(API_URL + "challenges");
  if (!resp.ok) await failResp(resp);
  return Object.keys( await resp.json());
}

/*--------------*/