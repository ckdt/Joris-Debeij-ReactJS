// Import Defaults
import React from 'react';

// Import Prismic
import {RichText, linkResolver} from 'prismic-reactjs';

// Component: Awards
const Credits = ({content}) => {
  const {credits_list} = content;
  if (credits_list.length > 1) {
    // multiple paragraphs
    return (
      <div className="credits">
        {credits_list.map((item, index) => (
          <div className="credit--item" key={index}>
            <RichText render={item.text} linkResolver={linkResolver} />
          </div>
        ))}
      </div>
    );
  } else {
    // single paragraph
    return (
      <div className="credits">
        <div className="credit--item">
          <RichText render={credits_list} linkResolver={linkResolver} />
        </div>
      </div>
    );
  }
};

// Export Credits
export default Credits;
