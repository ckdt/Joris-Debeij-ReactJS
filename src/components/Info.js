import React from 'react';
import {RichText} from 'prismic-reactjs';
// Components
import Credits from '../components/Credits';
import Awards from '../components/Awards';

const Slices = ({doc}) => {
  const {body} = doc;
  const content = body.map(function(item, index) {
    const type = item.slice_type;
    const {items, primary} = item;

    switch (type) {
      case 'credits':
        return <Credits content={primary} key={index} />;
      case 'awards':
        return <Awards content={primary} key={index} />;
      default:
        return null;
    }
    // einde map
  });
  if (content) {
    return content;
  } else {
    return null;
  }
};

const Info = ({doc, toggleInfo, showInfo}) => {
  const {title, subtitle, description, cover_image, body} = doc;

  const backgroundSource = cover_image.url;
  const styleBackground = {
    backgroundImage: `url(${backgroundSource})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  };

  return (
    <div className={`info ${showInfo ? 'is-open' : 'is-closed'}`} style={styleBackground}>
      <h1>{RichText.asText(title)}</h1>
      <Slices doc={doc} />
      <button onClick={() => toggleInfo()}>Close</button>
    </div>
  );
};
export default Info;
