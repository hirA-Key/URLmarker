import gravatar from "gravatar";
import firebase from "./firebase";
import { cacheService } from "./CacheService";

class UserService {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  // 現在のユーザーを取得する
  async getCurrentUser() {
    // サインインしていない場合はエラーとする
    if (this.auth.currentUser == null) {
      throw new Error("サインインしていません。サインインしてください");
    }

    // Firestore からユーザーのデータを取得する
    const snapshot = await this.db
      .collection("users")
      .where("authId", "==", this.auth.currentUser.uid)
      .get();
    // Firestore のデータからユーザーオブジェクトを作成する
    let user = null;
    snapshot.forEach((doc) => {
      user = doc.data();
      user.id = doc.id;
    });
    return user;
  }

  async createUser(auth) {
    // 作成したコレクションに合わせてオブジェクトを作成
    const user = {
      authId: auth.uid,
      name: auth.email.substr(0, auth.email.indexOf("@")),
      gravatarUrl: gravatar.url(auth.email)
    };
    // users コレクションに登録
    await this.db.collection("users").add(user);
    return user;
  }

  // ユーザー取得処理の追加
  async getUser(userId) {
    // キャッシュからユーザー一覧を取得
    const users = cacheService.getItem("users") || {};
    // 特定のIDのユーザーが登録されていない場合、新規にユーザー情報を取得
    if (!users[userId]) {
      const userRef = await this.db
        .collection("users")
        .doc(userId)
        .get();
      let user = null;
      if (userRef.exists) {
        user = {
          ...userRef.data(),
          id: userId
        };
      }
      // ユーザー一覧に取得したユーザーを設定しキャッシュに登録
      users[userId] = user;
      cacheService.setItem("users", users);
    }
    return users[userId];
  }
}

const userService = new UserService();
export { userService };
