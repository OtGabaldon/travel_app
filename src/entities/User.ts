import Trip from "./Trip";
import { v4 as uuidv4 } from 'uuid';

class User {
    #id: string
    #firstName: string
    #middleName: string
    #lastName: string
    #location: string // Probably needs to be a location object
    #trips: Set<Trip> //ID's

    constructor(options: UserOptions){
        this.#id = options.id || uuidv4();
        this.#firstName = options.firstName;
        this.#middleName = options.middleName || "";
        this.#lastName = options.lastName;
        this.#location = options.location || "";
        this.#trips = options.trips || new Set();
    }

    getId(){
        return this.#id
    }
    setFirstName( newName: string){
        this.#firstName = newName;
    }

    getFirstName(){
        return this.#firstName;
    }

    setMiddleName( newName: string){
        this.#middleName = newName;
    }

    getMiddleName(){
        return this.#middleName;
    }

    setLastName( newName: string){
        this.#lastName = newName;
    }

    getLastName(){
        return this.#lastName;
    }

    getLocation(){
        return this.#location;
    }
    
    setLocation(newLocation: string){
        this.#location = newLocation;
    }

    getTrips(){
        return this.#trips;
    }
    
    setTrips( newTrips: Array<Trip>){
        this.#trips.clear()
        this.#trips = new Set(newTrips);
    }

    addTrip( newTrip: Trip){
        this.#trips.add(newTrip);
    }

    removeTrip( trip: Trip){
        this.#trips.delete(trip)
    }

}

interface UserOptions {
    id?: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    location?: string, // Probably needs to be a location object
    trips?: Set<Trip> //ID's
}

export default User;