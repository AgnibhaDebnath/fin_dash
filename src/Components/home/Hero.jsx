import { Link } from "react-router";
import dashboardPreview from "../../assets/dashboardPreview.png";
const Hero = () => {
    return (
        <section className="w-full font-[inter] bg-slate-50">
            <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />
            <div className="flex w-full flex-col gap-12 px-4 py-12 min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-8 min-[900px]:pl-8 min-[900px]:pr-5 min-[900px]:py-10">
                <div className="flex w-full min-[900px]:w-3/5 flex-col gap-y-10">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 tracking-wide">
                            SMART EXPENSE MANAGEMENT
                        </span>
                    </div>
                    <div>
                        <h2 className="text-4xl min-[430px]:text-5xl min-[1000px]:text-6xl min-[1100px]:text-7xl font-bold text-slate-600 tracking-tight">
                            Take Control of Your <span className="text-indigo-600">Finances</span>,
                            Effortlessly.
                        </h2>
                    </div>
                    <div>
                        <p className="text-base sm:text-lg leading-8 text-slate-600 max-w-xl">
                            Track your income and expenses, understand your spending habits, and
                            make smarter financial decisions.
                        </p>
                    </div>
                    <div>
                        <Link
                            to="/signup"
                            className="px-8 py-2 rounded-md bg-indigo-600 text-white font-semibold tracking-wide hover:bg-indigo-700 cursor-pointer"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="flex w-full min-[900px]:w-3/5 min-[1000px]:w-1/2 min-[1100px]:w-2/5 justify-center">
                    <img
                        src={dashboardPreview}
                        alt="ExpenseFlow dashboard overview"
                        className="h-60 min-[400px]:h-72 w-110 rounded-3xl hover:scale-102 z-40 transition duration-300 shadow-xl sm:shadow-md"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
