export class Event {
    eventId?: string;
    eventTitle?: string;
    description?: string;
    location?: string;
    hostName?: string;

    constructor(eventId?: string, eventTitle?: string, description?: string, location?: string, hostName?: string) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.description = description;
        this.location = location;
        this.hostName = hostName;
    }
}
