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
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const uid = match.params.uid;

  useEffect(() => {
    const fetchData = async () => {
      const tag = [];
      tag.push(uid);

      const result = await client.query(Prismic.Predicates.at('document.tags', tag), {
        orderings: '[document.last_publication_date desc]'
      });

      if (result) {
        return setDocData(result);
      } else {
        console.warn('Page document not found. Make sure it exists in your Prismic repository');
        toggleNotFound(true);
      }
    };
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    const projects = doc.results;

    return (
      <DefaultLayout title="projects">
        <section className="projects">
          {projects.map(project => (
            <Cover key={project.id} coverType="video" {...project.data.cover[0]} />
          ))}
        </section>
      </DefaultLayout>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Projects;
