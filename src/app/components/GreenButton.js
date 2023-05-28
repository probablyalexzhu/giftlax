import styles from './GreenButton.module.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
// chat gpt wrote this thing
export default function GreenButton() {
  return (
    // <button className={styles.greenbutton}>+</button>
    <Button colorScheme='green'>+</Button>
  );
};