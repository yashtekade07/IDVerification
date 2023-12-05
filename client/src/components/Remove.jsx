import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Delete } from '../redux/actions/user.js';
const Remove = () => {
  const [id, setId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector((state) => state.user);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(Delete(id));
    navigate('/');
  };

  return (
    <Container py={'12'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children={'Detele Profile'}
          my={'16'}
          textAlign={['center']}
          textTransform={'uppercase'}
        />
        <VStack spacing={'4'}>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Identifiaction Number'} fontWeight={'bold'} />
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='1234 1234 1234'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme='yellow'
            type='submit'
          >
            Delete
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
export default Remove;
