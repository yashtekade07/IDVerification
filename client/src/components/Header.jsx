import React from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme='yellow'
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top={'6'}
        left={'6'}
        zIndex={'overlay'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>Thai ID card</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems='flex-start'>
              <LinkButton onClose={onClose} url='/' title='Home' />
              <LinkButton onClose={onClose} url='/search' title='Search' />
              <LinkButton onClose={onClose} url='/update' title='Update' />
              <LinkButton onClose={onClose} url='/remove' title='Delete' />
              <LinkButton onClose={onClose} url='/history' title='History' />
              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width='80&'
              ></HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
