import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import firebaseConfig from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const todos = db.collection("todos");

export const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth();
    const result = await auth.signInWithPopup(provider);
    let { user } = result;
    return {
        uid: user.uid,
        name: user.displayName
    }
};
export const get = async id => {
    const doc = await todos.doc(id).get();
    return { [id]: { ...doc.data() } };
};
export const getAll = async () => {
    const output = {};
    const snapshot = await todos.get();
    snapshot.forEach(doc => output[doc.id] = doc.data());
    return output;
};
export const create = (uid, name, form) => todos.add({ uid, name, ...form });
export const remove = id => todos.doc(id).delete();
export const update = (id, form) => todos.doc(id).update(form);
export const signOut = () => firebase.auth().signOut();
