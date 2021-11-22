import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreateServiceMutation } from '../generated/graphql';
import { CreateUrqlClient } from '../utils/CreateUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

const createService: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createService] = useCreateServiceMutation();

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', description: '', price: 0 }}
        onSubmit={async values => {
          const { error } = await createService({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='title'
              placeholder='title'
              label='title'
            ></InputField>
            <Box mt={4}>
              <InputField
                textarea
                name='description'
                placeholder='description...'
                label='description'
              ></InputField>
            </Box>
            <InputField
              name='price'
              placeholder='price'
              label='price'
              type='number'
            ></InputField>
            <Button type='submit' color='teal' mt={4} isLoading={isSubmitting}>
              Create service
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(CreateUrqlClient)(createService);
