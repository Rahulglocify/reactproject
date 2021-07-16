import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from "./Header";

function ProductList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts()
    }, [])
    console.log(data)

    async function getProducts() {
        let result = await fetch('http://127.0.0.1:8000/api/product-list');
        result = await result.json();
        setData(result.data);
    }

    async function deleteProduct(id) {
        let item = { id }
        let result = await fetch('http://127.0.0.1:8000/api/product-delete', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        console.log(result)
        getProducts()
    }
    return (
        <div>
            <Header />
            <div className="col-sm-8 offset-sm-2">
                <h1>Product List</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, key) =>
                                <tr key={key}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={"http://127.0.0.1:8000/uploads/product/" + item.image} style={{ width: 100 }} />
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <span onClick={(e) => { deleteProduct(item.id) }} className="delete">Delete</span>
                                    </td>
                                    <td>
                                        <Link to={"/update-product/"+item.id}><span className="update">Update</span></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList