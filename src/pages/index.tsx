import Head from 'next/head';

import Collection from '@/components/collection';
import { Page } from '@/routes';

const Index = () => (
  <>
    <Head>
      <title>GameDB</title>
    </Head>
    <Collection page={Page.Collection} />
  </>
);

export default Index;
