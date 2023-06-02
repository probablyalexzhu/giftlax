"use client";

import { ChakraProvider, Flex, Box, Spacer, HStack } from "@chakra-ui/react";
import {
    GiftlaxButton,
    HomeButton,
    LoginButton,
    LogoutButton,
} from "./buttons.component";

const Header = () => {
    return (
        <ChakraProvider>
            <Box className="header" bgColor="orange" padding="5">
                <Flex ml="5" mr="10">
                    <HStack>
                        <HomeButton />
                    </HStack>
                    <Spacer />
                    <HStack spacing="40px">
                        <GiftlaxButton />
                        <LoginButton />
                        <LogoutButton />
                    </HStack>
                </Flex>
            </Box>
        </ChakraProvider>
    );
};

export default Header;
