import {afterEach, beforeAll, beforeEach, describe, expect, it, vi} from "vitest";
import { CacheService } from "./CacheService";

describe('cache service test', () => {
  let cacheService: CacheService;
  const url = 'https://gizmo-developer.com/api'

  beforeAll(() => {
    global.fetch = vi.fn()
  })

  describe('one fetch test', () => {
    beforeEach(() => {
      cacheService = new CacheService();
    })

    afterEach(() => {
      vi.clearAllMocks();
    })
    it('successfully request', async () => {
      const data = {
        field1: 'data',
        field2: 100,
      };
      (fetch as any).mockResolvedValue(createFetchResponse(data, 200));
      const result = await cacheService.getData(url);
      expect(fetch).toBeCalledTimes(1);
      expect(fetch).toBeCalledWith(url);
      expect(result).toEqual(data);
    })

    it('failed request', async () => {
      const data = {};
      const statusText = 'Not found';
      (fetch as any).mockResolvedValue(createFetchResponse(data, 400, statusText));

      await expect(cacheService.getData(url)).rejects.toEqual({ status: 400, text: statusText })
    })
  })

  describe('multiple fetch test', () => {
    beforeEach(() => {
      cacheService = new CacheService();
      vi.useFakeTimers();
    })

    afterEach(() => {
      vi.clearAllMocks();
      vi.useRealTimers();
    })

    it('fetch just once, not few times', async () => {
      const data = {
        field1: 'data',
        field2: 100,
      };
      (fetch as any).mockResolvedValue(createFetchResponse(data, 200));
      const firstResult = await cacheService.getData(url);
      vi.advanceTimersByTime(1_000);
      const secondResult = await cacheService.getData(url);
      vi.advanceTimersByTime(1_000);
      const thirdResult = await cacheService.getData(url);
      expect(fetch).toBeCalledTimes(1);
      expect(fetch).toBeCalledWith(url);
      expect(firstResult).toEqual(data);
      expect(secondResult).toEqual(data);
      expect(thirdResult).toEqual(data);
    })

    it('fetch twice', async () => {
      const data = {
        field1: 'data',
        field2: 100,
      };
      (fetch as any).mockResolvedValue(createFetchResponse(data, 200));
      const firstResult = await cacheService.getData(url);
      vi.advanceTimersByTime(7_000);
      const secondResult = await cacheService.getData(url);
      expect(fetch).toBeCalledTimes(2);
      expect(fetch).toBeCalledWith(url);
      expect(firstResult).toEqual(data);
      expect(secondResult).toEqual(data);
    })
  })

  describe('Just for fun', () => {

    beforeEach(() => {
      cacheService = new CacheService();
    })

    afterEach(() => {
      vi.clearAllMocks();
    })
    it('mock service method', async () => {
      const data = {
        field1: 'data',
        field2: 100,
      };
      const spy = vi.spyOn(CacheService.prototype as any, 'fetchAndCache');
      spy.mockImplementationOnce(() => Promise.resolve(data))
      const result = await cacheService.getData(url);
      expect(fetch).toBeCalledTimes(0);
      expect(result).toEqual(data);
    })
  })
})

function createFetchResponse(data: unknown, status: number, statusText = 'Error') {
  return {
    status,
    ok: status < 400,
    statusText,
    json: () => Promise.resolve(data)
  }
}