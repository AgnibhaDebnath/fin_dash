const CardsSkeleton = () => {
    return (
        <div className="flex flex-col gap-y-2 h-10 justify-center animate-pulse">
            <div className="h-3 w-30 bg-gray-200 rounded-3xl"></div>
            <div className="h-3 w-15 bg-gray-200 rounded-3xl"></div>
        </div>
    );
};
export default CardsSkeleton;
