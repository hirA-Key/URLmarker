import firebase from "./firebase";

class BookmarkService {
  constructor() {
    this.db = firebase.firestore();
  }

  async getBookmarks(num, time) {
    let ref = this.db.collection("bookmarks");
    // 日時が渡されたときは指定日時以降のデータを取得するようにする
    if (time) {
      ref = ref.where("createdAt", "<", time);
    }
    const snapshot = await ref
      // orderBy データの並び順を指定
      .orderBy("createdAt", "desc")
      // limit 取得する件数を制限する
      .limit(num)
      .get();
    return snapshot.docs.map((doc) => {
      return {
        // data の内容を展開してコピーする
        ...doc.data(),
        id: doc.id,
        // firestore 内のタイムスタンプデータは firestore.Timestamp という特殊なクラスで帰ってきます。
        // ここでそれを JavaScript 標準の Date に変換。
        createdAt: doc.data().createdAt.toDate(),
      };
    });
  }

  // ブックマーク取得ロジックの追加
  async getBookmark(id) {
    if (id == null) {
      return null;
    }
    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .get();
    if (snapshot.exists) {
      return {
        ...snapshot.data(),
        id: id,
      };
    }
    return null;
  }

  // コメント取得ロジックの追加
  async getBookmarkComments(id) {
    const snapshot = await this.db
      .collection("bookmarks")
      .doc(id)
      .collection("comments")
      .get();
    const comments = [];
    for (let doc of snapshot.docs) {
      const userId = doc.data().userId;
      const user = await this.db
        .collection("users")
        .doc(userId)
        .get();
      comments.push({
        ...doc.data(),
        id: doc.id,
        user: {
          ...user.data(),
          id: userId,
        },
      });
    }
    return comments;
  }

  // スター登録ロジック
  async addStar(bookmarkId, commentId, userId) {
    // 該当するコメントへの参照を取得しておく
    const commentRef = this.db
      .collection("bookmarks")
      .doc(bookmarkId)
      .collection("comments")
      .doc(commentId);

    const comment = await commentRef.get();
    // すでに stars 配列がある場合はそれを使用し、存在しない場合は空の配列を使用する
    const stars = comment.data().stars || [];
    stars.push(userId);
    // 特定のフィールドを更新するには update に更新するフィールドだけを設定したオブジェクトを渡す
    return commentRef.update({ stars: stars });
  }
}

const bookmarkService = new BookmarkService();
export { bookmarkService };
