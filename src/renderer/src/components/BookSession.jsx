export default function BookSession() {
    function handleSubmit(e) {
        e.preventDefault()
    }

    return (<>
        <h4>Buat Booking Session Training</h4>
        <form onSubmit={handleSubmit}>
            <p>Pilih Trainer</p>
            <input type="text" />
            Hari:
            <select name="" id="">
                <option value=""></option>
            </select>
            Jam:
            <input type="time" />
            Durasi:
            <input type="number" />
            <button type="submit">Submit Booking</button>
        </form>
    </>)
}