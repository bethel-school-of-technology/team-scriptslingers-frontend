export class Event {
    eventId?: string;
    eventTitle?: string;
    description?: string;
    location?: string;
    hostName?: string;
    eventTime?: Date;
    isFinished?: boolean;

    constructor(eventId?: string, eventTitle?: string, description?: string, location?: string, hostName?: string, eventTime?: Date, isFinished?: boolean) {
        this.eventId = eventId;
        this.eventTitle = eventTitle;
        this.description = description;
        this.location = location;
        this.hostName = hostName;
        this.eventTime = eventTime;
        this.isFinished = isFinished;
    }
}
