import { getChildren, drawMap, searchElement } from '../functional parts/tree';
import { findPage, findElement } from '../functional parts/common';
import { genEl } from './POgen/genPo';
import cssToXpath from '../libs/cssToXpath/cssToXPath';
import { setTimeout } from 'timers';

let map = new Map();
let resTree = [];
export let genRand = (name) => {
    return (name + (Math.floor(Math.random() * (1000 - 1)) + 1) + (Math.floor(Math.random() * (1000 - 1)) + 1));
};

export let showPage = (mainObj, id) => {
    let pageElements = findPage(id, mainObj.PageObjects).elements;
    map = drawMap(pageElements, mainObj.sections, new Map());
    resTree = getChildren(map, null);
    return Object.assign({}, mainObj, {
        activeTabPageId: id,
        ElementsDetails: true,
        RulesDetails: false,
        PagesDetails: false,
        SiteDetails: false,
        CodeDetails: false,
        resultTree: resTree,
        pageMap: map,
        selectedElement: '',
        selectedRule: '',
        ruleId: -1
    })
};

export let changeTree = (mainObj, treeData, droppedItem) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let copyPageObjectsArray = findPage(pageId, objCopy.PageObjects).elements;

    treeData.forEach((el) => {
        el.parent = null;
        el.parentId = null;
    });

    function check(nodeArr) {
        let result = [];
        for (let k = 0; k < nodeArr.length; k++) {
            let m = [];
            let children = [];
            if (nodeArr[k].children.length) {
                let newParentId = nodeArr[k].elId;
                let newParent = nodeArr[k].Name;
                children = nodeArr[k].children;
                children.forEach((el) => {
                    el.parentId = newParentId;
                    el.parent = newParent;
                });
                m = result.concat(nodeArr[k].children);
                result = m;
            }
        }
        if (result.length) {
            check(result);
        }
    }

    check(treeData);

    if (droppedItem) {
        let element = copyPageObjectsArray.find((e) => {
            if (typeof e === 'string') {
                if (e === droppedItem.elId) {
                    return objCopy.sections.get(droppedItem.elId);
                }
            } else {
                if (e.elId === droppedItem.elId) {
                    return e;
                }
            }
        });

        objCopy.sections.forEach((section, key) => {
            if (!!section.children) {
                let children = section.children;
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    if (child.elId === element.elId) {
                        child.parent = element.parent;
                        child.parentId = element.parentId;
                        break;
                    }
                }
                objCopy.sections.set(key, section);
            }
        })

        let pages = objCopy.PageObjects.map((p) => {
            if (p.elements) {
                for (let k = 0; k < p.elements.length; k++) {
                    let e = p.elements[k];
                    if (typeof e !== 'string' && e.elId === element.elId) {
                        e.parentId = element.parentId;
                        e.parent = element.parent;
                    }
                }
            }
            return p;
        })
        objCopy.PageObjects = pages;
    }

    map = drawMap(copyPageObjectsArray, new Map());
    objCopy.pageMap = map;
    objCopy.resultTree = treeData;

    return objCopy;
};

function updateSections(objCopy, element) {
    let sectionId = element.parentId;
    let section = objCopy.sections.get(sectionId);
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        for (let j = 0; j < page.elements.length; j++) {
            if (page.elements[j] === sectionId) {
                page.elements.push(element);
                break;
            }
        }
    }
    return objCopy;
}

export let addElement = (mainObj, element) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;
    let parent = null;
    element.Name = genRand("Element");
    element.elId = genRand("El");

    if (element.parentId !== null) {
        let section = objCopy.sections.get(element.parentId);
        section.expanded = true;
        element.parent = section.Name;
        section.children.push(element);
        objCopy.sections.set(element.parentId, section);
        objCopy = updateSections(objCopy, element);
    } else {
        element.parent = null;
        elementsArray.push(element);
    }

    map = drawMap(elementsArray, objCopy.sections, new Map());
    objCopy.pageMap = map;
    objCopy.resultTree = getChildren(map, null);
    return objCopy;
};

function delEl(arr, id) {
    return arr.filter((el) => typeof el === 'string' ? el !== id : el.elId !== id);
}

export let deleteElement = (mainObj, elId) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let parent, element;
    let elementsArray = objCopy.PageObjects.find(page => page.pageId === objCopy.activeTabPageId).elements;
    let result = [];

    if (!!objCopy.sections.get(elId)) {
        element = objCopy.sections.get(elId)
        let children = element.children;
        objCopy = deleteElementByParanetId(objCopy, elId);
        objCopy = removeFromSections(objCopy, elId);
        objCopy.sections.delete(elId);
    } else {
        element = findElement(elId, elementsArray);
    }
    parent = element.parentId;
    if (!!parent) {
        let parentSection = objCopy.sections.get(parent);
        let parentChildren = parentSection.children.slice();
        parentSection.children = delEl(parentChildren, elId);
        objCopy.sections.set(parent, parentSection);
    }
    objCopy.PageObjects.forEach(page => {
        let elements = delEl(page.elements, elId);
        page.elements = elements;
    })
    elementsArray = objCopy.PageObjects.find(page => page.pageId === objCopy.activeTabPageId).elements;

    map = drawMap(elementsArray, objCopy.sections, new Map());
    resTree = getChildren(map, null);
    objCopy.pageMap = map;
    objCopy.resultTree = resTree;
    objCopy.selectedElement = '';

    return objCopy;
};

