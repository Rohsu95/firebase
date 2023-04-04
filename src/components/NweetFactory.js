import { dbService, storageService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { v4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // Created, img
  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    try {
      let attachmentUrl = "";
      if (attachment !== "") {
        const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
      }
      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
      await addDoc(collection(dbService, "nweetObj"), nweetObj);
    } catch (error) {
      console.log(error);
    }
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    console.log(event.target);
    const {
      target: { files },
    } = event;
    // 파일을 갖고 reader 만든다 0은 첫번째 파일만 갖는다
    const theFile = files[0];
    const reader = new FileReader();
    // 로딩이 끝나면 finishedEvent를 갖는다
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    //그 후 readAsDataURL을 사용하여 파일 읽기
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  // const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FaPlus />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {/* <input type="submit" value="Nweet" /> */}
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            alt=""
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FaTimes />
          </div>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
