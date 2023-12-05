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
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../redux/actions/history.js';
import toast from 'react-hot-toast';
import ReactJson from 'react-json-view';
const History = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [request, setRequest] = useState('');
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const { loading, history, message, error } = useSelector(
    (state) => state.history
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      getHistory({ id, name: name, last_name: lastName, request: request })
    );
  };
  const jsonHandler = async () => {
    navigator.clipboard
      .writeText(JSON.stringify(history, null, 2))
      .then(() => setCopied(true))
      .catch((err) => console.error('Failed to copy:', err));

    setTimeout(() => setCopied(false), 1500); // Reset copy state after 1.5 seconds
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
    dispatch(
      getHistory({ id, name: name, last_name: lastName, request: request })
    );
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
            textTransform={'uppercase'}
            textAlign={['center']}
            my={'16'}
            children={'History'}
          />
          <VStack spacing={'4'}>
            <VStack alignItems={'flex-start'} w={'full'}>
              <Text children={'Identification Number'} fontWeight={'bold'} />
              <Input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder='Search By Identification Number'
                type='text'
                focusBorderColor='yellow.500'
              />
            </VStack>
            <VStack alignItems={'flex-start'} w={'full'}>
              <Text children={'First Name'} fontWeight={'bold'} />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Search By Name'
                type='text'
                focusBorderColor='yellow.500'
              />
            </VStack>
            <VStack alignItems={'flex-start'} w={'full'}>
              <Text children={'Last Name'} fontWeight={'bold'} />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Search By Last Name...'
                type='text'
                focusBorderColor='yellow.500'
              />
            </VStack>
            <VStack alignItems={'flex-start'} w={'full'}>
              <Text children={'Request'} fontWeight={'bold'} />
              <Input
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder='Search By Request...'
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
              Submit
            </Button>
          </VStack>
        </form>
        <>
          <Box p={['0', '12']} overflowX={'auto'}>
            <TableContainer maxWw={['70vw', 'full']}>
              <Table variant={'simple'} size={'lg'}>
                <Thead>
                  <Tr>
                    <Th>JSON</Th>
                    <Th>Success</Th>
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
                      .map((item, _) => (
                        <Row key={_} item={item} jsonHandler={jsonHandler} />
                      ))
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

function Row({ item, jsonHandler }) {
  return (
    <Tr>
      <Td>
        <Td>
          <ReactJson src={item} collapsed={true} />
        </Td>
        <Button onClick={jsonHandler}> copy</Button>
      </Td>
      <Td>{item.success === true ? 'Success' : 'Fail'}</Td>
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
