import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZP0jrXVhmIcUwexFbrpTvpkFdIwD153c",
    authDomain: "todo-list-3410d.firebaseapp.com",
    databaseURL: "https://todo-list-3410d.firebaseio.com",
    projectId: "todo-list-3410d",
    storageBucket: "todo-list-3410d.appspot.com",
    messagingSenderId: "642124068599",
    appId: "1:642124068599:web:0154e1991a613051d6c5f2"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const todos = db.collection("todos");

export const signOut = () => {
    firebase.auth().signOut();
}
export const signIn = async () => {

    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    const result = await auth.signInWithPopup(provider);
    let { user } = result;
    let token = "";
    if (result.credential) {
        token = result.credential.accessToken;
    }
    return {
        token,
        uid: user.uid,
        name: user.displayName
    }
};
export const create = (uid, name, form) => {
    todos.add({ uid, name, ...form });
};
export const get = async id => {
    const doc = await todos.doc(id).get();
    return { [id]: { ...doc.data() } };
};
export const getAll = async () => {
    const output = {};;
    const snapshot = await todos.get();
    snapshot.forEach(doc => output[doc.id] = doc.data());
    return output;
};
export const remove = id => todos.doc(id).delete();
export const update = (id, form) => todos.doc(id).update(form);
