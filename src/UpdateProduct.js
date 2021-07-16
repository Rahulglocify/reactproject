import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import Header from "./Header";

function UpdateProduct(props) {
    const productid = props.match.params.id;
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");
    const [data, setData] = useState([]);
    useEffect(async () => {
        let result = await fetch('http://127.0.0.1:8000/api/product-details/' + productid)
        result = await result.json()
        setData(result.data)
        setName(result.data.name)
        setPrice(result.data.price)
        setDescription(result.data.description)
        setImage(result.data.image)
        setId(result.data.id)
    }, [])

    async function productUpdate() {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("image", image);
        formData.append("description", description);
        formData.append("price", price);

        let result = await fetch('http://127.0.0.1:8000/api/update-product', {
            method: "POST",
            body: formData
        });
        result = await result.json()
        alert("Product details has been updated successfully")
    }
    return (
        <div>
            <Header />
            <h1>Edit/Update Page</h1>
            <div className="col-sm-6 offest-sm-3">
                <br />
                <input type="text" defaultValue={data.name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Product Name" /> <br />
                <input type="text" defaultValue={data.price} onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" /> <br />
                <input type="text" defaultValue={data.description} onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" /> <br />
                <input type="file" defaultValue={data.image} onChange={(e) => setImage(e.target.files[0])} className="form-control" placeholder="Product Image" /> <br />
                <img src={"http://127.0.0.1:8000/uploads/product/" + data.image} style={{ width: 100 }} />
                <button className="btn btn-primary" onClick={productUpdate}>Update Product</button>
            </div>
        </div>
    );
}

export default withRouter(UpdateProduct);
