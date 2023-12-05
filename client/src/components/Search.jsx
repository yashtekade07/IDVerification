import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Table,
  TableCaption,
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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from '../redux/actions/user';
import JsonViewer from './CopyJson';
const Search = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);
  const { loading, user } = useSelector((state) => state.user);
  const submitHandler = async (e) => {
    console.log(id);
    e.preventDefault();
    await dispatch(View({ id, name, lastName }));
  };
  const jsonHandler = async (e) => {
    navigator.clipboard
      .writeText(JSON.stringify(user, null, 2))
      .then(() => setCopied(true))
      .catch((err) => console.error('Failed to copy:', err));

    setTimeout(() => setCopied(false), 1500); // Reset copy state after 1.5 seconds
  };
  return (
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
          children={'Search'}
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
      {
        <>
          <HStack>
            {user && (
              <>
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
                          <Th>Json</Th>
                          <Th>Identifiction Number</Th>
                          <Th>Name</Th>
                          <Th>Last Name</Th>
                          <Th>Date of Birth</Th>
                          <Th>Date of Issue</Th>
                          <Th>Date of Expiry</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {user.map((item) => (
                          <Row
                            key={item}
                            item={item}
                            jsonHandler={jsonHandler}
                          />
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            )}

            <Box></Box>
          </HStack>
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
        <Button onClick={jsonHandler}> JSON</Button>
      </Td>
      <Td>#{item.identification_number}</Td>
      <Td>{item.name}</Td>
      <Td>{item.last_name}</Td>
      <Td>{item['date-of-birth']}</Td>
      <Td>{item['date-of-issue']}</Td>
      <Td>{item['date-of-expiry']}</Td>
    </Tr>
  );
}
