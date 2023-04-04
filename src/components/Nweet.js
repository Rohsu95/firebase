import { dbService, storageService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const Nweet = ({ nweetObjs, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObjs.text);
  const NweetTextRef = doc(dbService, "nweetObj", `${nweetObjs.id}`);

  // 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await deleteDoc(NweetTextRef);
      // storage에 저장된 이미지 삭제
      await deleteObject(ref(storageService, nweetObjs.attachmentUrl));
    }
  };
  // 수정
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  required
                  autoFocus
                  onChange={onChange}
                  className="formInput"
                />
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{nweetObjs.text}</h4>
          {nweetObjs.attachmentUrl && (
            <img src={nweetObjs.attachmentUrl} alt="img" />
          )}

          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FaTrashAlt />
              </span>
              <span onClick={toggleEditing}>
                <FaPencilAlt />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
