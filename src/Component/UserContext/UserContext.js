import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setuserToken] = useState(null);
  const [setuserData] = useState(null);
  return (
    <>
      <UserContext.Provider value={{ userToken, setuserToken, setuserData }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}
