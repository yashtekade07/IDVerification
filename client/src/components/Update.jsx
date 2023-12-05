import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Upload, Update as UpdateProfile } from '../redux/actions/user.js';
import toast from 'react-hot-toast';
const Update = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [newId, setNewId] = useState();
  const [lastname, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [dateOfIssue, setDateOfIssue] = useState();
  const [dateOfExpiry, setDateOfExpiry] = useState();
  const { loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const submitHandler = async (e) => {
    console.log(id);
    e.preventDefault();
    await dispatch(
      UpdateProfile(
        id,
        name,
        newId,
        lastname,
        dateOfBirth,
        dateOfIssue,
        dateOfExpiry
      )
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [message, error]);
  return (
    <Container py={'12'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children={'Update Details'}
          my={'16'}
          textAlign={['center']}
          textTransform={'uppercase'}
        />
        <VStack spacing={'4'}>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Identification Number'} fontWeight={'bold'} />
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder='1234 1234 1234'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'New Identifiaction Number'} fontWeight={'bold'} />
            <Input
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder='1234 1234 1234'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Name'} fontWeight={'bold'} />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Abc '
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Last Name'} fontWeight={'bold'} />
            <Input
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Def'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Date of Birth'} fontWeight={'bold'} />
            <Input
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder='YYYY-MM-DD'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Date of Issue'} fontWeight={'bold'} />
            <Input
              value={dateOfIssue}
              onChange={(e) => setDateOfIssue(e.target.value)}
              placeholder='YYYY-MM-DD'
              type='text'
              focusBorderColor='yellow.500'
            />
          </VStack>
          <VStack alignItems={'flex-start'} w={'full'}>
            <Text children={'Date of Expiry'} fontWeight={'bold'} />
            <Input
              value={dateOfExpiry}
              onChange={(e) => setDateOfExpiry(e.target.value)}
              placeholder='YYYY-MM-DD'
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
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
export default Update;
