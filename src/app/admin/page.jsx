"use client"

import React, { useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editOrder, editProduct, getAllProduct, removeProduct } from "../../Feature/prodectSlice";
import { orders } from "../../Feature/userSlice";
import { Input } from "../../../src/Components/Ui/input";

function App() {
    const dispatch = useDispatch()
    const [activeSection, setActiveSection] = useState('products');
    const [category, setCategory] = useState('');
    const [editId, setEditId] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');

    const { data } = useSelector((state) => state.product)
    const { ordersList } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getAllProduct())
        dispatch(orders())
    }, [dispatch])

    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const handleAddProduct = async ({
        category, price, stock, title, description,
        subCategory, material, color, brand, size,
        image1, image2, image3, image4
    }) => {

        if (
            !category || !price || !stock || !title || !description ||
            !subCategory || !material || !color || !brand || !size ||
            !image1 || !image2 || !image3 || !image4
        ) {
            toast.error("Fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("subCategory", subCategory);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("material", material);
        formData.append("color", color);
        formData.append("size", size);
        formData.append("brand", brand);
        formData.append("image1", image1);
        formData.append("image2", image2);
        formData.append("image3", image3);
        formData.append("image4", image4);

        toast.promise(
            dispatch(addProduct(formData)).unwrap().then(() => dispatch(getAllProduct())),
            {
                loading: 'Adding...',
                success: <b>Item added</b>,
                error: <b>Failed to add item.</b>,
            }
        );
        setShowAddProductForm(false);
        setCategory('');
        setPrice('');
        setStock('');
        setTitle('');
        setDescription('');
        setSubCategory('');
        setMaterial('');
        setColor('');
        setBrand('');
        setSize('');
        setImage1('');
        setImage2('');
        setImage3('');
        setImage4('');
    };

    const removeProductFun = async (id) => {
        toast.promise(
            dispatch(removeProduct(id)).unwrap().then(() => dispatch(getAllProduct())),
            {
                loading: 'Removing...',
                success: <b>Item removed!</b>,
                error: <b>Failed to remove item.</b>,
            }
        );
    }

    // Function to handle changing the status of an order
    const handleOrderStatusChange = ({ id, status }) => {
        toast.promise(
            dispatch(editOrder({ id, status })).unwrap().then(() => dispatch(orders())),
            {
                loading: 'updating...',
                success: <b>updated</b>,
                error: <b>Failed to update</b>,
            }
        );
    };



    const handelEditProduct = (product) => {
        console.log(product);
        setShowAddProductForm(true);
        setCategory(product.category);
        setPrice(product.price);
        setStock(product.stock);
        setTitle(product.title);
        setDescription(product.description);
        setSubCategory(product.subCategory);
        setMaterial(product.material);
        setColor(product.color);
        setBrand(product.brand);
        setSize(product.size)
        setEditId(product._id)
    }

    const saveUpdates = async () => {
        const updatedProduct = {
            category,
            price,
            stock,
            title,
            description,
            subCategory,
            material,
            color,
            brand,
            size,
        };

        try {
            await toast.promise(
                dispatch(editProduct({ id: editId, data: updatedProduct })).unwrap().then(() => {
                    dispatch(getAllProduct());
                    setShowAddProductForm(false); // optionally close the form
                }),
                {
                    loading: 'Updating...',
                    success: <b>Product updated successfully!</b>,
                    error: <b>Failed to update product.</b>,
                }
            );
        } catch (error) {
            console.error("Update failed:", error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-200 flex flex-col md:flex-row font-sans">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-white shadow-lg p-6 rounded-b-lg md:rounded-r-lg md:rounded-b-none">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">Admin Dashboard</h2>
                <nav>
                    <ul className="flex flex-col md:block">
                        <li className="mb-2 md:mb-4">
                            <button
                                onClick={() => setActiveSection('products')}
                                className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 md:text-left
                                    ${activeSection === 'products'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-blue-200 hover:text-blue-700'
                                    }`}
                            >
                                Products
                            </button>
                        </li>
                        <li className="mb-4">
                            <button
                                onClick={() => setActiveSection('orders')}
                                className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 md:text-left
                                    ${activeSection === 'orders'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-gray-700 hover:bg-blue-200 hover:text-blue-700'
                                    }`}
                            >
                                Orders
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8">
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
                    {/* Conditional rendering based on activeSection state */}
                    {activeSection === 'products' && (
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Product Section</h3>

                            {/* button to toggle Add Product form visibility */}
                            <button
                                onClick={() => setShowAddProductForm(!showAddProductForm)}
                                className="mb-6 px-4 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200 text-sm md:text-base"
                            >
                                {showAddProductForm ? 'Hide Add Product Form' : 'Add New Product'}
                            </button>

                            {/* Add Product Form */}
                            {showAddProductForm && (
                                <div className="mb-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-inner">
                                    <h4 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">Add New Product</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {/* Form Fields */}
                                        {[
                                            { id: "productTitle", label: "Title", value: title, setter: setTitle, type: "text" },
                                            { id: "productDescription", label: "Description", value: description, setter: setDescription, type: "text" },
                                            { id: "productCategory", label: "Category", value: category, setter: setCategory, type: "text" },
                                            { id: "productPrice", label: "Price ($)", value: price, setter: setPrice, type: "number", step: "0.01" },
                                            { id: "productStock", label: "Stock", value: stock, setter: setStock, type: "number" },
                                            { id: "productSubCategory", label: "Sub Category", value: subCategory, setter: setSubCategory, type: "text" },
                                            { id: "productMaterial", label: "Material", value: material, setter: setMaterial, type: "text" },
                                            { id: "productColor", label: "Color", value: color, setter: setColor, type: "text" },
                                            { id: "productBrand", label: "Brand", value: brand, setter: setBrand, type: "text" },
                                            { id: "productSize", label: "Size", value: size, setter: setSize, type: "text" },
                                        ].map(({ id, label, value, setter, type, step }) => (
                                            <div key={id}>
                                                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {label}
                                                </label>
                                                <Input
                                                    type={type}
                                                    id={id}
                                                    name={id}
                                                    value={value}
                                                    onChange={(e) => setter(e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                    step={step}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Image Upload Section */}
                                    {!editId &&
                                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-amber-100 p-4 rounded-lg">
                                            {[
                                                { id: "productImage1", image: image1, setImage: setImage1, label: "Image 1" },
                                                { id: "productImage2", image: image2, setImage: setImage2, label: "Image 2" },
                                                { id: "productImage3", image: image3, setImage: setImage3, label: "Image 3" },
                                                { id: "productImage4", image: image4, setImage: setImage4, label: "Image 4" }
                                            ].map(({ id, image, setImage, label }) => (
                                                <div key={id} className="flex flex-col items-center gap-2">
                                                    <label
                                                        htmlFor={id}
                                                        className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded flex items-center justify-center cursor-pointer text-sm font-semibold text-gray-600 overflow-hidden border border-gray-300"
                                                    >
                                                        {image ? (
                                                            <img
                                                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                                                alt={`${label} Preview`}
                                                                className="w-full h-full object-cover rounded"
                                                            />
                                                        ) : (
                                                            <IoMdCloudUpload size={40} className="text-gray-500" />
                                                        )}
                                                    </label>

                                                    <input
                                                        type="file"
                                                        id={id}
                                                        name={id}
                                                        required
                                                        accept="image/*"
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                        className="hidden"
                                                    />

                                                    {image && (
                                                        <button variant="outline" onClick={() => setImage("")} className="w-24 text-xs md:text-sm">
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    }

                                    {/* Submit button */}
                                    <div className="flex justify-end mt-6">
                                        {!editId ?
                                            (
                                                <button
                                                    onClick={() =>
                                                        handleAddProduct({
                                                            category,
                                                            price,
                                                            stock,
                                                            title,
                                                            description,
                                                            subCategory,
                                                            material,
                                                            color,
                                                            brand,
                                                            size,
                                                            image1,
                                                            image2,
                                                            image3,
                                                            image4,
                                                        })
                                                    }
                                                    type="submit"
                                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                                                >
                                                    Add Product
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        saveUpdates({
                                                            category,
                                                            price,
                                                            stock,
                                                            title,
                                                            description,
                                                            subCategory,
                                                            material,
                                                            color,
                                                            brand,
                                                            size,
                                                        })
                                                    }
                                                    type="submit"
                                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-sm md:text-base"
                                                >
                                                    update
                                                </button>
                                            )}
                                    </div>
                                </div>
                            )}

                            {/* Products Table */}
                            <div className="overflow-x-auto mt-8">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                                    <thead className="bg-gray-200 text-gray-700 uppercase text-xs md:text-sm leading-normal">
                                        <tr>
                                            <th className="py-3 px-3 md:px-6 text-left">Product ID</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Name</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Category</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Price</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-xs md:text-sm font-light">
                                        {data?.products.map((product, index) => (
                                            <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50 group">
                                                <td className="py-3 px-3 md:px-6 text-left ">{index + 1}</td>
                                                <td className="py-3 px-3 md:px-6 text-left max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                                                    {product.title}
                                                </td>
                                                <td className="py-3 px-3 md:px-6 text-left">{product.category}</td>
                                                <td className="py-3 px-3 md:px-6 text-left">${product.price}</td>
                                                <td className="py-3 px-3 md:px-6 text-left flex items-center gap-2">
                                                    <span
                                                        className={`py-1 px-2 md:py-2 md:px-3 rounded-full text-xs font-semibold
                                                            ${product.stock > 200
                                                                ? 'bg-green-200 text-green-800'
                                                                : product.stock > 50
                                                                    ? 'bg-yellow-200 text-yellow-800'
                                                                    : 'bg-red-200 text-red-800'
                                                            }`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                    <button className="md:invisible md:group-hover:visible text-red-600"
                                                        onClick={() => removeProductFun(product._id)}
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                    <button className="md:invisible md:group-hover:visible text-blue-500"
                                                        onClick={() => handelEditProduct(product)}
                                                    >
                                                        <CiEdit />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'orders' && (
                        <div>
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Orders Section</h3>
                            <div className="overflow-x-auto mt-8">
                                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                                    <thead className="bg-gray-200 text-gray-700 uppercase text-xs md:text-sm leading-normal">
                                        <tr>
                                            <th className="py-3 px-3 md:px-6 text-left">Order ID</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Customer</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Total</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Status</th>
                                            <th className="py-3 px-3 md:px-6 text-left">Date</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-gray-600 text-xs md:text-sm font-light">
                                        {ordersList?.orders?.map((order, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-3 md:px-6 text-left whitespace-nowrap">{index + 1}</td>
                                                <td className="py-3 px-3 md:px-6 text-left">{order?.userId?.name}</td>
                                                <td className="py-3 px-3 md:px-6 text-left">${order?.totalPrice?.toFixed(2)}</td>
                                                <td className="py-3 px-3 md:px-6 text-left">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) =>
                                                            handleOrderStatusChange({
                                                                id: order._id,
                                                                status: e.target.value,
                                                            })
                                                        }
                                                        className={`py-1 px-2 md:py-2 md:px-3 rounded-full text-xs font-semibold border ${order.status === 'Delivered' ? 'bg-green-200 text-green-800 border-green-300' :
                                                            order.status === 'Shipped' ? 'bg-blue-200 text-blue-800 border-blue-300' :
                                                                order.status === 'Processing' ? 'bg-yellow-200 text-yellow-800 border-yellow-300' :
                                                                    order.status === 'Pending' ? 'bg-orange-200 text-orange-800 border-orange-300' :
                                                                        order.status === 'Cancelled' ? 'bg-red-200 text-red-800 border-red-300' :
                                                                            'bg-gray-200 text-gray-800 border-gray-300'}`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>

                                                <td className="py-3 px-3 md:px-6 text-left">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;