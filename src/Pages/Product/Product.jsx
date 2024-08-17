import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../Routes/Hooks/useAxiosPublic"
import { useState } from "react"

const Product = () => {
    const axiosPublic = useAxiosPublic()
    const { data: product = [] } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            return res.data
        }

    })
    console.log(product)
    // State to track both selected brand and category
    const [selectedOptions, setSelectedOptions] = useState({
        brand: "",
        category: "",
    });

    // Handle change for both brand and category
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedOptions((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Use Set to get unique brands and categories
    const uniqueBrands = [...new Set(product.map((pro) => pro.brandName))];
    const uniqueCategories = [...new Set(product.map((pro) => pro.category))];
    return (
        <>

            <div className="flex">
                <div className="space-y-6">
                    <div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <div>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Price Range</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>

                    </div>
                </div>

                <div>
                    <div>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Chose a Brand</option>
                            <div>
                                <select
                                    name="brand"
                                    className="select select-bordered w-full"
                                    value={selectedOptions.brand}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">
                                        Choose a Brand
                                    </option>
                                    {uniqueBrands.map((brand, index) => (
                                        <option key={index} value={brand} className="uppercase">
                                            {brand}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </select>

                    </div>

                    <div>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Sorting By</option>
                            <option>Low to high</option>
                            <option>High to low</option>
                        </select>

                    </div>
                </div>
                <div>
                    <div>
                        <select
                            name="category"
                            className="select select-bordered w-full"
                            value={selectedOptions.category}
                            onChange={handleChange}
                        >
                            <option disabled value="">
                                Choose a Category
                            </option>
                            {uniqueCategories.map((category, index) => (
                                <option key={index} value={category} className="uppercase">
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
                {
                    product.map(item => <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src={item.image}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {item.title}
                            </h2>
                            <p>Price ${item.price}</p>
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default Product
