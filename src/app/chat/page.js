"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
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
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,
    Card,
    Heading,
} from "@chakra-ui/react";
import PocketBase from "pocketbase";
import ChatBox from "../components/ChatBox.js";

export default function Chat() {
    useEffect(() => {
        // fired on component mount.
        return () => {
            // fired on component unmount.
            pb.collection("chat").unsubscribe("*");
        };
    }, []);

    const [data, setData] = useState([]);
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/callback/google?callbackUrl=/chat");
        },
    });
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const [message, setMessage] = useState("");
    const handleMessageChange = (event) => setMessage(event.target.value);

    console.log(session);
    console.log(session?.user?.name);
    console.log(session?.user?.image);

    // when NextAuth session loads in, fetch from db using session email
    useEffect(() => {
        getDatabaseEvents();
    }, [session]);

    async function getDatabaseEvents() {
        // for initial page opening
        // this filter method could be made more secure in the future
        let records = await pb.collection("chat").getList(1, 5, {});
        setData(records);

        // for live updates
        pb.collection("events").subscribe("*", async function (e) {
            // console.log("update received");

            // this filter method could be made more secure in the future
            records = await pb.collection("chat").getList(1, 5, {});
            setData(records);
        });
    }

    console.log("records!")
    console.log(data);

    function handleSubmit() {
        createDatabaseEvent();
    }

    async function createDatabaseEvent() {
        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
        console.log("hello");
        console.log(session?.user?.name);
        console.log(message);
        // create data
        const data = {
            name: session?.user?.name,
            avatarUrl: session?.user?.image,
            message: message,
        };

        const record = await pb.collection("chat").create(data);
    }

    return (
        <ChakraProvider>
            <Center spacing="20px">
                <HStack width="50%" mt="100px" >
                    <Stack>
                    <Text fontSize="4xl">
                                <b>Chat</b>
                            </Text>
                {status === "loading" ? (
                    <Stack spacing="30px" padding="5">
                        <Skeleton height="180px" />
                    </Stack>
                ) : (
                    
                        <ChatBox data={data} />
                    
                )}
                    </Stack>
                </HStack>
            </Center>
            <Center mt="50px">
            <HStack width="50%">
                <FormControl isRequired>
                    <Input
                        placeholder="Message other Giftlax users"
                        value={message}
                        onChange={handleMessageChange}
                    />
                </FormControl>
                <Button
                    colorScheme="green"
                    mr={3}
                    onClick={() => handleSubmit()}
                >
                    Send
                </Button>
            </HStack>
            </Center>
            <Center mt="20px">
            <HStack width="50%">
            {status === "loading" ? (
                    <Spinner />
                ) : (
                    <UserBar
                        name={session?.user?.name}
                        link={session?.user?.image}
                    />
                )}
            </HStack>
            </Center>
        </ChakraProvider>
    );
}

function UserBar(props) {
    console.log("propagations");
    console.log(props);

    return (
        <HStack>
            <Avatar
                bg="orange.400"
                size="sm"
                name={props?.name}
                src={props?.link}
            />{" "}
            <Text fontSize="lg">
                    {props?.name}
            </Text>
        </HStack>
    );
}
