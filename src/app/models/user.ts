export class User {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    enrolledIn?: string[];

    constructor(userId?: number, firstName?: string, lastName?: string, email?: string, password?: string, isAdmin?: boolean, enrolledIn?: string[]){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.enrolledIn = enrolledIn;
    }
}
