export function showPage(pageId){
    return {
        type: 'SHOW_PAGE',
        pageId
    }
}

export function changeTree(treeData, droppedItem){
    return {
        type: 'CHANGE_TREE',
        treeData,
        droppedItem
    }
}

export function addElement(parentId){
    return {
        type: 'ADD_ELEMENT',
        element: {
            "Name": "",
            "Type": "Button",
            "parent": "",
            "parentId": parentId,
            "Locator": ""
        }
    }
}

export function deleteElement(elId){
    return {
        type: 'DELETE_ELEMENT',
        elId
    }
}

export function selectElement(elId){
    return {
        type: 'SELECT_ELEMENT',
        elId
    }
}

export function searchElement(elName){
    return {
        type: 'SEARCH_ELEMENT',
        elName
    }
}

export function editElement(elField, value){
    return {
        type: 'EDIT_ELEMENT',
        elField: elField,
        value: value
    }
}

export function generateElements(){
    return {
        type: 'GENERATE_ELEMENTS'
    }
}