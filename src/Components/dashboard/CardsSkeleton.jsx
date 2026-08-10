
const CardsSkeleton = () => {
    return (
        <div className="flex w-full flex-col gap-y-2 h-10 justify-center animate-pulse">
            <div className="h-3 w-1/2 bg-gray-200 rounded-3xl"></div>
            <div className="h-3 w-1/4 bg-gray-200 rounded-3xl"></div>
        </div>
    )
}
export default CardsSkeleton;