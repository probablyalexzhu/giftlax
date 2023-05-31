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
    ProfileButton,
    RegisterButton,
} from "./buttons.component";
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

// const Header = () => {
//   return (
//     <header className='flex h-24 flex-col justify-center bg-stone-100'>
//       <nav className='container'>
//         <ul className='flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500'>
//           <li className='text-sm'>
//             <Link href='/'>Home</Link>
//           </li>
//           <li className='text-sm'>
//             <Link href='/protected/'>Protected (client)</Link>
//           </li>
//           <li>
//             <LoginButton />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   )
// }

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