function locatorF(element) {
    return element.Locator || element.Root;
}
function isXpath(locator) { return locator[1] === '/'; }

function createFullLocator(objCopy, element) {
    let locator = locatorF(element);
    let parentId = element.parentId;
    if (!!parentId) {
        let sections = objCopy.sections;
        let xpath = isXpath(locator);
        while (!!parentId) {
            let parent = sections.get(parentId);
            let parentLocator = locatorF(parent);
            if (xpath) {
                let l = (locator.indexOf('.') === 0) ? locator.slice(1) : locator;
                locator = isXpath(parentLocator) ? parentLocator + l : cssToXpath(parentLocator) + l;
            } else {
                if (!isXpath(parentLocator)) {
                    locator = parentLocator + ' ' + locator;
                } else {
                    locator = parentLocator + cssToXpath(locator);
                    xpath = true;
                }
            }
            parentId = parent.parentId;
        }
        return locator;
    }
    return locator;
}

function getElementBy(locator, dom) {
    return isXpath(locator) ? document.evaluate(`.${locator}`, dom, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        : dom.querySelector(locator);
}

export let selectElement = (mainObj, elId) => {
    location.href = "#add-tab-page"
    //location.href = "#smallInvisibleInput"
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let page = findPage(pageId, objCopy.PageObjects);
    let elementsArray = page.elements;
    let element = findElement(elId, elementsArray) || objCopy.sections.get(elId);
    let complex = Object.keys(objCopy.ComplexRules);
    let simple = Object.keys(objCopy.SimpleRules);

    if (element.Locator || element.Root) {
        objCopy.originalStyle = {
            border: '',
            boxSizing: ''
        };

        let border = '0.25rem solid';
        let boxSizing = 'content-box';

        if (complex.includes(element.Type)) {
            border += '#FF00FF';
        } else if (simple.includes(element.Type)) {
            border += '#00FF00';
        } else {
            border += '#00FFFF';
        }

        let fullLocatorNew = createFullLocator(objCopy, element);
        if (!!objCopy.selectedElement) {
            let fullLocatorOld = createFullLocator(objCopy, objCopy.selectedElement);
            let original = objCopy.originalStyle;

            if (isXpath(fullLocatorOld)) {
                chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorOld + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.border = "' + original.border + '"', (result) => { })
                chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorOld + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.boxSizing = "' + original.boxSizing + '"', (result) => { })
            } else {
                chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorOld + '").style.border = "' + original.border + '"', (result) => { })
                chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorOld + '").style.boxSizing = "' + original.boxSizing + '"', (result) => { })
            }
        }
        
        if (isXpath(fullLocatorNew)) {
            chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorNew + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.boxSizing', (result) => {
                objCopy.originalStyle.boxSizing = result;
            })
            chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorNew + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.border', (result) => {
                objCopy.originalStyle.border = result;
            })
            chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorNew + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.border = "' + border + '"', (result) => { })
            chrome.devtools.inspectedWindow.eval('document.evaluate("' + fullLocatorNew + '", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.boxSizing = "' + boxSizing + '"', (result) => { })
        } else {
            chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorNew + '").style.boxSizing', (result) => {
                objCopy.originalStyle.boxSizing = result;
            })
            chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorNew + '").style.border', (result) => {
                objCopy.originalStyle.border = result;
            })
            chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorNew + '").style.border = "' + border + '"', (result) => { })
            chrome.devtools.inspectedWindow.eval('document.querySelector("' + fullLocatorNew + '").style.boxSizing = "' + boxSizing + '"', (result) => { })
        }
    }

    objCopy.selectedElement = element;
    objCopy.CodeDetails = false;

    return objCopy;
};

export let searchEl = (mainObj, elName) => {
    let objCopy = Object.assign({}, mainObj);
    let pageId = objCopy.activeTabPageId;
    let elementsArray = findPage(pageId, objCopy.PageObjects).elements;

    if (elName === "" || elName.replace(/\s/g, "") === "") {
        map = drawMap(elementsArray, objCopy.sections, new Map());
        resTree = getChildren(map, null);
    } else {
        let res = searchElement(elName, elementsArray, objCopy.sections);
        map = drawMap(res, objCopy.sections, new Map());
        resTree = getChildren(map, null);
    }

    objCopy.resultTree = resTree;
    objCopy.pageMap = map;
    objCopy.selectedElement = "";

    return objCopy;
};

