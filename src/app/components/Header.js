"use client";

import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    Spacer,
    Text,
    Button,
    HStack,
} from "@chakra-ui/react";
import {
    LoginButton,
    LogoutButton,
} from "./buttons.component";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

const Header = () => {
    return (
        <ChakraProvider>
            <Box className="header" bg="orange" padding="5">
                <Flex>
                    <HStack spacing="20px">
                        <Link as={NextLink} fontSize='lg' color='white' href='/'>
                            Home
                        </Link>
                        <Link as={NextLink} fontSize='lg' color='white' href='/my-giftlax'>
                            My Giftlax
                        </Link>
                    </HStack>
                    <Spacer/>
                    <HStack spacing="20px">
                        <LoginButton />
                        <LogoutButton />
                    </HStack>
                </Flex>
            </Box>
        </ChakraProvider>
    );
};

export default Header;
