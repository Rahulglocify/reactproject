import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Header from "./Header";

function SearchProduct() {
    const [data, setData] = useState([]);
    async function search(name) {
        if (name.length > 1) {
            let item = { name };
            let result = await fetch('http://127.0.0.1:8000/api/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            setData(result.data)
        }

    }
    return (
        <div>
            <Header />
            <div className="col-sm-6 offest-sm-3">
                <h1>Search Product</h1>
                <br />
                <input type="text" onChange={(e) => { search(e.target.value) }} className="form-control" placeholder="search product..." /> <br />
                {
                    data.length > 0 ?
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Price</th>
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
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                        : <h2>Search Product</h2>
                }

            </div>
        </div>
    );
}

export default SearchProduct;
