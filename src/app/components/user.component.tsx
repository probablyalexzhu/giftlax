import React from "react";
import { ChakraProvider, Avatar, Text, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { LoginButton2 } from "./buttons.component";

export const User = () => {
    const { data: session } = useSession();
    let name = "";
    let imgLink = "";
    if (typeof session !== "undefined" && session != null) {
        name = session.user.name;
        imgLink = session.user.image;
    }
    
    return (
        <ChakraProvider>
            <Avatar bg="orange.400" size="xl" name={name} src={imgLink} />{" "}
            <VStack spacing="20px">
                <NameText name={name} />
                <LoginButton2 name={name} />
            </VStack>
        </ChakraProvider>
    );
};

function NameText(props) {
    const { name } = props;
    if (name == "") {
        return <Text>You are not signed in!</Text>;
    } else {
        return <Text>{name} is signed in!</Text>;
    }
}
