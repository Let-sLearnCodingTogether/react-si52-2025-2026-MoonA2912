import { NavLink, useNavigate, useParams } from "react-router"
import { Button, Form } from "react-bootstrap"
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import ApiClient from "../../utils/ApiClient"

interface FormMovie{
    judul : string,
    tahunRilis : string,
    sutradara : string
}
interface ResponseData{
    data:{
        _id: string,
        judul : string,
        sutradara : string,
        tahunRilis : string,
        createdBy : string,
        createdAt : string,
        updateAt : string,
        __v : string
    }
}

function EditMovies(){
        const params= useParams()
        const navigate = useNavigate()
        const [form, setform] = useState<FormMovie>({
        judul : "",
        tahunRilis : "",
        sutradara : ""
    })
    const fetchMovie = useCallback(async ()=> {
        const response = await ApiClient.get(`/movies/${params.id}`)

        if (response.status===200) {
            const responseData : ResponseData = response.data
            setform({
                judul : responseData.data.judul,
                tahunRilis : responseData.data.tahunRilis,
                sutradara : responseData.data.sutradara
            })
        }
    }, [params])
    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setform({
            ...form,
            [name] : value 
        })
    }
    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault ();
        try {
            const response = await ApiClient.put(`/movies.${params.id}`, form)

            navigate("/movie", {
                replace : true
            })
        }catch (error) {
            console.log(Response);
        }
    }

    useEffect(()=>{
        fetchMovie()
    },[fetchMovie])

    return <div className="container mx-auto">
        <h2 style={{ color: "#662222" }}>Edit Movie Page</h2>
        <NavLink to="/"style={{ backgroundColor: "#EE6983", borderColor: "#ff0a54" }}className="btn btn-primary">List Movie</NavLink>
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formJudul">
                <Form.Label>Judul</Form.Label>
                <Form.Control 
                    value = {form.judul}
                    onChange = {handleInputChange}
                    name="judul"
                    type="text" 
                    placeholder="Judul Film"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formtahunRilis">
                <Form.Label>Tahun Rilis</Form.Label>
                <Form.Control 
                    value = {form.tahunRilis}
                    onChange = {handleInputChange}
                    name="tahunRilis"
                    type="text" 
                    placeholder="Tahun Rilis"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSutradara">
                <Form.Label>Sutradara</Form.Label>
                <Form.Control
                    value = {form.sutradara} 
                    onChange = {handleInputChange}
                    name="sutradara"
                    type="text" 
                    placeholder="Sutradara"/>
            </Form.Group>
            <Button type="submit" variant="primary" style={{ backgroundColor: "#EE6983", borderColor: "#ff0a54" }}className="btn btn-primary">
                Simpan
            </Button>
        </Form>
    </div>
    </div>
    
}
export default EditMovies