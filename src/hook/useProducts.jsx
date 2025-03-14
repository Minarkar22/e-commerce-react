import {useEffect, useState} from "react";
import axios from "axios";


function useProducts() {
    let [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/products");
            let data = response.data.products;
            if (data){
                setProducts(response.data.products);
            }

        } catch (error) {
            console.log("Error fetching errors", error);
        }

    }

    useEffect(() => {
        getProducts();
    }, [])

    return {products};
}

export default useProducts;