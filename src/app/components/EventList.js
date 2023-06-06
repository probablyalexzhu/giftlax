import EventItem from "./EventItem.js"

export default function EventList({ data }) {
    return (
        <div>
            {data.map((item) => (
                // just add a key for no warning
                <EventItem key={item?.id} item={item} />
            ))}
        </div>
    );
}