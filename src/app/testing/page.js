"use client";

import PocketBase from "pocketbase";

export default async function testing() {
    const pb = new PocketBase("http://127.0.0.1:8090");

    // getFullList is DEFINITELY A FUTURE SECURITY ISSUE TO ADDRESS
    const records = await pb.collection('events').getFullList({
        filter: `email=""`
    });

    const myJSON = JSON.stringify(records);

    return <>Hello {myJSON}</>;
}
