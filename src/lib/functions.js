//helper functions
isJSON = function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
trim  = function trim(str) {
    if(str)
    {
        str = str.trim();
        str.replace(/\\/g, "\\\\")
            .replace(/\$/g, "\\$")
            .replace(/'/g, "\\'")
            .replace(/"/g, "\\\"");
    }
    return str;
};