
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {

    return (
        <div className="flex w-full justify-center mt-4">
            <div className="flex w-85 justify-between shadow-xl p-5 rounded-md items-center">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="flex items-center justify-center gap-x-2 rounded-md py-1 border border-gray-300 text-gray-700 font-medium cursor-pointer hover:bg-gray-100 w-30 disabled:opacity-30 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    < BiSolidLeftArrow className="inline " />
                    Previous
                </button>
                <span>{currentPage} of {lastPage}</span>
                <button disabled={currentPage === lastPage || lastPage === 0} onClick={() => setCurrentPage(currentPage + 1)} className="flex items-center justify-center gap-x-2 rounded-md border border-gray-300 bg-white py-1 font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer w-30 disabled:opacity-30 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Next
                    <BiSolidRightArrow className="inline" />
                </button>
            </div>
        </div>
    )
}

export default Pagination