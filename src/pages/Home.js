// React
import React, {useEffect, useState} from 'react';
// Prismic
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import CoverVideo from '../components/CoverVideo';
import DefaultLayout from '../components/DefaultLayout';

// Page: Home
const Home = () => {
  // States
  const [notFound, toggleNotFound] = useState(false);
  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getSingle('home');
      if (result) {
        const {data} = result;

        setDocData(data);
        const covers = data.cover.map((item, index) => ({
          title: item.cover_title,
          id: index,
          slug: item.cover_link,
          video: item.cover_video,
          fallback: item.cover_fallback_image
        }));

        setCoverData(covers);

        return true;
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        return toggleNotFound(true);
      }
    };
    fetchData();
  }, []);

  if (data && covers.length > 0) {
    if (covers) {
      return (
        <DefaultLayout title="home">
          <div className="splash">
            {covers.map(cover => (
              <CoverVideo
                key={cover.id}
                isHomeCover={true}
                showPlayControl={false}
                showInfoControl={false}
                {...cover}
              />
            ))}
          </div>
        </DefaultLayout>
      );
    }
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Home;
