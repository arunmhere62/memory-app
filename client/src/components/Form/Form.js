import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/postSlice";
import "../../style.css"

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  const { data: post, status: status, error: error } = useSelector((state) => state.editPost);
  
  
  
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });


  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);
  
  // You can now access properties of the 'post' object
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      await dispatch(updatePost({postData , currentId}));
      console.log(postData);
      clear();
    }
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: "", title: "", message: "", tags: "", selectedFile: "" });
  };

  return (
    <>
      <form
        autoComplete='off'
        noValidate
        onSubmit={handleSubmit}
      >
        <h6>Creating a memory</h6>
        <textarea
          className="inputStyle"
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          name='creator'
          id=''
          cols='30'
          rows='2'
          placeholder='creator name '
        ></textarea>
        <br />
        <textarea
          className="inputStyle"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          name='title'
          id=''
          cols='30'
          rows='2'
          placeholder='title name'
        ></textarea>
        <br />
        <textarea
          className="inputStyle"
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          name='message'
          id=''
          cols='30'
          rows='2'
          placeholder='description or text'
        ></textarea>
        <br />
        <label htmlFor=''>Tags</label>
        <br />
        <textarea
          className="inputStyle"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          name='tags'
          id=''
          cols='30'
          rows='2'
          placeholder='tags'
        ></textarea>
        <br />
        <div>
          <FileBase
            
            type='file'
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <button  className="mt-2 buttonStyle" type='submit'>{post ? "Update" : "Submit"}</button>
        <button className="mt-2 mx-2 deleteBtn" onClick={clear}>clear</button>
      </form>
    </>
  );
};

export default Form;
