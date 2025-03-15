import {useEffect, useState} from "react";
import axios from "axios";


function useProductDetail(id) {
    const [productDetail, setProductDetail] = useState({});
    // console.log(id);
    let getProductDetails = async (id) => {
        try {
            let response = await axios.get(`http://localhost:8000/api/products/${id}`);
            let data = response.data.product;
            // console.log(data);
            setProductDetail(data);
        } catch (error) {
            console.log("Error fetching product detail, ", error);
        }

    }
    useEffect(() => {
        getProductDetails(id);
    }, [id]);
    return {
        productDetail,
    }
  }
  export default useProductDetail;