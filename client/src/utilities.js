export async function fetch_and_set(url, setFunction) {
    console.log(url)
    const response = await fetch(url)
    const responseData = await response.json()
    if (Array.isArray(setFunction)) {
        const [ setNoteData, setInitialNoteBody ] = setFunction
        setNoteData(responseData)
        setInitialNoteBody(responseData.body)
    } else {
        setFunction(responseData)
    }
}