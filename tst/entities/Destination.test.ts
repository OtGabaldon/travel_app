import Destination from "../../src/entities/Destination"

test("Destination with all defaults", () => {
    expect(true) // no defaults for this value
})

test("Destination with no defaults", () => {
    const expectedDestination = {
        name: "testDest",
        date: "testDate",
        location: "testLoc"
    }

    const generatedDestination = new Destination({
        name: "testDest",
        date: "testDate",
        location: "testLoc"
    })

    expect(generatedDestination.getName()).toStrictEqual(expectedDestination.name)
    expect(generatedDestination.getDate()).toStrictEqual(expectedDestination.date)
    expect(generatedDestination.getLocation()).toStrictEqual(expectedDestination.location)
})
export {}