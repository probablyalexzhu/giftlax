"use client";
import { useEffect } from 'react';
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
    VStack,
    Spacer,
    Text,
    Avatar,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Giftlax() {
    // const session = await getServerSession(authOptions); // culprit: SSR
    const pb = new PocketBase("http://127.0.0.1:8090");

    // protect doc and re-render on new data fetched
    // CAUSES NOT TO RE-RENDER
    // const { data: session } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
    //     },
    // });
    
    // let email = "";
    // let name = "";
    // let imgLink = "";
    // if (typeof session !== "undefined" && session != null) {
    //     name = "react wake up pls";
    //     console.log("REEE")
    //     name = [...session.user.name];
    //     imgLink = session.user.image.slice();
    //     email = session.user.email.slice();
    // }

    // getFullList is DEFINITELY A FUTURE SECURITY ISSUE TO ADDRESS
    // const records = await pb.collection('events').getFullList({
    //     filter: `email="${ email }"`
    // });
    // const myJSON = JSON.stringify(records);

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
            <UserTing />
            <Flex spacing="10" padding="20">
                <GreenButton />
                <Spacer />
                <Box width="95%">
                    <Stack spacing="20px">
                        <Text fontSize="3xl">
                            <b>Today:</b> {date}
                        </Text>
                        <EventList />
                    </Stack>
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export const UserTing = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });
    console.log(session);
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
                <Text>Name: {name}</Text>
            </VStack>
        </ChakraProvider>
    );
};