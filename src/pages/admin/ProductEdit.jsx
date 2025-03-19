import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useCategories from "../../hook/useCategories.jsx";
import useProductDetail from "../../hook/useProductDetail.jsx";
import axios from "axios";

export default function ProductEdit() {
    let {id} = useParams();
    let {productDetail} = useProductDetail(id);
    let {categories} = useCategories();
    let navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        price: "",
        category_id: "",
        description: "",
    });

    // console.log(productDetail);
    useEffect(() => {
        if(productDetail) {
            setForm({
                name: productDetail.name,
                price: productDetail.price,
                category_id: productDetail.category_id,
                description: productDetail.description,
            })
        }
    }, [productDetail]);

    let editProduct = async () => {
        let response = await axios.put(`http://localhost:8000/api/products/${id}`,form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        if(response.status === 200){
            navigate("/admin");
        };
    }

    return (
        <div
            className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        >
            <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-gray-50">
                    <div className="border p-10 bg-white rounded-md">
                        <form className="space-y-4 md:space-y-6">
                            <div className="">
                                <div className="image-wrapper">
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col">
                                    <label className="font-semibold text-sm">Product Name</label>
                                    <input
                                        type="text"
                                        className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                                        placeholder="Enter your product Name"
                                        value = {form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-semibold text-sm">Price</label>
                                    <input
                                        className="outline-none px-4 focus:ring-0 border-[1px] border-black/10 py-4 rounded-lg focus:border-primary transition-all mt-2"
                                        type="text"
                                        placeholder="Enter price"
                                        value = {form.price}
                                        onChange={e => setForm({...form, price: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-semibold text-sm">Category</label>
                                <select
                                    className="w-full border-[1px] mt-2 px-3 border-black/20 focus:border-primary transition-all py-3 rounded-lg"
                                    onChange={e => setForm({...form, category_id: e.target.value})}
                                >
                                    { categories.map(category => (
                                        <option key={category.id} selected={category.id == form.category_id} value={category.id}>{category.name}</option>
                                    ))
                                    }

                                </select>
                            </div>
                            <div>
                                <div>
                                    <label className="font-semibold text-sm">Description</label>
                                    <textarea
                                        className="w-full border-[1px] border-black/10 py-3 px-3 rounded-[5px]"
                                        placeholder="Enter Description"
                                        rows="5"
                                        value={form.description}
                                        onChange={e => setForm({...form, description: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-5">
                                <Link
                                    to="/admin"
                                    className="text-sm px-4 bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-3 shadow-md py-3 font-semibold rounded-md transition-all active:animate-press"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="button"
                                    onClick={editProduct}
                                    className="text-sm px-4 flex items-center gap-3 shadow-md py-3 text-white bg-primary hover:bg-blue-900 font-semibold rounded-md transition-all active:animate-press"
                                >
                                    Edit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}