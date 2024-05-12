import { v4 as uuidv4 } from 'uuid';

class Destination {
    #location: string
    #date: string
    #name: string
    #id: string

    constructor(options: DestinationOptions){
        this.#id = options.id || uuidv4()
        this.#location = options.location;
        this.#date = options.date;
        this.#name = options.name;
    }

    getId(){
        return this.#id;
    }

    setLocation( newLoc:string ){
        this.#location = newLoc;
    }

    getLocation(){
        return this.#location;
    }

    setDate( newDate: string){
        this.#date = newDate;
    }

    getDate(){
        return this.#date;
    }

    setName( newName: string ){
        this.#name = newName;
    }

    getName(){
        return this.#name;
    }
}

interface DestinationOptions {
    name: string,
    location: string,
    date: string,
    id?: string
}

export default Destination