const API_URL = "http://localhost:8080/";

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

// export type ChannelsData = {
//   pagination: Pagination;
//   rows: ChannelRow[];
// };

// export async function getChannels(page: number): Promise<ChannelsData> {
//   if (!page) {
//     page = 1;
//   }
//   var resp = await fetch(API_URL + "channels?page=" + page.toString());
//   if (!resp.ok) await failResp(resp);
//   return await resp.json();
// }

/*--------------*/

// export async function getChannel(id: number): Promise<ChannelRow> {
//   var resp = await fetch(`${API_URL}channels/${id.toString()}`);
//   if (!resp.ok) await failResp(resp);
//   return await resp.json();
// }

/*--------------*/

// export async function searchSensors(
//   query: string,
//   page: number
// ): Promise<SensorsData> {
//   if (!page) {
//     page = 1;
//   }
//   query = encodeURI(query);
//   var resp = await fetch(
//     `${API_URL}search/sensors/${query}?page=${page.toString()}`
//   );
//   if (!resp.ok) await failResp(resp);
//   return await resp.json();
// }

/*--------------*/
