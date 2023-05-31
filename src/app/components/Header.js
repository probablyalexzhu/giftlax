"use client";

import {
    ChakraProvider,
    Flex,
    Box,
    extendTheme,
    Stack,
    Spacer,
    Text,
    Button,
} from "@chakra-ui/react";
import {
    LoginButton,
    LogoutButton,
    ProfileButton,
    RegisterButton,
  } from "./buttons.component";
// import Link from "next/link";

// const Header = () => {
//   return (
//     <header className='flex h-24 flex-col justify-center bg-stone-100'>
//       <nav className='container'>
//         <ul className='flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500'>
//           <li className='text-sm'>
//             <Link href='/'>Home</Link>
//           </li>
//           <li className='text-sm'>
//             <Link href='/protected/'>Protected (client)</Link>
//           </li>
//           <li>
//             <LoginButton />
//           </li>
//         </ul>
//       </nav>
//     </header>
//   )
// }

const Header = () => {
   return (
       <Box className='header' bg ='orange'>
            < Button/>
            <li>
                <LoginButton />
            </li>
       </Box>
   );
};

export default Header