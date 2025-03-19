import {useEffect, useState} from "react";
import axios from "axios";


function useProductDetail(id) {
    const [productDetail, setProductDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // console.log(id);

    useEffect(() => {
        let getProductDetails = async (id) => {
            setIsLoading(true);
            try {
                let response = await axios.get(`http://localhost:8000/api/products/${id}`);
                // console.log(response.data);
                let data = response.data.product;
                // console.log("product detail in hook ",data);
                if(data){
                    setProductDetail(data);
                }else {
                    setProductDetail(null);
                }
            } catch (error) {
                console.log("Error fetching product detail, ", error);
            }finally {
                setIsLoading(false);
            }

        };
        getProductDetails(id);
    }, [id]);
    return {
        productDetail,
        isLoading,
    }
  }
  export default useProductDetail;