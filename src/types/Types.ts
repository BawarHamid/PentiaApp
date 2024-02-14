import { Timestamp } from "firebase/firestore";

export type chatrooms = {
  chatname: string;
  description: string;
  chatroomId: string;
};

export type messages = {
  message: string;
  timeCreated: Timestamp;
  username: string;
  userId: string;
  chatroomId: string;
  profile_picture: string;
};
