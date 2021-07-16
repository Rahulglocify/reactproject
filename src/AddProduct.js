import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import Header from "./Header";

function AddProduct() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    async function addProduct() {
        let item = { name, image, price, description }
        //console.log(item)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("description", description);
        console.log(formData);
        let result = await fetch('http://127.0.0.1:8000/api/product', {
            method: "POST",
            body:formData
        });
        alert("Data saved successfully")

    }
    return (
        <div>
            <Header />
            {/* <h1>Add Product Page</h1> */}
            <div className="col-sm-6 offest-sm-3">
                <br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Product Name" /> <br />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" placeholder="Product Image" /> <br />
                <input type="text" onChange={(e) => setPrice(e.target.value)} className="form-control" placeholder="Price" /> <br />
                <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" placeholder="Description" /> <br />
                <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
            </div>
        </div>
    );
}

export default AddProduct;
