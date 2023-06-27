"use client";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import NewModal from "../components/NewModal.js";
import EventList from "../components/EventList.js";
import {
    ChakraProvider,
    Box,
    Stack,
    HStack,
    Spacer,
    Text,
    Avatar,
    Skeleton,
    Spinner,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Stat,
    StatLabel,
    StatNumber,
} from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Giftlax() {
    useEffect(() => {
        // fired on component mount.
        toast({
            title: "Welcome! Good to see you!",
            status: "info",
            duration: 1500,
            isClosable: true,
        });
        return () => {
            // fired on component unmount.
            pb.collection("events").unsubscribe("*");
        };
    }, []);

    const toast = useToast();
    const [data, setData] = useState([]);
    console.log(data);
    const [myJSON, setState] = useState("nothing yet");
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/my-giftlax");
        },
    });
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    
    // when NextAuth session loads in, fetch from db using session email
    useEffect(() => {
        getDatabaseEvents();
    }, [session]);

    async function getDatabaseEvents() {
        // for initial page opening
        // this filter method could be made more secure in the future
        let records = await pb.collection("events").getFullList({
            filter: `email="${session?.user?.email}"`,
            sort: "date",
        });
        setState(JSON.stringify(records));
        setData(records);

        // for live updates
        pb.collection("events").subscribe("*", async function (e) {
            // console.log("update received");

            // this filter method could be made more secure in the future
            records = await pb.collection("events").getFullList({
                filter: `email="${session?.user?.email}"`,
                sort: "date",
            });
            setState(JSON.stringify(records));
            setData(records);
        });
    }

    const current = new Date();
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
    const date = `${monthName} ${current.getDate()}, ${current.getFullYear()}`;

    return (
        <ChakraProvider>
            <HStack spacing="10" ml="40" mr="40" mt="20" mb="20">
                <Box width="100%">
                    <Stack spacing="20px">
                        <HStack spacing="20">
                            <Text fontSize="4xl">
                                <b>Today:</b> {date}
                            </Text>
                            <Spacer />
                            {status === "loading" ? (
                                <Spinner />
                            ) : (
                                <UserBar
                                    name={session?.user?.name}
                                    link={session?.user?.image}
                                    data={data}
                                />
                            )}
                            <NewModal email={session?.user?.email} />
                        </HStack>
                        {status === "loading" ? (
                            <Stack spacing="30px" padding="5">
                                <Skeleton height="180px" />
                                <Skeleton height="180px" />
                                <Skeleton height="180px" />
                            </Stack>
                        ) : (
                            <EventList data={data} />
                        )}
                    </Stack>
                </Box>
            </HStack>
        </ChakraProvider>
    );
}

function UserBar(props) {
    return (
        <ChakraProvider>
            <PopoverStats props={props}/>
        </ChakraProvider>
    );
};

function PopoverStats({ props }) {
    const numEvents = props?.data?.length;
    return (
        <Popover
            placement="left-start"
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <HStack spacing="15px">
                    <Text fontSize="lg">
                        <u><b>{props.name}</b></u>
                    </Text>
                    <Avatar
                        bg="orange.400"
                        size="sm"
                        name={props.name}
                        src={props.link}
                    />{" "}
                </HStack>
            </PopoverTrigger>
            <PopoverContent color="white" bg="orange.600" borderColor="orange.600">
                <PopoverArrow bg="orange.600" />
                <PopoverBody>
                    <Stat>
                        <StatLabel>Total so far</StatLabel>
                        <StatNumber>{numEvents} Events</StatNumber>
                    </Stat>
                </PopoverBody>
                <PopoverFooter
                    border="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={4}
                >
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}
