export class Event {
    eventId?: number;
    eventTitle?: string;
    description?: string;
    location?: string;
    hostName?: string;
    eventTime?: Date;
    attendeeList?: string;

    constructor(eventId?: number, eventTitle?: string, description?: string, location?: string, hostName?: string, eventTime?: Date, attendeeList?: string) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.description = description;
        this.location = location;
        this.hostName = hostName;
        this.eventTime = eventTime;
        this.attendeeList = attendeeList;
    }
}
