import * as React from 'react';
import {createContext, useContext} from 'react';
import './cursor.css';
import useMousePosition from '../utilities/useMousePosition';

const CursorContext = createContext(null);

export const useCursor = () => useContext(CursorContext);

const CursorProvider = ({children}) => {
  let {x, y} = useMousePosition();
  const [status, setStatus] = React.useState(null);
  return (
    <CursorContext.Provider value={{status, setStatus}}>
      {children}
      <div
        id="circle-follow"
        style={{left: x, top: y, zIndex: 998}}
        className={'show click ' + status}
      >
        <svg
          className="loader track show"
          width="100"
          height="100"
          style={{transform: 'matrix(0, 0, 0, 0, 0, 0)'}}
        >
          <circle cx="50" cy="50" r="30"></circle>
        </svg>
        <svg
          className="loader fill show"
          width="100"
          height="100"
          style={{transform: 'matrix(0, 0, 0, 0, 0, 0)'}}
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            style={{
              strokeDashoffset: 1e-5,
              strokeDasharray: 'none',
            }}
          ></circle>
        </svg>
        <div className="circle-wrap">
          <svg
            className="cursor"
            width="18"
            height="18"
            style={{transform: 'matrix(1, 0, 0, 1, 0, 0)'}}
          >
            <circle cx="9" cy="9" r="9"></circle>
          </svg>
        </div>
      </div>
    </CursorContext.Provider>
  );
};

export default CursorProvider;
