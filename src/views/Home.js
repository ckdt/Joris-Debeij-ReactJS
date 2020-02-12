// Import Defaults
import React, {useEffect, useState} from 'react';

// Import Prismic
import {client} from '../prismic-configuration';

// Import Views
import NotFound from '../views/NotFound';

// Import Custom Components
import DefaultLayout from '../components/DefaultLayout';
import HomeCover from '../components/HomeCover';

// Component: Cover
const Cover = ({items}) => {
  return (
    <div className="covers">
      {items.map(item => (
        <HomeCover key={item.id} {...item} />
      ))}
    </div>
  );
};

// Page: Home
const Home = () => {
  // States
  const [notFound, toggleNotFound] = useState(false);
  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      // Get single page (home)
      const result = await client.getSingle('home');
      if (result) {
        const {data} = result;
        setDocData(data);

        const covers = data.cover.map((item, index) => ({
          title: item.cover_title,
          id: index,
          slug: item.cover_link,
          video: item.cover_video,
          fallback: item.cover_fallback_image,
          preload: item.cover_preload_image
        }));
        setCoverData(covers);

        return true;
      } else {
        console.warn('404. Page document not found.');
        return toggleNotFound(true);
      }
    };
    fetchData();
  }, []);

  if (data && covers.length > 0) {
    if (covers) {
      return (
        <DefaultLayout title="home">
          <Cover items={covers} />
        </DefaultLayout>
      );
    }
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};
export default Home;
