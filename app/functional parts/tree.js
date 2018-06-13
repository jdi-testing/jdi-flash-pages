function getChildren(mapArr, parentId) {
    if (typeof mapArr.get === "function") {
        let arr = mapArr.get(parentId);
        //let arr = mapArr.get(parentName);
        //resTree = getChildren(map.get(null), map)
        let tree = [];
        if (arr) {
            let len = arr.length;
            for (let i = 0; i < len; i++) {
                let element = arr[i];
                element.children = [];
                if (mapArr.has(element.elId)) {
                    element.children = getChildren(mapArr, element.elId);
                }
                // if (mapArr.has(element.name)) {
                //     element.children = getChildren(mapArr, element.name);
                // }
                tree.push(element)
            }
        }
        return tree;
    } return [];
}

//sections.size

function sub(sections, element){
    if (!!sections.size){
      return typeof element === 'string' ? sections.get(element) : element 
    }
    return element;
}

function check(arr, sections) {
    let testSecInArr = arr.filter(e => typeof e === 'string');
    if (!testSecInArr.length){
        return true;
    }
    if (!!sections.size){
        return true;
    }
    return false;
}

function drawMap(arr, sections, mapArr) {
    if (check(arr, sections)) {
        for (let i = 0; i < arr.length; i++) {
            let element = typeof arr[i] === 'string' ? sections.get(arr[i]) : arr[i];
            if (!!element) {
                element.title = element.Name;
                element.subtitle = element.Type;
                // let parent = element.parent;
                // if (mapArr.has(parent)) {
                //     let list = mapArr.get(parent);
                //     list.push(element);
                // } else {
                //     mapArr.set(parent, [element])
                // }
                let parentId = element.parentId;
                if (mapArr.has(parentId)) {
                    let list = mapArr.get(parentId);
                    list.push(element);
                } else {
                    mapArr.set(parentId, [element])
                }
            } else {
                return []
            }
        }
        return mapArr;
    } return [];
}

function searchElement(searched, pageElements, sections) {
    //let searched = e.target.value;
    let searchedArr = [];
    let result = [];
    let newElements = [];

    newElements = pageElements.map((element) => {
        return (typeof element === 'string') ? sections.get(element) : element
    });

    searchedArr = newElements.filter(element => element.Name.toLowerCase().includes(searched.toLowerCase()));

    if (!!searchedArr.length) {
        function findParent(p) {
            if (p === null) {
                return
            };
            let element = sections.get(p); /*pageElements.find((element) => element.elId === p);*/
            let e = result.find((r) => { return r.elId === element.elId });
            if (!e) {
                element.children = [];
                element.expanded = true;
                result.push(element);
            }
            findParent(element.parentId);
        }

        for (let i = 0; i < searchedArr.length; i++) {
            searchedArr[i].children = [];
            if (!result.find((r) => r.elId === searchedArr[i].elId)) {
                searchedArr[i].expanded = true;
                result.push(searchedArr[i]);
            };
            findParent(searchedArr[i].parentId);
        }
    }   
    return result;
}

export { getChildren, drawMap, searchElement }
