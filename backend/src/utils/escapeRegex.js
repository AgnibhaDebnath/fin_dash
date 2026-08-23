export function escapeRegex(text) {
    return text.replace(
        /[.*+?^${}()|[\]\\]/g, // Find every regex special character
        "\\$&", // Prefix each one with a backslash
    );
}
