import React from 'react'
import { Avatar } from '@material-ui/core'

const defaultAvatar = "https://mpng.subpng.com/20180518/joy/kisspng-internet-forum-avatar-5aff3949b6e803.3109554115266757857492.jpg"

function MyAvatar({src}) {
    return (
        <Avatar src={src === "default" ? defaultAvatar : src}></Avatar>
    )
}

export default MyAvatar
