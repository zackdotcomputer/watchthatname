import axios from "axios";
import { logger } from "src/lib/logger";

export interface Availability {
  available: boolean;
  currency: string;
  definitive: boolean;
  domain: string;
  price: number;
}

export async function availabilityForDomains(domains: string[]): Promise<Availability[]> {
  if (domains.length === 0) {
    return [];
  }

  try {
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
  } catch (e) {
    logger.error(e, "Failed to load GoDaddy Results");
    return [];
  }
}
