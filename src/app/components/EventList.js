import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventItem from "./EventItem.js";

export default function EventList({ data }) {
    console.log(data);
    const pendingData = data.filter(item => item?.completed == false);
    const completedData = data.filter(item => item?.completed == true);
    return (
        <Tabs variant="enclosed-colored" colorScheme="orange">
            <TabList>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    {pendingData.map((item) =>
                        <EventItem
                            key={item?.id}
                            item={item}
                            isComplete={false}
                        />
                    )}
                </TabPanel>
                <TabPanel>
                        {completedData.toReversed().map((item) =>
                            <EventItem
                                key={item?.id}
                                item={item}
                                isComplete={true}
                            />
                        )}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
