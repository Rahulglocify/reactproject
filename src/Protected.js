import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from "./Header";

function Protected(props) {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
            history.push("/login")
        }
    }, [])
    const Cmp = props.Cmp
    return (
        <div>
            <Cmp />
        </div>
    );
}

export default Protected;
