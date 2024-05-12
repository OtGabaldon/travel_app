import  User from '../../src/entities/User'
import  Destination from '../../src/entities/Destination'
import Trip from '../../src/entities/Trip'


const USER_FIRST = "first"
const USER_LAST = "last"

test("Test User with all defaults", () => {
    const expectedUser:User = new User({
        firstName: USER_FIRST,
        lastName: USER_LAST,
        middleName: "",
        location: "",
        trips: new Set()
    })

    const generatedUser = new User({
        firstName: USER_FIRST,
        lastName: USER_LAST
    });

    expect(generatedUser).toStrictEqual(expectedUser);
})

test("Test User with no defaults", () => {
    const destination = new Destination({
        location:"Orlando",
        date:"Jan,2,2022",
        name:"Orlando"
    })

    const trip = new Trip({owner: new User({
        "firstName":"test",
        "lastName":"chad"
    })})

    const expectedUser = {
        firstName: USER_FIRST,
        lastName: USER_LAST,
        middleName: "middle",
        location: "orlando",
        trips: new Set([trip])
    }

    const generatedUser = new User({
        firstName: USER_FIRST,
        lastName: USER_LAST,
        middleName: "middle",
        location: "orlando",
        trips: new Set([trip])
    });

    expect(generatedUser.getTrips()).toEqual(expectedUser.trips);
    expect(generatedUser.getFirstName()).toEqual(expectedUser.firstName);
    expect(generatedUser.getLastName()).toEqual(expectedUser.lastName);
    expect(generatedUser.getMiddleName()).toEqual(expectedUser.middleName);
    expect(generatedUser.getLocation()).toEqual(expectedUser.location);
})



export {}