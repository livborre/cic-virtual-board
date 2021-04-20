import React, { useState, useEffect, useContext } from "react";
import './Feed.css'
import Post from './Post.js'
import PostBox from './PostBox.js'
import {db} from "../firebase"
import { useAuth } from "../context/Auth";

function Feed() {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useAuth()
    currentUser.avatar = "default"

    useEffect(() => {
        db.collection('posts').orderBy("created", "desc").onSnapshot(snapsh => (
            setPosts(snapsh.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })))
        ))
    }, [])

    const deletePost = (i) => {
        let post = posts[i]
        if (currentUser.email !== post.usermail) return
        db.deletePost(post)
    }

    return (

        <div className="feed">
            
            <div className="feed__postColumns">
                <PostBox user={currentUser} numberOfPosts={posts.length}></PostBox>
                {posts.map((post,i) => 
                    <Post
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        onDelete={() => deletePost(i)}
                    />
                )}
            </div>
        </div>
    )
}

export default Feed
