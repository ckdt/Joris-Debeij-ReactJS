import Prismic from 'prismic-javascript';

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = 'https://jorisdebeij.cdn.prismic.io/api/v2';

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken =
  'MC5YanZRelJFQUFDTUFDYjJr.CHDvv70T77-9CQ4-A--_ve-_vRALOC7vv71u77-9Ku-_vUHvv73vv73vv73vv73vv70C77-9Sxzvv73vv70';

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') return `/page/${doc.uid}`;
  if (doc.type === 'project') return `/project/${doc.uid}`;
  return '/';
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, {accessToken});
