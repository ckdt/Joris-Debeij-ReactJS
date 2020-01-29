// React
import React, {useEffect, useState} from 'react';
// Prismic
import Prismic from 'prismic-javascript';
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import CoverVideo from '../components/CoverVideo';
import DefaultLayout from '../components/DefaultLayout';

// Page: Projects
const Projects = ({match}) => {
  const uid = match.params.uid;

  // States
  const [notFound, toggleNotFound] = useState(false);
  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.query(Prismic.Predicates.at('document.tags', [uid]), {
        orderings: '[document.last_publication_date desc]'
      });

      if (result) {
        const {results} = result;
        setDocData(results);

        const covers = results.map(item => ({
          title: item.data.title,
          id: item.id,
          slug: item.uid,
          video: item.data.cover_video,
          fallback: item.data.cover_image
        }));
        setCoverData(covers);

        return true;
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  if (data && covers.length > 0) {
    return (
      <DefaultLayout title="projects">
        <div className="projects">
          {covers.map(cover => (
            <CoverVideo key={cover.id} {...cover} />
          ))}
        </div>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Projects;
