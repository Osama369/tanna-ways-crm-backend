import fs from "fs";

const convertFileToBase64 = (filePath) => {
    try {
        const file = fs.readFileSync(filePath);
        return Buffer.from(file).toString('base64');
    } catch (error) {
        throw new Error(`Failed to convert file to base64: ${error.message}`);
    }
};

export { convertFileToBase64 };
