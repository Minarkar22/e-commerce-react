import axios from "axios";
import {useEffect, useState} from "react";


function useCategories() {
    let [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/categories");
            // console.log(response.data.categories);
            setCategories(response.data.categories);
        } catch (error) {
            console.log("Error fetching errors", error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return {categories};
}

export default useCategories;