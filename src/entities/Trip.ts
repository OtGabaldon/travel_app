import Destination from './Destination'
import User from './User'
import { v4 as uuidv4 } from 'uuid';

class Trip {
    #id: string
    #owner: User // User ID
    #destinations: Array<Destination>
    #passengers: Set<User>
    positionMap: Map<string, number> // should be private but it is throwing

    constructor(options: TripOptions){
        this.#id = options.id || uuidv4()
        this.#owner = options.owner;
        this.#destinations = options.destinations || [];
        this.#passengers = options.passengers || new Set<User>();
        this.positionMap = options.positionMap || new Map<string,number>();
    }

    getPositionMap(){
        return this.positionMap;
    }

    setOwner( newOwner: User){
        this.#owner = newOwner;
    }

    getOwner(){
        return this.#owner;
    }

    insertDestination( destination: Destination, position: number = this.#destinations.length + 1){
        if(this.positionMap.get(destination.getId())){
            throw new Error("Desination is already in this trip. Create new destinations when inserting into trip.")
        }
        this.positionMap.set(destination.getId(), position)
 
        this.#destinations.forEach((destination:Destination)=>{
            var currentPos = this.positionMap.get(destination.getId())
            if(currentPos == undefined){
                throw new Error("No destination found with ID: " + destination.getId())
            }
            if(currentPos! >= position){
                this.positionMap.set(destination.getId(), currentPos + 1)
            }
        })
        this.#destinations.push(destination)
    }

    removeDestination(id: string): number{
        var position = this.positionMap.get(id)
        if(position == undefined || position == -1){
            return -1
        }
        this.#destinations.forEach((destination:Destination)=>{
            var currentPos = this.positionMap.get(destination.getId())
            if(currentPos == undefined){
                throw new Error("No destination found with ID: " + destination.getId())
            }
            if(currentPos! >= position!){
                this.positionMap.set(destination.getId(), currentPos - 1)
            }
        })
        this.#destinations.splice(position,1)
        this.positionMap.delete(id)
        return position
    }

    setDestinations(newDestinations: Array<Destination>){
        this.#destinations = newDestinations;
    }

    getDestinations(){
        return this.#destinations;
    }

    getPassengers(){
        return this.#passengers
    }

    setPassengers( passengers: Array<User>){
        this.#passengers.clear()
        this.#passengers = new Set(passengers);
    }

    addPassenger( passenger: User){
        this.#passengers.add(passenger);
    }
 
    deletePassenger( passenger: User){
       return this.#passengers.delete(passenger)
    }
}

interface TripOptions {
    id?: string
    owner: User,
    destinations?: Array<Destination>
    passengers?: Set<User>
    positionMap?: Map<string,number>
}

export default Trip;