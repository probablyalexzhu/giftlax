"use client";
import { useEffect, useState } from 'react';
import PocketBase from "pocketbase";
import GreenButton from "../components/GreenButton.js";
import EventList from "../components/EventList.js";
import { User } from "../components/user.component"
import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    HStack,
    Spacer,
    Text,
    Avatar,
    VStack,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Giftlax() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    const [name, updateName] = useState("");
    const [imgLink, updateLink] = useState("");
    const [email, updateEmail] = useState("");

    const myJSON = "";
    if(email != "") {
        // getFullList is DEFINITELY A FUTURE SECURITY ISSUE TO ADDRESS
        const records = await pb.collection('events').getFullList({
            filter: `email="${ email }"`
        });
        const myJSON = JSON.stringify(records);
    }

    console.log("name in parent:" + name);

    const current = new Date();
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = weekday[current.getDay()];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let monthName = month[current.getMonth()];
    const date = `${day} ${monthName} ${current.getDate()}, ${current.getFullYear()}`;

    return (
        <ChakraProvider padding="20">
            {/* <Text>{myJSON}</Text> */}
            <HStack spacing="10" padding="20">
                <Box width="100%">
                    <Stack spacing="20px">
                        
                        <HStack spacing="20">
                            <Text fontSize="4xl">
                                <b>Today:</b> {date}
                            </Text>
                            <Spacer />
                            <UserBar
                                updateName = {updateName}
                                updateEmail = {updateEmail}
                                updateLink = {updateLink}
                            />
                            <Text>FUCK { name } FUCK</Text>
                            <UserBar2
                                name = {name}
                                link = {imgLink}
                            />
                            <GreenButton />
                        </HStack>
                        <EventList />
                    </Stack>
                </Box>
            </HStack>
        </ChakraProvider>
    );
}

export const UserBar = ({updateName, updateEmail, updateLink}) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });
    
    // removes cannot update component while rendering different component warning
    useEffect(() => {
        if (typeof session !== "undefined" && session != null) {
            updateName(session.user.name);
            updateLink(session.user.image);
            updateEmail(session.user.email);
        }
    });    
    console.log(session);
    return (<>💀</>);
};

export const UserBar2 = (props) => {
    return (
        <ChakraProvider>
            <HStack spacing="15px">
                <Text fontSize="lg"><b>{props.name}</b></Text>
                <Avatar bg="orange.400" size="sm" name={props.name} src={props.link} />{" "}
            </HStack>
        </ChakraProvider>
    );
}