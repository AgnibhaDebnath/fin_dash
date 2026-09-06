import { features } from "@/constants/home/features";
const Features = () => {
    return (
        <section className="w-full font-[inter] py-5 px-4">
            <div className="w-full flex flex-col">
                <div className="w-full flex flex-col items-center">
                    <div className="space-y-5">
                        <div className="flex justify-center">
                            <span className="text-indigo-600 font-semibold tracking-wide text-sm">
                                BUILT FOR YOUR FINANCES
                            </span>
                        </div>
                        <div className="flex justify-center">
                            <h2 className="text-[1.02rem] min-[420px]:text-xl min-[500px]:text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
                                Everything You Need to Manage Your Money
                            </h2>
                        </div>
                        <div>
                            <p className="max-w-3xl text-sm sm:text-base md:text-lg leading-6 text-slate-600">
                                Track transactions, understand spending patterns, and get a clear
                                view of your financial activity — all from one simple dashboard.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center min-[780px]:justify-between py-10 gap-y-5 gap-x-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg w-78 min-[370px]:w-80 min-[410px]:w-90 min-[450px]:w-100 min-[780px]:w-90 min-[860px]:w-100 min-[1385px]:w-110"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-5 text-xl font-semibold text-slate-800">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
