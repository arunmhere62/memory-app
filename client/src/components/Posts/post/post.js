import React from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { getPost } from "../../../store/postSlice";
import "../../../style.css";

const Post = ({ post: AllPosts, setCurrentId }) => {
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    setCurrentId(id);
    dispatch(getPost(id));
  };

  return (
    <div>
      {AllPosts.map((post) => (
        <div
          key={post._id}
          className='card mb-5 p-3'
        >
          <h3>Created By {post.creator}</h3>
          <img
            src={post.selectedFile}
            alt=''
            width='80'
          />
          <h5>{post.title}</h5>
          <p>{moment(post.createdAt).fromNow()}</p>
          <div>
            <button
              className='buttonStyle'
              onClick={() => handleEdit(post._id)}
            >
              Edit
              <MoreHorizIcon fontSize='default' />
            </button>
          </div>
          <div>{/* <p>{post.tags.map((tag) => `#${tag} `)}</p> */}</div>
          <div>
            <h5>{post.message}</h5>
            <p>
              Tags :
              {post.tags.map((tag) => (
                <span>{` #${tag}`}</span>
              ))}
            </p>
          </div>
          <button
            className='buttonStyle'
            onClick={() => {}}
          >
            <ThumbUpAltIcon fontSize='small' />
            &nbsp; {post.likeCount} Likes
          </button>
          <button
            className='deleteBtn'
            onClick={() => {}}
          >
            <DeleteIcon fontSize='small' />
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Post;