function createNewElem(objCopy, oldElem) {
    let newElem = {
        ...oldElem
    }
    let fields = Object.keys(objCopy.ElementFields[newElem.Type]);
    for (let f = 0; f < fields.length; f++) {
        if (!newElem.hasOwnProperty(fields[f])) {
            newElem[fields[f]] = "";
        }
    }
    return newElem;
}

function deleteElementByParanetId(objCopy, parentId, withParent) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        let elements = page.elements.filter(element => {
            let el = typeof element === 'string' ? objCopy.sections.get(element) : element;
            if (el) {
                if (el.parentId !== parentId) {
                    return element;
                }
            }
        });
        page.elements = elements;
    }
    return objCopy;
}

function removeFromSections(objCopy, parentId) {
    objCopy.sections.forEach((value, key) => {
        if (value.parentId === parentId) {
            objCopy = deleteElementByParanetId(objCopy, value.elId);
            objCopy = removeFromSections(objCopy, value.elId);
            objCopy.sections.delete(value.elId);
        }
    });
    return objCopy;
}

function updateAllPages(objCopy, element) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        let elements = page.elements.map(el => {
            if (typeof el === 'string' && el === element.elId) {
                el = element;
            }
            if (typeof el !== 'string' && el.elId === element.elId) {
                el = element
            }
            return el;
        });
        page.elements = elements;
    }
    return objCopy;
}

function convertToSection(objCopy, element) {
    for (let i = 0; i < objCopy.PageObjects.length; i++) {
        let page = objCopy.PageObjects[i];
        let elements = page.elements.map(el => {
            if (el.elId === element.elId) {
                el = element.elId;
            }
            return el;
        });
        page.elements = elements;
    }
    return objCopy;
}

function updateParentIfExist(objCopy, element) {
    if (!!element.parentId) {
        let sections = objCopy.sections;
        let section = sections.get(element.parentId);
        if (!!section) {
            section.expanded = true;
            let children = section.children.map(el => {
                if (el.elId === element.elId) {
                    el = element;
                }
                return el;
            });
            section.children = children;
            objCopy.sections.set(element.parentId, section);
        }
    }
    return objCopy;
}

export let editElement = (mainObj, elField, value) => {
    let objCopy = Object.assign({}, mainObj);
    let composites = Object.keys(objCopy.CompositeRules);

    if (value.length || typeof value === "boolean") {
        function commonForNewSection() {
            selectedElement.children = [];
            selectedElement.isSection = true;
            objCopy.selectedElement = selectedElement;
            objCopy.sections.set(selectedElement.elId, selectedElement);
        }
        function commonForOldSection() {
            objCopy = deleteElementByParanetId(objCopy, selectedElement.elId, false);
            objCopy = removeFromSections(objCopy, selectedElement.elId);
            selectedElement = createNewElem(objCopy, selectedElement);
        }

        let pageId = objCopy.activeTabPageId;
        let selectedElement = {
            elId: objCopy.selectedElement.elId,
            Type: objCopy.selectedElement.Type,
            parentId: objCopy.selectedElement.parentId,
            parent: objCopy.selectedElement.parent,
            Name: objCopy.selectedElement.Name
        };
        //it can be composite element
        if (composites.includes(selectedElement.Type)) {
            //change to composite
            selectedElement[elField] = value;
            if (composites.includes(value) && elField === 'Type') {
                commonForOldSection()
                commonForNewSection();
            } else /*to any other element*/ if (!composites.includes(value) && elField === 'Type') {
                commonForOldSection()
                objCopy.sections.delete(selectedElement.elId);
                objCopy = updateAllPages(objCopy, selectedElement);
            } /*change any other fields*/ else {
                selectedElement = { ...objCopy.selectedElement }
                selectedElement[elField] = value;
                objCopy.sections.set(selectedElement.elId, selectedElement);
                //objCopy = updateAllPages(objCopy, selectedElement);
            }
        } /*it can any other type of element*/ else {
            //change to composite type
            if (composites.includes(value) && elField === 'Type') {
                selectedElement[elField] = value;
                selectedElement = createNewElem(objCopy, selectedElement);
                commonForNewSection();
                objCopy = convertToSection(objCopy, selectedElement);
            } /*change any other fields*/ else {
                selectedElement = { ...objCopy.selectedElement }
                selectedElement[elField] = value;
                objCopy = updateAllPages(objCopy, selectedElement);
            }
        }
        objCopy.selectedElement = selectedElement;
        objCopy = updateParentIfExist(objCopy, selectedElement);
        map = drawMap(findPage(pageId, objCopy.PageObjects).elements, objCopy.sections, new Map());
        resTree = getChildren(map, null);
        objCopy.resultTree = resTree;
        objCopy.pageMap = map;
    }
    console.log(objCopy);
    return objCopy;
};

export let generateElements = (mainObj) => {
    let objCopy = { ...mainObj };
    genEl(objCopy);
    return objCopy;
}