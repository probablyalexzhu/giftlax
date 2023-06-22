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
} from "@chakra-ui/react";
import { useState } from "react";
import EventItem from "./EventItem.js";

export default function EventList({ data }) {
    const pendingData = data.filter((item) => item?.completed == false);
    const completedData = data.filter((item) => item?.completed == true);

    let pendingDataComponent;
    if (pendingData.length == 0) {
        pendingDataComponent = <GiftlaxImage text="No pending events" />;
    } else {
        pendingDataComponent = <EventsListed thisData={pendingData} />;
    }

    let completedDataComponent;
    if (completedData.length == 0) {
        completedDataComponent = <GiftlaxImage text="No completed events" />;
    } else {
        completedDataComponent = <EventsListed thisData={completedData} />;
    }
    // console.log(data);
    // console.log(pendingData.length);
    // console.log(completedData.length);

    return (
        <Tabs variant="enclosed-colored" colorScheme="orange">
            <TabList>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>{pendingDataComponent}</TabPanel>
                <TabPanel>{completedDataComponent}</TabPanel>
            </TabPanels>
        </Tabs>
    );
}

function EventsListed({ thisData }) {
    return thisData.map((item) => (
        <EventItem key={item?.id} item={item} isComplete={false} />
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
