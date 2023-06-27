"use client"
import {
    ChakraProvider,
    Flex,
    Box,
    Spacer,
    HStack
} from "@chakra-ui/react";
import {
    GiftlaxButton,
    HomeButton,
    LoginButton,
    LogoutButton,
    ChatButton,
} from "./buttons.component";
import { useSession } from "next-auth/react";

const Header = () => {
    const { data : session } = useSession();

    return (
        
        <ChakraProvider>
            <Box className="header" bgColor="orange">
                <Flex ml="5" mr="10">
                    <HStack>
                        <HomeButton />
                    </HStack>
                    <Spacer />
                    <HStack spacing="40px" padding="5">
                        <GiftlaxButton />
                        <ChatButton />
                        {
                            typeof session !== 'undefined' && session != null ? (
                                <LogoutButton />
                            ) : (<LoginButton />)
                        }
                    </HStack>
                </Flex>
            </Box>
        </ChakraProvider>
    );
};

export default Header;
