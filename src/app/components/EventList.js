import EventItem from "./EventItem.js"

export default function EventList({ data }) {
    return (
        <div>
            {data.map((item) => (
                <EventItem item={item} />
            ))}
        </div>
    );
}