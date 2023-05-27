import Image from 'next/image'
// import styles from './page.module.css'
import GreenButton from './components/GreenButton.js'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <>Hello World</>
      <GreenButton />
    </Fragment>
  );
};