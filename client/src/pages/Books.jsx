import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
        try {
            const res = await axios.get("http://localhost:8800/booklist");
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    fetchAllBooks();
    }, []);

    //console.log(books);

    const handleDelete = async (book_id) => {
        try {
            await axios.delete(`http://localhost:8800/booklist/${book_id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1 className="font-bold text-2xl">REACT CRUD OEPRATION</h1>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Book Title</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={book.book_id}>
                            <td className="px-6 py-4">{book.title}</td>
                            <td className="px-6 py-4">{book.description}</td>
                            <td className="px-6 py-4">${book.price}</td>
                            <td className="text-center">
                                <button className="delete px-3 py-2 mr-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleDelete(book.book_id)}>Delete</button>
                                <button className="update px-3 py-2 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><Link to={`/update/${book.book_id}`}> Update</Link></button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        <button className="addHome">
            <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                Add new book
            </Link>
        </button>
    </div>
  );
};

export default Books;
