function findElement(id, arr) {
    return arr.find((el) => el.elId === id)    
}

function findPage(id, arr) {
    let page = arr.find((page) => {
        return page.pageId === id;
    })
    return page;
}

function findParentData(el, d){
    while (el.dataset[d] === undefined) {
        el = el.parentNode;
    }
    return el;
}


export { findElement, findPage, findParentData}