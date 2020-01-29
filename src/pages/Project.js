// React
import React, {useEffect, useState} from 'react';
// Prismic
import Prismic from 'prismic-javascript';
import {RichText} from 'prismic-reactjs';
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import DefaultLayout from '../components/DefaultLayout';
import VideoCarousel from '../components/VideoCarousel';
import VideoPlayer from '../components/VideoPlayer';

const Slices = ({doc}) => {
  const {body} = doc;
  const content = body.map(function(item, index) {
    const type = item.slice_type;
    const {items} = item;
    const {primary} = item;

    console.log(primary);

    switch (type) {
      case 'video':
        return (
          <VideoPlayer
            fallback={primary.fallback_image.url}
            url={primary.video_source.url}
            playing={true}
          />
        );
      case 'series':
        return <VideoCarousel videos={items} />;
      case 'image':
        return null;
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

// const Content = ({doc}) => {
//   if (doc) {
//     console.log(doc);
//     const content = doc.body.map(function(slice, index) {
//       const type = slice.slice_type;
//       switch (type) {
//         case 'video':
//           console.log('video', slice);
//           return <VideoPlayer url={slice.primary.link.url} />;
//         case 'videos':
//           return <VideoCarousel videos={videoData} />;
//         case 'image':
//           return <div></div>;
//         default:
//           return null;
//       }
//     });
//   }
//   return null;
// };

// Page: Project
const Project = ({match}) => {
  const uid = match.params.uid;

  // States
  const [notFound, toggleNotFound] = useState(false);
  const [doc, setDocData] = useState(null);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getByUID('project', uid);

      if (result) {
        const {data} = result;
        console.log(data);
        setDocData(data);

        // We use the State hook to save the document
        return true;
      } else {
        // Otherwise show an error message
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (
      <DefaultLayout>
        <div className="page">
          <h1>{RichText.asText(doc.title)}</h1>
          <Slices doc={doc} />
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Project;
