import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
const ALL_COLORS = [
    "red",
    "brown",
    "blue",
    "yellow",
    "green",
];
const PRIMARY_COLORS = ["red", "blue", "yellow"];

const retrieve = async(options={}) => {
    const {page=1, colors=ALL_COLORS} = options;
    const offset = (page - 1) * 10;
    const url = URI(window.path).addQuery({"colors[]": colors}).addQuery("offset", offset).addQuery("limit",10);
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const previousPage = (page - 1 >= 1) ? page -1 : null;
        const nextPage = (page + 1 <= 50) ? page + 1 : null;
        const ids = data.map(item => item.id);
        const open = data.filter(item => item.disposition === "open").map(item => ({...item, isPrimary: PRIMARY_COLORS.includes(item.color)}));
        const closedPrimaryCount = data.filter(item => item.disposition === "closed" && PRIMARY_COLORS.includes(item.color)).length;

        return {
            ids,
            open,
            closedPrimaryCount,
            previousPage,
            nextPage,
        };
    } catch(e) {
        console.log("Something went wrong: "+ e);
    }
    return null;
}
export default retrieve;
