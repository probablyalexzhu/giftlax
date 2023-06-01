// code from https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
"use client";

import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import React from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  extendTheme,
  Stack,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";

export const LoginButton = () => {
  return (
    <Button color='white' variant='link'onClick={() => signIn()}>Log In</Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button color='white' variant='link'onClick={() => signOut()}>Log Out</Button>
  );
};

export const LoginButton2 = (props) => {
  const { name } = props;
  if(name == "") {
    return (
      <Button colorScheme='green' size='lg' variant='solid' onClick={() => signIn()}>Log In</Button>
    );
  } else {
    return (
      <NextLink href='/my-giftlax' passHref>
        <Button colorScheme='green' size='lg' variant='solid'>Open Giftlax</Button>
      </NextLink>
    );
  }
  
};