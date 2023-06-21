export class Event {
    eventId?: string;
    eventTitle?: string;
    description?: string;
    location?: string;
    hostName?: string;
    eventDate?: Date;

    constructor(eventId?: string, eventTitle?: string, description?: string, location?: string, hostName?: string, eventDate?: Date) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.description = description;
        this.location = location;
        this.hostName = hostName;
        this.eventDate = eventDate;
    }
}
