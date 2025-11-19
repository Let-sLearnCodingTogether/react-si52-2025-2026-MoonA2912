import { NavLink } from "react-router"

function AddMovies(){
    return <div>
        <h2 style={{ color: "#662222" }}>Add Movie Page</h2>
        <NavLink to="/"style={{ backgroundColor: "#EE6983", borderColor: "#ff0a54" }}className="btn btn-primary">List Movie</NavLink>
    </div>
}
export default AddMovies