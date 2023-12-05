import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../redux/actions/history.js';
import toast from 'react-hot-toast';
const History = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const { loading, history, message, error } = useSelector(
    (state) => state.history
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getHistory({ id, name, lastName }));
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
    dispatch(getHistory({ id, name, lastName }));
  }, [dispatch, message, error]);
  return (
    <>
      <Container
        minH={'95vh'}
        maxW='container.lg'
        paddingY={'8'}
        justifyContent={'center'}
        alignItems={['center']}
      >
        <form onSubmit={submitHandler}>
          <Heading
            alignItems={['center']}
            maxW={'200px'}
            fontFamily={'sans-serif'}
            noOfLines={3}
            size={'xl'}
            children={'History'}
            pb={20}
          />
          <Text children={'Identification Number'} fontWeight={'bold'} />
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder='Search By Identification Number'
            type='text'
            focusBorderColor='yellow.500'
          />
          <Text children={'First Name'} fontWeight={'bold'} />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Search By Name'
            type='text'
            focusBorderColor='yellow.500'
          />
          <Text children={'Last Name'} fontWeight={'bold'} />
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Search By Last Name...'
            type='text'
            focusBorderColor='yellow.500'
          />
          <Button
            isLoading={loading}
            w={'full'}
            colorScheme='yellow'
            type='submit'
          >
            Submit
          </Button>
        </form>
        <>
          <Box p={['0', '12']} overflowX={'auto'}>
            <Heading
              textTransform={'uppercase'}
              textAlign={['center', 'left']}
              my={'16'}
              children={'History'}
            />
            <TableContainer w={['100vw', 'full']}>
              <Table variant={'simple'} size={'lg'}>
                <Thead>
                  <Tr>
                    <Th>Request</Th>
                    <Th>Message</Th>
                    <Th>Identifiction Number</Th>
                    <Th>Name</Th>
                    <Th>Last Name</Th>
                    <Th>Date of Birth</Th>
                    <Th>Date of Issue</Th>
                    <Th>Date of Expiry</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {history &&
                    history
                      .map((item) => <Row key={item} item={item} />)
                      .reverse()}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      </Container>
    </>
  );
};

export default History;

function Row({ item }) {
  return (
    <Tr>
      <Td>{item.request}</Td>
      <Td>{item.message}</Td>
      <Td>{item.identification_number}</Td>
      <Td>{item.name}</Td>
      <Td>{item.last_name}</Td>
      <Td>{item['date-of-birth']}</Td>
      <Td>{item['date-of-issue']}</Td>
      <Td>{item['date-of-expiry']}</Td>
    </Tr>
  );
}
