import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import hash from 'object-hash';
import { addSeconds, isBefore } from 'date-fns';

const failsaveJsonParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
    return {};
  }
};

@Injectable()
export class RedisStoreService {
  private client = createClient({ url: 'redis://127.0.0.1:6379' });
  private connected = false;
  private readonly cacheSeconds = 10 * 60 * 60 * 24;

  async storeRequestResult<TReq extends object, TRes>(
    request: TReq,
    response: TRes
  ): Promise<boolean> {
    await this.connect();
    const setResult = await this.client.set(
      hash(request),
      JSON.stringify({
        validUntil: addSeconds(new Date(), this.cacheSeconds),
        response,
      })
    );
    return setResult === 'OK';
  }

  async getRequestResult<TRes, TReq extends object = any>(
    request: TReq
  ): Promise<TRes | null> {
    const key = hash(request);
    await this.connect();
    const result = await this.client.get(key);
    if (!result) {
      return null;
    }
    const parsed = failsaveJsonParse(result);
    if (!parsed) {
      return null;
    }
    const { validUntil, response } = parsed;
    if (!validUntil || !response) {
      return null;
    }
    if (isBefore(new Date(), new Date(validUntil))) {
      return response;
    }
    console.log(`validUntil passed`);
    // this.client.del(key);
  }

  async keys(pattern = '*'): Promise<string[]> {
    await this.connect();
    return this.client.keys(pattern);
  }

  private async connect(): Promise<void> {
    if (this.connected) {
      return;
    }
    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      console.error(error);
    }
  }
}
