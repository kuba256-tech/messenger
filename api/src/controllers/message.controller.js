import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const { id: loggedInUserId } = req.user._id;
    const filteredUser = await user
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");
    res.status(200).json(filteredUser );
  } catch (error) {
    console.log("Error in getUserForSideBar", error.message);
    res.status(500).json({ message: "internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat },
        { senderId: userToChat, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessages ${error.message}`);
    res.status(500).json({ message: "internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.url;
    }
    const newMessage = await Message({senderId,receiverId,  text, image:imageUrl });
    await newMessage.save();
    res.status(200).json( newMessage );
  } catch (error) {
    console.log(`Error occured in sendMessage controller:  ${error.message}`)
    res.status(500).json({error:"Internal Server Error"})
  }
};
