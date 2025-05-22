"use client";

import React from "react";
import { useAuth } from "../../../../context/auth";

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>Home</h1>

      <p>{auth?.currentUser?.displayName}</p>

      <p className="cursor-pointer" onClick={() => auth?.signOut()}>
        Sign Out
      </p>
    </div>
  );
};

export default Home;
