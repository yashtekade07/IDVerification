import React from 'react';
import { useState } from 'react';
import {
  Button,
  Input,
  Stack,
  VStack,
  Box,
  Avatar,
  Tr,
  Td,
  Text,
  HStack,
  Heading,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload } from '../redux/actions/user.js';
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  // marginTop: '20px',
};
const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageDetails, setImageDetails] = useState(null);
  const [image, setImage] = useState(null);
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorMessage('File size exceeds 2MB. Please choose a smaller file.');
      setSelectedImage(null);
    } else {
      setErrorMessage('');
      setSelectedImage(file);
    }
    if (localStorage.getItem('uploadedImage')) {
      localStorage.removeItem('uploadedImage');
    }
  };
  const handleUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageBase64 = reader.result.split(',')[1];
        localStorage.setItem('uploadedImage', reader.result);

        try {
          const response = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDM3dIqJUYPjiu87e1XQWqR2X_ejGC3O2o`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                requests: [
                  {
                    image: {
                      content: imageBase64,
                    },
                    features: [
                      {
                        type: 'TEXT_DETECTION',
                      },
                    ],
                  },
                ],
              }),
            }
          );

          const data = await response.json();
          console.log(data);
          const extractedFields = extractFields(data); // Extract specific fields
          setImageDetails(extractedFields);
          console.log(extractedFields);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
    const extractFields = (data) => {
      const extractedFields = {
        identification_number: '',
        name: '',
        last_name: '',
        'date-of-birth': '',
        'date-of-issue': '',
        'date-of-expiry': '',
      };

      if (data?.responses && data.responses[0]?.textAnnotations) {
        const textAnnotations = data.responses[0].textAnnotations;
        const text = textAnnotations[0]?.description || '';

        // English part regex patterns
        const englishPatterns = {
          identification_number: '',
          name: /Name (.+?)\n/,
          last_name: /Last name (.+?)\n/,
          'date-of-birth': /Date of Birth (.+?)\n/,
          'date-of-issue': /Date of Issue (.+?)\n/,
          'date-of-expiry': /Date of Expiry (.+?)\n/,
        };

        Object.keys(englishPatterns).forEach((field) => {
          const match = text.match(englishPatterns[field]);
          if (match && match.length > 1) {
            extractedFields[field] = match[1].trim();
          }
        });

        // Fallback to native language for missing fields
        if (!extractedFields.identification_number) {
          const nativeIdMatch = text.match(/เลขประจำตัวประชาชน\n(.+?)\n/);
          if (nativeIdMatch && nativeIdMatch.length > 1) {
            extractedFields.identification_number = nativeIdMatch[1].trim();
          }
        }

        if (!extractedFields.date_of_issue) {
          const nativeIssueMatch = text.match(/วันออกบัตร\n(.+?)\n/);
          if (nativeIssueMatch && nativeIssueMatch.length > 1) {
            extractedFields['date-of-issue'] = nativeIssueMatch[1].trim();
          }
        }

        if (!extractedFields.date_of_expiry) {
          const nativeExpiryMatch = text.match(/วันบัตรหมดอายุ\n(.+?)\n/);
          if (nativeExpiryMatch && nativeExpiryMatch.length > 1) {
            extractedFields['date-of-expiry'] = nativeExpiryMatch[1].trim();
          }
        }
      }
      dispatch(
        Upload(
          extractedFields.identification_number,
          extractedFields.name,
          extractedFields.last_name,
          extractedFields['date-of-birth'],
          extractedFields['date-of-issue'],
          extractedFields['date-of-expiry']
        )
      );
    };
  };

  return (
    <div className='container'>
      <Stack
        direction={['column', 'row']}
        height='100%'
        display={'flex'}
        justifyContent={['center', 'space-between']}
        alignItems='center'
        spacing={['16', '56']}
      >
        <VStack width={'full'} alignItems={['center']} spacing={'8'}>
          <div>
            <Box my={'-8'} display={'flex'} justifyContent={'center'}>
              <Avatar src={selectedImage} size={'xl'} mt={'50px'} mb={'40px'} />
            </Box>
            <Input
              accept='image/*'
              required
              type='file'
              focusBorderColor='purple.300'
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={handleImageChange}
            />
            <Button isLoading={loading} onClick={handleUpload} mt={'4px'}>
              Upload
            </Button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
                            <Th>Identifiction Number</Th>
                            <Th>Name</Th>
                            <Th>Last Name</Th>
                            <Th>Date of Birth</Th>
                            <Th>Date of Issue</Th>
                            <Th>Date of Expiry</Th>
                          </Tr>
                        </Thead>
                        <Tbody>{user && <Row item={user} />}</Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Box></Box>
                </HStack>
              </>
            )}
          </div>
        </VStack>
      </Stack>
    </div>
  );
};
export default Home;
function Row({ item }) {
  return (
    <Tr>
      <Td>{item.identification_number}</Td>
      <Td>{item.name}</Td>
      <Td>{item.last_name}</Td>
      <Td>{item['date-of-birth']}</Td>
      <Td>{item['date-of-issue']}</Td>
      <Td>{item['date-of-expiry']}</Td>
    </Tr>
  );
}
