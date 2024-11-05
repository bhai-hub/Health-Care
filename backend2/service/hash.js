import bcrypt from "bcryptjs";

// Function to hash a password
const hashed = async (payload) => {
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the payload (password)
        const hash = await bcrypt.hash(payload, salt);
        return hash; // Return the hashed password
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Hashing failed"); // Handle errors appropriately
    }
};

// Function to compare a plain text password with a hashed password
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch; // Returns true if they match, false otherwise
    } catch (error) {
        console.error("Error comparing password:", error);
        throw new Error("Comparison failed"); // Handle errors appropriately
    }
};

export { hashed, comparePassword };
