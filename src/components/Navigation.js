import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaUser } from "react-icons/fa";
const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FaTwitter color={"#04AAFF"} size="100" />
          </Link>
        </li>
        <li>
          <Link
            to="profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            {/* {userObj.displayName} */}
            <FaUser color={"#04AAFF"} size="100" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
