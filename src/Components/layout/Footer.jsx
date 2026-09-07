const Footer = () => {
    return (
        <footer className="text-center text-gray-600 text-sm font-medium py-3 mt-6 h-full flex items-end justify-center">
            <h1 className="h-5 font-semibold">
                © {new Date().getFullYear()} Expense<span className="text-indigo-600">Flow</span>
            </h1>
        </footer>
    );
};
export default Footer;
