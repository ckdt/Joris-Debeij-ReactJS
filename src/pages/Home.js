// React
import React, {useEffect, useState} from 'react';
// Prismic
import {client, linkResolver} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import Cover from '../components/Cover';
import DefaultLayout from '../components/DefaultLayout';
// Slug formats
import slugify from 'react-slugify';

const Home = () => {
  const [doc, setDocData] = useState({
    data: null,
    covers: null
  });
  const [notFound, toggleNotFound] = useState(false);
  const slug = 'home';

  // ComponentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const result = await client.getSingle(slug);
      if (result) {
        return setDocData({
          data: result.data,
          covers: result.data.cover
        });
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        return toggleNotFound(true);
      }
    };
    fetchData();
  }, [slug]);

  // Get vars
  const {data, covers} = doc;

  if (data) {
    if (covers) {
      return (
        <DefaultLayout title="home">
          <div className="splash">
            {covers.map(cover => (
              <Cover
                key={slugify(cover.cover_title[0].text)}
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
  }
  return null;
};

export default Home;
