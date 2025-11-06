import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

const Users = () => {

  const columns = [
    "Product Name", "Color", "Category", "Price", "Edit"
  ];

  const data = [
    { name: "Apple MacBook Pro 17", color: "Silver", category: "Laptop", price: "$2999" },
    { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
    { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
  ];

  return (
    <>
      <Header />

      <div className="min-h-[calc(100vh-4rem)] flex">
        <Sidebar />

        <div className="w-full min-h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Users Page</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Welcome to the Users page!</p>

          {/* https://flowbite.com/docs/components/tables/ */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* Table Headers */}
                  {columns.map((column) => (
                    <th key={column} scope="col" className="px-6 py-3">
                      {column}
                    </th>
                  ))}
                </tr >
              </thead >
              <tbody>
                {data.map((item) => (
                  <tr key={item.name} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                    </th>
                    <td className="px-6 py-4" >
                      {item.color}
                    </td >
                    <td className="px-6 py-4" >
                      {item.category}
                    </td >
                  <td className="px-6 py-4" >
                      {item.price}
                  </td >
                  <td className="px-6 py-4 text-right" >
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" > Edit</a >
                  </td >
                </tr >
                ))}
              </tbody >
            </table >
          </div >

        </div>


      </div >
    </>
  );
};

export default Users;