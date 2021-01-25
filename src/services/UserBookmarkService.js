import firebase from "./firebase";

class UserBookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  // 特定の URL のブックマークを取得する関数
  async getBookmark(user, url) {
    const userBookmarkSnapshot = await this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .where("url", "==", url)
      .get();

    if (userBookmarkSnapshot.empty) {
      return null;
    }

    let userBookmark = null;
    userBookmarkSnapshot.forEach((doc) => {
      userBookmark = doc.data();
      userBookmark.id = doc.id;
    });

    return userBookmark;
  }

  // 新規にブックマークを登録する関数
  addBookmark(user, form) {
    // ブックマーク時間はサーバーの時間を使用する
    form.bookmarkedAt = firebase.firestore.FieldValue.serverTimestamp();
    // 現在のユーザーのサブコレクションである `bookmarks` に登録する
    return this.db
      .collection("users")
      .doc(user.id)
      .collection("bookmarks")
      .add(form);
  }
}

const userBookmarkService = new UserBookmarkService();
export { userBookmarkService };
