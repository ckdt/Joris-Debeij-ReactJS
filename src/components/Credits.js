import React from 'react';
import {RichText, linkResolver} from 'prismic-reactjs';

const Credits = ({content}) => {
  const {credits_list} = content;

  console.log('Credits', credits_list);

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
  return null;
};
export default Credits;
