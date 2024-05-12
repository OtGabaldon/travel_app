
import  Destination from "../../src/entities/Destination";
import  Trip from "../../src/entities/Trip";
import  User from "../../src/entities/User";

const TEST_USER = "testUser";

test('Create Trip with all defaults', () => {
    const user = new User({
        firstName:"first",
        lastName: "last"
    });

    const expectedTrip = {
        owner:user,
        destinations: [],
        passengers: new Set<User>()
    }

    const generatedTrip: Trip = new Trip({owner:user})

    expect(generatedTrip).toStrictEqual(new Trip(expectedTrip))
});

test('Create Trip with no defaults', () => {
    const user = new User({
        firstName:"first",
        lastName: "last"
    });
    const destination = new Destination({
        location:"Orlando",
        date:"Jan,2,2022",
        name:"Orlando"
    })
    const expectedTrip = {
        owner:user,
        destinations: [destination],
        passengers: new Set<User>([user]),
        positionMap: new Map<string,number>()
    }

    const generatedTrip = new Trip({
        owner: user,
        destinations: [destination],
        passengers: new Set<User>([user])
    })

    expect(generatedTrip.getOwner()).toEqual(expectedTrip.owner);
    expect(generatedTrip.getDestinations()).toEqual(expectedTrip.destinations);
    expect(generatedTrip.getPassengers()).toEqual(expectedTrip.passengers);
    expect(generatedTrip.getPositionMap()).toEqual(expectedTrip.positionMap);
});

test('Make sure getters/setters work', () => {

    const firstOwner = new User({
        firstName: "test",
        lastName: "user"
    })

    const secondOwner = new User({
        firstName: "test2",
        lastName: "user2"
    })

    const firstDestination = new Destination({
        location:"testLocation",
        name: "testName",
        date: "fake date"
    });

    const secondDestination = new Destination({
        location:"testLocation2",
        name: "testName2",
        date: "fake date2"
    });

    const thirdDestination = new Destination({
        location:"testLocation3",
        name: "testName3",
        date: "fake date3"
    });

    const trip = new Trip({
        owner: firstOwner
    });


    //Owner
    trip.setOwner(secondOwner);
    expect(trip.getOwner().getFirstName()).toEqual("test2")

    //Insertion/deletion
    trip.insertDestination(firstDestination)
    expect(() => {trip.insertDestination(firstDestination)}).toThrowError();
    trip.insertDestination(secondDestination)
    trip.insertDestination(thirdDestination,1)

    expect(trip.getDestinations()).toEqual([thirdDestination,firstDestination,secondDestination])
    expect(trip.removeDestination(firstDestination.getId())).toEqual(2);

    expect(trip.getDestinations()).toEqual([thirdDestination,secondDestination])
    expect(trip.removeDestination(firstDestination.getId())).toEqual(-1);

    trip.addPassenger(secondOwner)
    trip.addPassenger(firstOwner)
    expect(trip.deletePassenger(firstOwner)).toBeTruthy()
    expect(trip.deletePassenger(secondOwner)).toBeTruthy()
    expect(trip.deletePassenger(firstOwner)).toBeFalsy()

})

export {}