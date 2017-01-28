import algoliasearch from 'algoliasearch';


const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCHONLY_API_KEY);
const index = client.initIndex('images');


export default index;
