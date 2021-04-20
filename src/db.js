import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/";

export default function setupDb (app) {

    let db = app.firestore()

    db.post = (user, message, image) => db
        .collection("posts")
        .add({
            user: user.uid,
            usermail: user.email,
            avatar: user.avatar,
            text: message,
            image: image,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            likes: []
        });
    
    db.deletePost = (post) => db.collection('posts').doc(post.id).delete()
    
    db.unlike = (post, user) => {
        if (!post.likes.some(v => v === user.email)) return
        let newList = post.likes.filter(v => v !== user.email)
        db.collection("posts")
            .doc(post.id)
            .update({
                likes: newList
            })
    }
    
    db.like = (post, user) => {
        if (post.likes.some(v => v === user.email)) return
        let newList = post.likes
        newList.push(user.email)
        db.collection("posts")
            .doc(post.id)
            .update({
                likes: newList
            })
    }
    
    db.comment = (user, message, image) => db
        .collection("posts")
        .add({
            user: user.uid,
            usermail: user.email,
            avatar: user.avatar,
            text: message,
            image: image,
            created: firebase.firestore.FieldValue.serverTimestamp(),
        });
    
    return db
}