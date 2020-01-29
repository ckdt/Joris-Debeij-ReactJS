// React
import React, {useEffect, useState} from 'react';
// Prismic
import {client} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import Cover from '../components/Cover';
import DefaultLayout from '../components/DefaultLayout';
// Slug formats
import slugify from 'react-slugify';

const Home = () => {
  const slug = 'home';

  const [notFound, toggleNotFound] = useState(false);

  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getSingle(slug);
      if (result) {
        setDocData(result.data);
        setCoverData(result.data.cover);

        console.log(result);
        return true;
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        return toggleNotFound(true);
      }
    };
    fetchData();
  }, [slug]);

  if (data && covers.length > 0) {
    if (covers) {
      return (
        <DefaultLayout title="home">
          <div className="splash">
            {covers.map(cover => (
              <Cover
                key={slugify(cover.cover_link)}
                slug={slugify(cover.cover_link)}
                coverType="video"
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
