"use client";
import {
    ChakraProvider,
    Stack,
    Text,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Button,
    ButtonGroup,
    Image,
    Link,
    HStack,
    Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function RandomGift() {
    const gifts = [
        {
            name: "Wireless Earbuds",
            description:
                "High-quality wireless earbuds with excellent sound quality and noise cancellation.",
            price: "$50",
        },
        {
            name: "Scented Candles",
            description:
                "Set of aromatic scented candles in various relaxing fragrances.",
            price: "$20",
        },
        {
            name: "Leather Wallet",
            description:
                "Stylish and durable leather wallet with multiple card slots and a coin pocket.",
            price: "$60",
        },
        {
            name: "Smartphone Camera Lens Kit",
            description:
                "A set of detachable lenses for smartphones to enhance photography capabilities.",
            price: "$30",
        },
        {
            name: "Fitness Tracker",
            description:
                "A wearable device that tracks fitness metrics like steps, heart rate, and sleep patterns.",
            price: "$80",
        },
        {
            name: "Gourmet Chocolate Box",
            description:
                "A selection of premium chocolates in an elegant gift box.",
            price: "$25",
        },
        {
            name: "Portable Bluetooth Speaker",
            description:
                "A compact and wireless speaker for enjoying music on the go.",
            price: "$70",
        },
        {
            name: "Personalized Photo Frame",
            description:
                "A customized photo frame with space for a memorable picture.",
            price: "$15",
        },
        {
            name: "Designer Watch",
            description:
                "A stylish and elegant wristwatch from a renowned designer brand.",
            price: "$200",
        },
        {
            name: "Waterproof Hiking Backpack",
            description:
                "A durable backpack with multiple compartments, ideal for hiking and outdoor activities.",
            price: "$90",
        },
        {
            name: "Cookbook Set",
            description:
                "A collection of popular cookbooks featuring diverse cuisines and recipes.",
            price: "$40",
        },
        {
            name: "Virtual Reality Headset",
            description:
                "Immersive virtual reality headset for an incredible gaming experience.",
            price: "$300",
        },
        {
            name: "Handmade Soap Set",
            description:
                "A set of artisanal soaps made from natural ingredients and essential oils.",
            price: "$35",
        },
        {
            name: "Travel Mug",
            description:
                "Insulated and spill-proof mug for enjoying hot beverages on the go.",
            price: "$20",
        },
        {
            name: "Wireless Charging Pad",
            description:
                "A sleek wireless charging pad compatible with various smartphones and devices.",
            price: "$40",
        },
        {
            name: "Yoga Mat",
            description:
                "A high-quality yoga mat with a non-slip surface for optimal performance.",
            price: "$30",
        },
        {
            name: "Classic Board Game Set",
            description:
                "A collection of popular classic board games for endless entertainment.",
            price: "$45",
        },
        {
            name: "Essential Oil Diffuser",
            description:
                "A stylish diffuser that fills the room with soothing aromas and soft lighting.",
            price: "$50",
        },
        {
            name: "Leather Journal",
            description:
                "A beautifully crafted leather journal for recording thoughts, ideas, and memories.",

            price: "$25",
        },
        {
            name: "Gourmet Coffee Sampler",
            description:
                "A selection of specialty coffee beans from around the world for coffee enthusiasts.",
            price: "$35",
        },
        {
            name: "Portable Power Bank",
            description:
                "A compact and high-capacity power bank for charging devices on the go.",
            price: "$25",
        },
        {
            name: "Wine Tasting Kit",
            description:
                "A kit with wine glasses, aroma samples, and a guide for a delightful wine tasting experience.",
            price: "$60",
        },
        {
            name: "Digital Drawing Tablet",
            description:
                "A tablet with a pressure-sensitive pen for digital art and graphic design.",
            price: "$150",
        },
        {
            name: "Tea Gift Set",
            description:
                "A collection of gourmet teas in various flavors, accompanied by an infuser.",
            price: "$30",
        },
        {
            name: "Bluetooth Headphones",
            description:
                "Wireless headphones with great sound quality and comfortable over-ear design.",
            price: "$100",
        },
        {
            name: "Gardening Tool Set",
            description:
                "A set of high-quality gardening tools for maintaining a beautiful garden.",
            price: "$40",
        },
        {
            name: "Stainless Steel Water Bottle",
            description:
                "A durable and eco-friendly water bottle that keeps beverages hot or cold for hours.",
            price: "$20",
        },
        {
            name: "Smart Home Assistant",
            description:
                "A voice-activated smart speaker that can play music, answer questions, and control smart devices.",
            price: "$80",
        },
        {
            name: "Aromatherapy Essential Oils Set",
            description:
                "A collection of essential oils with various therapeutic scents for relaxation and well-being.",
            price: "$35",
        },
        {
            name: "Polaroid Instant Camera",
            description:
                "A vintage-style camera that instantly prints photos for capturing and sharing memories.",
            price: "$70",
        },
        {
            name: "Culinary Herb Garden Kit",
            description:
                "A kit with seeds, pots, and soil for growing a variety of fresh herbs at home.",
            price: "$25",
        },
        {
            name: "Bluetooth Shower Speaker",
            description:
                "Waterproof speaker with suction cup for enjoying music in the shower or by the pool.",
            price: "$30",
        },
        {
            name: "Sushi Making Kit",
            description:
                "A complete set for making sushi at home, including bamboo mats, chopsticks, and recipe book.",
            price: "$50",
        },
        {
            name: "Portable Espresso Machine",
            description:
                "A compact and manual espresso maker for enjoying fresh coffee anywhere.",
            price: "$60",
        },
        {
            name: "Fitness Resistance Bands Set",
            description:
                "A set of versatile resistance bands for strength training and physical therapy exercises.",
            price: "$20",
        },
        {
            name: "Electric Wine Opener",
            description:
                "An electric opener that effortlessly removes wine corks with the push of a button.",
            price: "$25",
        },
        {
            name: "Self-Care Gift Box",
            description:
                "A curated box with self-care items like bath bombs, face masks, and scented candles.",
            price: "$40",
        },

        {
            name: "Stylish Laptop Bag",
            description:
                "A trendy and functional bag to carry laptops and other essentials with ease.",
            price: "$50",
        },
        {
            name: "Language Learning Course",
            description:
                "An interactive online course for learning a new language at one's own pace.",
            price: "$100",
        },
        {
            name: "Beer Brewing Kit",
            description:
                "A complete kit with ingredients and equipment for brewing homemade beer.",
            price: "$80",
        },
        {
            name: "Wireless Bluetooth Karaoke Microphone",
            description:
                "A portable microphone that connects to smartphones for singing karaoke anywhere.",
            price: "$35",
        },
        {
            name: "Handheld Mini Massager",
            description:
                "A compact massager for relieving muscle tension and promoting relaxation.",
            price: "$15",
        },
        {
            name: "Gourmet Cheese Selection",
            description:
                "A variety of artisanal cheeses from around the world for cheese connoisseurs.",
            price: "$45",
        },
        {
            name: "Hammock",
            description:
                "A comfortable and lightweight hammock for relaxing outdoors or in the backyard.",
            price: "$30",
        },
        {
            name: "Digital E-Book Reader",
            description:
                "A portable device for reading e-books with a high-resolution display and long battery life.",
            price: "$120",
        },
        {
            name: "Artificial Intelligence Robot Toy",
            description:
                "An interactive robot toy that responds to voice commands and performs various tasks.",
            price: "$60",
        },
        {
            name: "Gourmet Popcorn Set",
            description:
                "A selection of flavored popcorn kernels and seasonings for a delicious movie night snack.",
            price: "$25",
        },
        {
            name: "Outdoor Hammock Chair",
            description:
                "A comfortable hanging chair for relaxing in the backyard or on a camping trip.",
            price: "$50",
        },
        {
            name: "Indoor Herb Garden Kit",
            description:
                "A kit with hydroponic technology for growing fresh herbs indoors all year round.",
            price: "$40",
        },
        {
            name: "Noise-Canceling Headphones",
            description:
                "Premium headphones that block out external noise for immersive audio experience.",
            price: "$150",
        },
        {
            name: "Cocktail Shaker Set",
            description:
                "A set of professional-grade cocktail shaker and accessories for mixing drinks at home.",
            price: "$30",
        },
        {
            name: "Smart LED Light Bulbs",
            description:
                "Wi-Fi-enabled bulbs that can be controlled and customized using a smartphone app.",
            price: "$40",
        },
        {
            name: "DIY Candle Making Kit",
            description:
                "A complete kit with materials and instructions for making personalized candles.",
            price: "$25",
        },
        {
            name: "Premium Tea Infuser",
            description:
                "An elegant and easy-to-use tea infuser for brewing loose-leaf tea with convenience.",
            price: "$20",
        },
        {
            name: "Fruit Infuser Water Bottle",
            description:
                "A water bottle with a built-in infuser for adding natural fruit flavors to drinks.",
            price: "$15",
        },
        {
            name: "Travel Neck Pillow",
            description:
                "A soft and ergonomic neck pillow for comfortable travel and rest.",
            price: "$20",
        },
        {
            name: "Gourmet BBQ Grilling Set",
            description:
                "A collection of high-quality grilling tools and spices for BBQ enthusiasts.",
            price: "$50",
        },
        {
            name: "Wooden Puzzle Set",
            description:
                "A set of challenging and beautifully crafted wooden puzzles for brain stimulation.",
            price: "$30",
        },
        {
            name: "Aromatherapy Shower Steamers",
            description:
                "Effervescent shower tablets infused with essential oils for a spa-like shower experience.",
            price: "$20",
        },
        {
            name: "Digital Instant-Read Meat Thermometer",
            description:
                "A precise and quick thermometer for checking the internal temperature of meats.",
            price: "$25",
        },
        {
            name: "Bluetooth Beanie Hat",
            description:
                "A warm and stylish beanie hat with built-in wireless headphones for music on the go.",
            price: "$25",
        },
        {
            name: "Gardening Book Set",
            description:
                "A collection of informative books on gardening techniques, plants, and landscaping ideas.",
            price: "$60",
        },
        {
            name: "Aerial Drone with Camera",
            description:
                "A remote-controlled drone with a built-in camera for capturing stunning aerial photographs and videos.",
            price: "$200",
        },
        {
            name: "Deluxe Spa Gift Basket",
            description:
                "A luxurious gift basket filled with spa essentials like bath salts, body lotion, and scented candles.",
            price: "$70",
        },
        {
            name: "Portable Folding Picnic Table",
            description:
                "A compact and lightweight table that can be easily folded for picnics and outdoor dining.",
            price: "$40",
        },
        {
            name: "Electric Toothbrush",
            description:
                "A high-performance electric toothbrush with multiple brushing modes and a rechargeable battery.",
            price: "$50",
        },
        {
            name: "Gourmet Olive Oil Set",
            description:
                "A selection of premium extra virgin olive oils from different regions for culinary enthusiasts.",
            price: "$30",
        },
        {
            name: "Adult Coloring Book Set",
            description:
                "A set of intricately designed coloring books for adults to relax and unleash their creativity.",
            price: "$20",
        },
        {
            name: "Smart Wi-Fi Plug",
            description:
                "A plug that can be controlled remotely using a smartphone, allowing automation of electrical devices.",
            price: "$20",
        },
        {
            name: "Selfie Ring Light",
            description:
                "A compact ring light that attaches to smartphones for enhanced lighting during selfies or video calls.",
            price: "$15",
        },
        {
            name: "Electric Wine Aerator",
            description:
                "A device that aerates wine, enhancing its flavor and aroma, in seconds.",
            price: "$35",
        },
        {
            name: "Hiking and Camping Cookware Set",
            description:
                "A lightweight and compact cooking set with pots, pans, and utensils for outdoor cooking.",
            price: "$40",
        },
        {
            name: "Smart Indoor Plant Pot",
            description:
                "A self-watering plant pot with built-in sensors that monitor and optimize plant growth.",
            price: "$45",
        },
        {
            name: "Travel Scratch Map",
            description:
                "A map with a scratch-off surface to track and display countries visited.",
            price: "$20",
        },
        {
            name: "Smartphone Projector",
            description:
                "A portable projector that can display smartphone screens on larger surfaces for movie nights.",
            price: "$60",
        },
        {
            name: "Fitness Foam Roller",
            description:
                "A foam roller for self-massage and muscle recovery after workouts and physical activities.",
            price: "$25",
        },
        {
            name: "Handheld Vacuum Cleaner",
            description:
                "A compact and cordless vacuum cleaner for quick and efficient cleaning in small spaces.",
            price: "$50",
        },
        {
            name: "Puzzle Board Game",
            description:
                "A challenging and strategic board game for exercising problem-solving and critical thinking skills.",
            price: "$30",
        },
        {
            name: "Electric Milk Frother",
            description:
                "A device that froths milk for creating delicious and creamy coffee beverages at home.",
            price: "$40",
        },
        {
            name: "Gourmet Hot Sauce Set",
            description:
                "A collection of artisanal hot sauces with unique flavors and varying levels of spiciness.",
            price: "$35",
        },
        {
            name: "Fitness Jump Rope",
            description:
                "A high-quality and adjustable jump rope for cardio workouts and improving coordination.",
            price: "$15",
        },
        {
            name: "Digital Luggage Scale",
            description:
                "A compact scale for weighing luggage to avoid overweight fees during travel.",
            price: "$20",
        },
        {
            name: "Smart Thermostat",
            description:
                "A programmable thermostat that adjusts temperature settings for energy efficiency and comfort.",
            price: "$100",
        },
        {
            name: "Luxury Bathrobe",
            description:
                "A plush and comfortable bathrobe for ultimate relaxation after a shower or bath.",
            price: "$70",
        },
        {
            name: "Portable Blender",
            description:
                "A compact blender for preparing smoothies and juices on the go.",
            price: "$30",
        },
        {
            name: "Cinema Lightbox",
            description:
                "A customizable lightbox with interchangeable letters and symbols for creating personalized messages.",
            price: "$20",
        },
        {
            name: "Gourmet Chocolate Truffles",
            description:
                "Indulgent chocolate truffles in a variety of flavors, beautifully packaged in a gift box.",
            price: "$25",
        },
        {
            name: "Wireless Car Charger",
            description:
                "A convenient charger that wirelessly charges smartphones in the car while providing a secure mount.",
            price: "$35",
        },
        {
            name: "Premium Tea Sampler",
            description:
                "A collection of high-quality loose-leaf teas in a range of flavors and aromas.",
            price: "$30",
        },
        {
            name: "Fitness Yoga Ball",
            description:
                "A stability ball for yoga, pilates, and core-strengthening exercises.",
            price: "$20",
        },
        {
            name: "Bluetooth Tracker",
            description:
                "A small device that attaches to personal belongings to track their location using a smartphone app.",
            price: "$25",
        },
    ];
    const [idx, setIdx] = useState(Math.floor(Math.random() * 91)); // 91 images
    const [img, setImg] = useState(
        `https://source.unsplash.com/collection/9856561/?sig=${Math.floor(
            Math.random() * 100
        )}`
    );

    function handleClick() {
        setIdx(Math.floor(Math.random() * 91));
        setImg(
            `https://source.unsplash.com/collection/9856561/?sig=${Math.floor(
                Math.random() * 100
            )}`
        );
    }

    return (
        <ChakraProvider>
            <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
            >
                <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "200px" }}
                    src={img}
                    alt="Generic Gift Image from Unsplash"
                />

                <Stack>
                    <CardBody>
                        <Heading size="md">{gifts.at(idx)?.name}</Heading>
                        <Text py="4">{gifts.at(idx)?.description}</Text>
                        <Text color="orange.600" fontSize="2xl" mb="4">
                            {gifts.at(idx)?.price}
                        </Text>
                        <LinkButtons name={gifts.at(idx)?.name}/>
                    </CardBody>

                    <CardFooter>
                            <Button
                                variant="solid"
                                colorScheme="orange"
                                onClick={() => handleClick()}
                            >
                                Next Idea
                            </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </ChakraProvider>
    );
}

function LinkButtons({ name }) {
    const amazonLink = "https://www.amazon.com/s?k=" + name.replace(/\ +/g, '+').toLowerCase();
    const etsyLink = "https://www.etsy.com/search?q=" + name.replace(/\ +/g, '%20').toLowerCase();
    return (
        <HStack>
            <Link href={etsyLink} isExternal>
                Etsy <ExternalLinkIcon mx="4px" />
            </Link>
            <Link href={amazonLink} isExternal>
                Amazon <ExternalLinkIcon mx="4px" />
            </Link>
        </HStack>
        
    );
}
