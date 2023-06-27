import { useState } from "react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Image,
    HStack,
    ScaleFade,
    Box,
    Avatar,
    Stack,
} from "@chakra-ui/react";
import EventItem from "./EventItem.js";

export default function ChatBox({ data }) {
    
    return (
        <Box>
            <EventsListed thisData={data}/>
        </Box>
    );
}

function EventsListed({ thisData }) {
    return thisData.map((item) => (
        <Box key={item?.id} mt="5">
            <HStack>
                <Avatar
                    bg="orange.400"
                    size="md"
                    name={item?.name}
                    src={item?.avatarUrl}
                />{" "}
                <Stack>
                    <Text>
                        <b>{item?.name}</b>
                    </Text>
                    <Text>
                        {item?.message}
                    </Text>
                </Stack>
                
            </HStack>
            
        </Box>
    ));
}

function GiftlaxImage({ text }) {
    const [isDelayed, setIsDelayed] = useState(true);
    setTimeout(() => {
        setIsDelayed(false);
    }, 500);
    return !isDelayed ? (
        <ScaleFade in={true}>
            <HStack spacing="10" padding="5">
                <Image
                    src="/logoOnlyGrey.png"
                    alt="Giftlax Logo Grey"
                    width="50"
                    height="50"
                    style={{ width: "100px", height: "100px" }}
                />
                <Text fontSize="xl" color="grey">
                    {text}
                </Text>
            </HStack>
        </ScaleFade>
    ) : (<div></div>);
}
