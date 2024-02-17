import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";


export const getSinglePost = async (req, res) => {
  
  const { id } = req.params;

  try {
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  const {_id, title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("no post with that id");
  }

  const updatedPost = {title, message, creator, selectedFile, tags , _id };

  await postMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);

};
