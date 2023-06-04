import { Button, Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function GreenButton() {
    return (
        // <button className={styles.greenbutton}>+</button>
        <Box padding="5">
            <Button
                size="lg"
                colorScheme="green"
                rightIcon={<AddIcon />}
                aria-label="Add Event"
            >New Event</Button>
        </Box>
    );
}
