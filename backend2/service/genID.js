import {v4 as uuidv4} from "uuid"

const generateShortUUID = () => {
    // Generate a UUID and slice the first 8 characters
    return uuidv4().replace(/-/g, '').slice(0, 8);
};

export default {generateShortUUID}