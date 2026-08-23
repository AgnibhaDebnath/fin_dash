import { z } from "zod";
const TransactionSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(40, "Title must be less than 30 characters"),

    amount: z.preprocess(
        (value) => (value === "" ? null : Number(value)),
        z.number({ error: "Amount is required" }).positive("Amount must be greater than 0"),
    ),
    type: z.enum(["income", "expense"], {
        error: "Please select a transaction type",
    }),

    category: z.enum(
        [
            "food",
            "transport",
            "shopping",
            "bills",
            "salary",
            "healthcare",
            "entertainment",
            "household",
            "education",
            "investment",
            "freelance",
        ],
        {
            error: "Please select a category",
        },
    ),
    date: z.coerce.date({
        error: "Please select a date",
    }),
});

const transactionFormValidator = (req, res, next) => {
    const result = TransactionSchema.safeParse(req.body);

    if (!result.success) {
        const tree = z.treeifyError(result.error);

        return res.status(400).json({
            errors: {
                title: tree.properties?.title?.errors ?? [],
                amount: tree.properties?.amount?.errors ?? [],
                type: tree.properties?.type?.errors ?? [],
                category: tree.properties?.category?.errors ?? [],
                date: tree.properties?.date?.errors ?? [],
            },
        });
    }
    next();
};

export default transactionFormValidator;
