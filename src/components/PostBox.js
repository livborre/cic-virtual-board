import React, { useState } from "react";
import "./PostBox.css";
import "./Post.css";
import Avatar from "./Avatar";
import { Card, Button } from "react-bootstrap"
import {db} from "../firebase";
import { useAuth } from "../context/Auth.js";

function PostBox({user, numberOfPosts}) {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const { logout } = useAuth()

  const sendPost = (e) => {
    e.preventDefault();

    db.post(user, message, image);

    setMessage("");
    setImage("");
  };

  return (
    <Card className="postbox post">
        <Card.Header as="h5">
            <div className="postbox__header">
                <div className="postbox__headerUserInfo">
                    <Avatar src={user.avatar}></Avatar>
                    <span>{user.email}</span>
                </div>
                <Button variant="secondary" onClick={() => logout()}>Sign out</Button>
            </div>
        </Card.Header>
        <Card.Body>
        <form>
            <div className="form-group">
                <input
                    className="form-control"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder="What's happening?"
                    type="text"
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Optional: Enter image URL"
                    type="text"
                    />
            </div>
            <Button
                onClick={sendPost}
                type="submit"
                >
                Post
            </Button>
        </form>
        </Card.Body>
    </Card>
  );
}

export default PostBox;