import axios from "axios";

export interface Availability {
  available: boolean;
  currency: string;
  definitive: boolean;
  domain: string;
  price: number;
}

export async function availabilityForDomains(domains: string[]): Promise<Availability[]> {
  const avails = await axios.post(
    "https://api.godaddy.com/v1/domains/available",
    JSON.stringify(domains),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `sso-key ${process.env.GODADDY_KEY}:${process.env.GODADDY_SECRET}`
      }
    }
  );

  return avails.data?.domains;
}
