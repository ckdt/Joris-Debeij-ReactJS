import React from 'react';
import {RichText} from 'prismic-reactjs';

const Awards = ({content}) => {
  const {awards_list} = content;

  console.log('awards', awards_list);

  if (awards_list.length > 1) {
    // multiple paragraphs
    return (
      <div className="awards">
        {awards_list.map((item, index) => (
          <div className="award--item" key={index}>
            {RichText.asText(item.text)}
          </div>
        ))}
      </div>
    );
  } else {
    // single paragraph
    return (
      <div className="awards">
        <div className="award--item">{RichText.asText(awards_list)}</div>
      </div>
    );
  }
  return null;
};
export default Awards;
