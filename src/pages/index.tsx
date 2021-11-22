import { withUrqlClient } from 'next-urql';
import { CreateUrqlClient } from '../utils/CreateUrqlClient';
import { useServicesQuery } from '../generated/graphql';
import { Layout } from '../components/Layout';
import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';

const Index = () => {
  const [{ data }] = useServicesQuery();

  return (
    <Layout>
      <NextLink href='/create-service'>
        <Link>Create Service</Link>
      </NextLink>
      <div>MONME</div>
      <hr />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.services.map(service => (
          <div key={service.id}>{service.title}</div>
        ))
      )}
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient, { ssr: true })(Index);
