import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../Routes/Hooks/useAxiosPublic"
import { useState } from "react"
import { useLoaderData } from "react-router-dom"

const Product = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [asc, setAsc] = useState('desc');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const axiosPublic = useAxiosPublic();


    const { data: product = [] } = useQuery({
        queryKey: ['product', currentPage, asc],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?page=${currentPage}&size=${itemsPerPage}&sort=${asc}`);
            return res.data;
        }

    })
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


    // loader using fetch data

    const { count } = useLoaderData()
    //pagination 

    const itemsPerPage = 10
    const numberOfPages = Math.ceil(count / itemsPerPage)
    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }


    // const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)


    // handle selected items || sorting filtering
    console.log(asc)
    return (
        <>

            <div className="flex justify-center gap-5 mt-6">
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
                    {/* --- Min Price --- */}
                    <div>
                        <div className="flex justify-center ml-2 mt-2 lg:ml-40">
                            <div className="rounded-md w-full px-4 max-w-xl   lg:mt-0">
                                <label className="label">
                                    <span className="font-medium">Min Price :</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    className="w-32  p-3 rounded-md   border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                />
                            </div>

                            {/* --- Max Price --- */}
                            <div className="rounded-md w-full px-4 max-w-xl lg:mt-0">
                                <label className="label">
                                    <span className="font-medium">Max Price :</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    className="w-40  p-3 rounded-md  border-blue-300   input-bordered border  placeholder-gray-500 dark:placeholder-gray-500 dark:border-indigo-600 dark:text-black   "
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    {/* ---------- Filter by Price Range End----------*/}
                </div>

                <div className="space-y-6">
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


                    <div>
                        <div>
                            <select onChange={(e) => setAsc(e.target.value)} value={asc} className="select select-bordered w-full">
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>

                        </div>

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
            <div className="flex justify-center items-center my-10 mb-[250px] space-x-3">

                <button onClick={handlePrevPage} className="btn btn-sm">Prev</button>
                {
                    pages.map((page, idx) => <button key={page} onClick={() => setCurrentPage(page)} className={`btn border ${currentPage === page && 'bg-neutral text-white'}`}>{idx + 1}</button>)
                }
                <button onClick={handleNextPage} className="btn btn-sm">Next</button>
            </div>
        </>
    )
}

export default Product
