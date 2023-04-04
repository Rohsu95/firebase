import Nweet from "components/Nweet";
import { dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // read
  useEffect(() => {
    const q = query(
      collection(dbService, "nweetObj"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweetObjs) => (
          <Nweet
            key={nweetObjs.id}
            nweetObjs={nweetObjs}
            isOwner={nweetObjs.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
