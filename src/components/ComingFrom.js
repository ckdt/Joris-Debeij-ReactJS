import React, {createContext, useContext, useState} from 'react';

const ComingFromContext = createContext(null);

export const useComingFrom = () => useContext(ComingFromContext);

const ComingFrom = ({children}) => {
  const [comingFrom, set] = useState(null);
  return (
    <ComingFromContext.Provider value={{comingFrom, set}}>
      {children}
    </ComingFromContext.Provider>
  );
};

export default ComingFrom;
