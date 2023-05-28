"use client";

// import Image from 'next/image'
// import styles from './page.module.css'
import GreenButton from "./components/GreenButton.js";
import Accordion from "./components/Accordion.js";
import { Fragment } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
// import { CacheProvider } from '@chakra-ui/next-js'
// import { Providers } from "./providers";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    // brand: {
    //   900: '#1a365d',
    //   800: '#153e75',
    //   700: '#2a69ac',
    // },
};

export const theme = extendTheme({ colors });

export default function Home() {
    return (
        <Container centerContent>
            <Box padding='80' bg='blue.400' color='black' maxW='md'>
                <ChakraProvider theme={theme}>
                    <Fragment>
                        <GreenButton />
                        <Accordion />
                    </Fragment>
                </ChakraProvider>
            </Box>
        </Container>
    );
}
