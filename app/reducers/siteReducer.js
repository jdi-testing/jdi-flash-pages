export let addPage = (mainObj, obj) => {
    let arrCopy = mainObj.PageObjects.slice();
    let id = (arrCopy.length > 0) ? (arrCopy[arrCopy.length - 1].pageId + 1) : 0;
    obj.pageId = id;
    obj.name += id;
    arrCopy.push(obj);
    let objCopy = Object.assign({}, mainObj);
    objCopy.PageObjects = arrCopy;
    objCopy.searchedPages = arrCopy;
    return objCopy
}

export let deletePage = (mainObj, id) => {
    let objCopy = Object.assign({}, mainObj);
    if (!!objCopy.PageObjects.length) {
        objCopy.searchedPages = objCopy.PageObjects.filter((page) => page.pageId !== id);
        objCopy.PageObjects = objCopy.searchedPages;
        objCopy.activeTabPageId = -1;
    }
    return objCopy;
}

export let selectPage = (mainObj, id) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.selectedPage = objCopy.PageObjects.find(page => page.pageId === id);
    objCopy.activeTabPageId = id;  
    return objCopy;
}

export let searchPage = (mainObj, searchedPage) => {
    let objCopy = Object.assign({}, mainObj);
    if (!!searchedPage) {
        objCopy.searchedPages = objCopy.PageObjects.filter(page =>
            page.name.toLowerCase().includes(searchedPage.toLowerCase())
        );
    } else {
        objCopy.searchedPages = objCopy.PageObjects.slice();
    }
    objCopy.activeTabPageId = -1;
    return objCopy;
}

export let editValue = (mainObj, element, value) => {
    let objCopy = Object.assign({}, mainObj);
    let arr = objCopy.PageObjects.slice();
    let selectedPage = Object.assign({}, objCopy.selectedPage);
    if (element.length > 1) {
        objCopy[element[0]][element[1]] = value;
    } else {
        arr.map((page) => {
            if (page.pageId === objCopy.activeTabPageId) {
                page[element[0]] = value;
            }
            return page;
        });
        selectedPage[element[0]] = value;
        objCopy.PageObjects = arr;
        objCopy.selectedPage = selectedPage;
    }
  
    return objCopy;
}

export let closePage = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.activeTabPageId = -1;
    return objCopy;
}

export let backToSite = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.activeTabPageId = -1;
    objCopy.ElementsDetails = false;
    objCopy.RulesDetails = false;
    objCopy.PagesDetails = false;
    objCopy.CodeDetails = false;
    objCopy.SiteDetails = true;
    objCopy.selectedElement = '';
    return objCopy;
}