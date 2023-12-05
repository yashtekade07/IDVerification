import {
  Box,
  Button,
  Container,
  HStack,
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
  flexbox,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '../redux/actions/user';
import ReactJson from 'react-json-view';
import toast from 'react-hot-toast';
const Search = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState();
  const [dateOfIssue, setDateOfIssue] = useState();
  const [dateOfExpiry, setDateOfExpiry] = useState();
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const { loading, user, message, error } = useSelector((state) => state.user);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(View({ id, name: name, last_name: lastname }));
  };
  const jsonHandler = async () => {
    navigator.clipboard
      .writeText(JSON.stringify(user, null, 2))
      .then(() => setCopied(true))
      .catch((err) => console.error('Failed to copy:', err));

    setTimeout(() => setCopied(false), 1500); // Reset copy state after 1.5 seconds
  };
  useEffect(() => {
    toast.error(error);
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    // dispatch(View({ id, name, lastName }));
  }, [message, error, dispatch]);

  return (
    <Container py={'12'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children={'Search'}
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
            Search
          </Button>
        </VStack>
      </form>
      {
        <>
          {user && (
            <>
              <HStack>
                <Box p={['0', '12']} overflowX={'auto'}>
                  <Heading
                    textTransform={'uppercase'}
                    textAlign={['center', 'left']}
                    my={'16'}
                    children={'All Users'}
                  />
                  <TableContainer w={['100vw', 'full']}>
                    <Table variant={'simple'} size={'lg'}>
                      <Thead>
                        <Tr>
                          <Th>JSON</Th>
                          <Th>Identification Number</Th>
                          <Th>Name</Th>
                          <Th>Last Name</Th>
                          <Th>Date of Birth</Th>
                          <Th>Date of Issue</Th>
                          <Th>Date of Expiry</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {user.length > 0 &&
                          user.map((item) => (
                            <Row item={item} jsonHandler={jsonHandler} />
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </HStack>
            </>
          )}

          <Box></Box>
        </>
      }
    </Container>
  );
};

export default Search;
function Row({ item, jsonHandler }) {
  return (
    <Tr>
      <Td>
        <Td>
          <ReactJson src={item} collapsed={true} />
        </Td>
        <Button onClick={jsonHandler}> copy</Button>
      </Td>
      <Td>{item.identification_number}</Td>
      <Td>{item.name}</Td>
      <Td>{item.last_name}</Td>
      <Td>{item['date-of-birth']}</Td>
      <Td>{item['date-of-issue']}</Td>
      <Td>{item['date-of-expiry']}</Td>
    </Tr>
  );
}
