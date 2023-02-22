export class CacheService {
  /**
   * Хранилище запросов
   */
  private readonly cache: Record<string, unknown>;
  /**
   * Время жизни данных
   */
  private readonly expiresTime: number;

  /**
   * Класс позволяет оптимизировать работу гет запросов за счет сохранения данных в кэше
   * @param expiresTime - время жизни данных в мс, по умолчанию 5 000мс
   */
  constructor(expiresTime = 5_000) {
    this.cache = {};
    this.expiresTime = expiresTime;
  }

  /**
   * Получает данные для гет запроса по переданному урлу
   * @param url - адрес для гет запроса
   */
  getData<T>(url: string): Promise<T> {
    if (this.cache[url] !== undefined) return Promise.resolve(this.cache[url] as T);
    return this.fetchAndCache<T>(url);
  }

  /**
   * Выполняет фетч запрос и сохраняет данные в кэш. После этого запускает таймер на удаление данных из кэша
   * @param url - адрес для гет запроса
   * @throws в случае если статус запроса больше 400 - выбрасывает исключение с данными из ответа и статусом ответа
   */
  private async fetchAndCache<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw { text: response.statusText, status: response.status };
    const data = await response.json();

    this.cache[url] = data;
    setTimeout(() => this.cache[url] = undefined, this.expiresTime);
    return data;
  }
}