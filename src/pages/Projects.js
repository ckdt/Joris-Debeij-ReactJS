// React
import React, {useEffect, useState} from 'react';
// Prismic
import Prismic from 'prismic-javascript';
import {client, linkResolver} from '../prismic-configuration';
// 404
import NotFound from './NotFound';
// Components
import Cover from '../components/Cover';
import ProjectCard from '../components/ProjectCard';
import DefaultLayout from '../components/DefaultLayout';
// Slug formats
import slugify from 'react-slugify';

const Projects = ({match}) => {
  const uid = match.params.uid;
  const [notFound, toggleNotFound] = useState(false);

  const [data, setDocData] = useState(null);
  const [covers, setCoverData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tag = [];
      tag.push(uid);

      const result = await client.query(Prismic.Predicates.at('document.tags', tag), {
        orderings: '[document.last_publication_date desc]'
      });
      if (result) {
        const newData = result.results;
        setDocData(newData);

        const newCovers = newData
          .filter(item => item.data.cover[0])
          .map(item => item.data.cover[0]);

        setCoverData(newCovers);

        return true;
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]);

  if (data && covers.length > 0) {
    console.log(covers);
    return (
      <DefaultLayout title="projects">
        <div class="projects">
          {covers.map(cover => (
            <Cover key={`${slugify(cover.cover_title[0].text)}`} coverType="video" {...cover} />
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
