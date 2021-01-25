class CacheService {
  getItem(key) {
    const value = localStorage.getItem(key);
    // ローカルストレージには文字列でデータを保存するので、JSON に復元
    return value != null ? JSON.parse(value) : null;
  }

  setItem(key, value) {
    if (value != null) {
      // ローカルストレージには文字列でデータを保存するので、JSON.stringify でオブジェクトを文字列に変換
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, null);
    }
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

const cacheService = new CacheService();
export { cacheService };
