import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Image, HStack, ScaleFade } from "@chakra-ui/react";
import EventItem from "./EventItem.js";

export default function EventList({ data }) {
    const pendingData = data.filter(item => item?.completed == false);
    const completedData = data.filter(item => item?.completed == true);

    let pendingDataComponent;
    if(pendingData.length == 0) {
        pendingDataComponent =
        <ScaleFade in={true}>
            <HStack spacing="10" padding="5">
                <Image
                    src="/logoOnlyGrey.png"
                    alt="Giftlax Logo Grey"
                    width="50"
                    height="50"
                    style={{ width: "100px", height: "100px" }}
                />
                <Text fontSize="xl" color="grey">No pending events</Text>
            </HStack>
        </ScaleFade>
        ;
    } else {
        pendingDataComponent = <EventsListed thisData={pendingData}/>
    }

    let completedDataComponent;
    if(completedData.length == 0) {
        completedDataComponent =
        <ScaleFade in={true}>
            <HStack spacing="10" padding="5">
                <Image
                    src="/logoOnlyGrey.png"
                    alt="Giftlax Logo Grey"
                    width="50"
                    height="50"
                    style={{ width: "100px", height: "100px" }}
                />
                <Text fontSize="xl" color="grey">No completed events</Text>
            </HStack>
        </ScaleFade>
        ;
    } else {
        completedDataComponent = <EventsListed thisData={completedData}/>
    }
    console.log(pendingData.length);
    console.log(completedData.length);

    return (
        <Tabs variant="enclosed-colored" colorScheme="orange">
            <TabList>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {pendingDataComponent}
                </TabPanel>
                <TabPanel>
                    {completedDataComponent}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

function EventsListed({thisData}) {
    return (
        thisData.map((item) =>
            <EventItem
                key={item?.id}
                item={item}
                isComplete={false}
            />
        )
    );
}