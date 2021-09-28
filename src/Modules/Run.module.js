const run = {
    filterdata: (array,datakey,matchWith) => {
        return array.filter((data) => data.datakey.toLowerCase().match(matchWith.toLowerCase()))
    }
}
export {
    run
};