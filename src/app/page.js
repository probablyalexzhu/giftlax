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
import { Spacer,
    Text
} from "@chakra-ui/react";
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
    const current = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = weekday[current.getDay()];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let monthName = month[current.getMonth()]
    const date = `${day} ${monthName} ${current.getDate()}, ${current.getFullYear()}`;
    return (
        <ChakraProvider theme={theme} padding="20">
            <Flex spacing="10" padding="20">  
                    <GreenButton />
                    <Spacer />
                    <Box width="95%">  
                        <Text fontSize='2xl'><b>Today:</b> {date}</Text>
                        <Accordion />
                    </Box>
            </Flex>
        </ChakraProvider>
    );
}
