// Import Defaults
import React from 'react';

// Import Prismic
import {RichText, linkResolver} from 'prismic-reactjs';

// Component: Awards
const Awards = ({content}) => {
  const {awards_list} = content;
  if (awards_list.length > 1) {
    // multiple paragraphs
    return (
      <div className="awards">
        {awards_list.map((item, index) => (
          <div className="award--item" key={index}>
            <RichText render={item.text} linkResolver={linkResolver} />
          </div>
        ))}
      </div>
    );
  } else {
    // single paragraph
    return (
      <div className="awards">
        <div className="award--item">
          <RichText render={awards_list} linkResolver={linkResolver} />
        </div>
      </div>
    );
  }
  return null;
};

// Export Awards
export default Awards;
