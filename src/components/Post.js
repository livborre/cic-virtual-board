import Avatar from './Avatar'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import React from 'react'
import './Post.css'
import { Card } from "react-bootstrap"
import {db} from "../firebase"

function Post({ 
    currentUser,
    onDelete,
    post,
}) {
    let { usermail, avatar, text, image, created, likes } = post
    let date = (created?.toDate() + "").split("GMT")[0]

    const canDelete = currentUser.email === usermail
    const hasLiked = () => { return likes.some(v => v === currentUser.email)}

    const onLike = () => {
        if (hasLiked()) db.unlike(post, currentUser)
        else db.like(post, currentUser)
    }

    return (
        <Card className="post">
            <Card.Body>
                <Card.Title className="post__userInfo">
                    <Avatar src={avatar}></Avatar>
                    <span>{usermail}</span>
                </Card.Title>
                <Card.Text>{text}</Card.Text>
                <Card.Img className="post__image" variant="top" src={image} />
            </Card.Body>
            <Card.Footer className="post__cardfooter">
                {date}
                <span>
                    {canDelete && 
                        <IconButton onClick={() => onDelete()}>
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    }
                    <IconButton className={hasLiked() ? "post___likeIcon-on" : "post___likeIcon-off"} onClick={() => onLike()}>
                        <FavoriteBorderIcon 
                            className={hasLiked() ? "post___likeIcon-on" : "post___likeIcon-off"} 
                            fontSize="small" />
                    </IconButton>
                    <small>{likes?.length}</small>
                </span>
            </Card.Footer>
        </Card>
    )
}

export default Post
