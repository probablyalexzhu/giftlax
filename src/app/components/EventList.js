import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EventItem from "./EventItem.js";

export default function EventList({ data }) {
    return (
        <Tabs variant="soft-rounded" colorScheme="orange">
            <TabList>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <div>
                        {data.map((item) => (
                            // just add a key for no warning
                            item?.completed == false ?
                                <EventItem key={item?.id} item={item} isComplete={false}/>
                            :
                            <div></div>
                        ))}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div>
                        {data.toReversed().map((item) => ( // reverse for completed
                            // just add a key for no warning
                            item?.completed == true ?
                                <EventItem key={item?.id} item={item} isComplete={true}/>
                            :
                            <div></div>
                        ))}
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
