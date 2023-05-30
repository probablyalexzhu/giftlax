import styles from "./GreenButton.module.css";
import { IconButton, ButtonGroup } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function GreenButton() {
    return (
        // <button className={styles.greenbutton}>+</button>
        <IconButton
            size="lg"
            colorScheme="green"
            icon={<AddIcon />}
            aria-label="Add Event"
        />
    );
}
