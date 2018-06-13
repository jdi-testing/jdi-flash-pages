import cssToXpath from "../../libs/cssToXpath/cssToXPath";
import { genRand } from '../pageReducer';
import { ElementFields } from "../../data/settings";

//ok
let warningLog = [];
export let addToLog = (str) => {
  warningLog.push(str);
};
export let getLog = () => {
  return warningLog;
};
//ok
let fillEl = (e, t, parent, ruleId, objCopy) => {
  let result = { ...e, Type: t };
  if (objCopy.CompositeRules[t]) {
    result.parent = null;
    result.parentId = null;
    result.elId = findSection(e.Locator, t, objCopy) || genRand("El");
    return result;
    //results.push(result);
  } else {
    result.parentId = parent.elId;
    result.parent = parent.Name;
    result.elId = genRand("El");
    return applyFoundResult(result, objCopy, parent, ruleId);
  }
};
//ok
let findSection = (locator, type, objCopy) => {
  let id;
  objCopy.sections.forEach((value, key) => {
    if (value.Locator === locator && value.Type === type) {
      id = key;
    }
  });
  return id;
};
//ok
export let defineElements = (dom, objCopy, Locator, uniq, t, ruleId, parent) => {
  let splitUniqness = uniq.split("#");
  let uniqness = {
    locator: splitUniqness.length == 2 ? splitUniqness[0] : "",
    value: splitUniqness.length == 2 ? splitUniqness[1] : uniq
  };
  let firstSearch = searchByWithoutValue(dom, Locator, uniqness, objCopy);
  let xpath = firstSearch.locatorType.xpath;
  let elements = firstSearch.elements;
  if (elements.length === 0) {
    return;
  }
  if (elements.length === 1) {
    let e = {
      Locator: firstSearch.locatorType.locator,
      content: elements[0],
      Name: nameElement(firstSearch.locatorType.locator, uniq, "", elements[0])
    };
    console.log('e1', e)
    return fillEl(e, t, parent, ruleId, objCopy);
  }
  if (elements.length > 1) {
    if (uniqness.value === 'tag' || uniqness.value === '['){
      addToLog(
        `\nToo much elements found(${elements.length} for ${
          uniqness.value
        }. Locator (${firstSearch.locatorType.locator}))`
      );
    }
    for (let i = 0; i < elements.length; i++) {
      console.log('elements', elements)
      let val = getValue(elements[i], uniqness, Locator);
      let finalLocator = xpath
        ? valueToXpath(firstSearch.locatorType.locator, uniqness, val)
        : firstSearch.locatorType.locator + valueToCss(uniqness, val);
      let s2 = getElements(
        dom,
        { locator: finalLocator, xpath: xpath }
      );
      if (s2.elements.length === 1) {
        let e = {
          Locator: finalLocator,
          content: s2.elements[0],
          Name: nameElement(finalLocator, uniq, val, s2.elements[0])
        };
        console.log('e many', e)
        return fillEl(e, t, parent, ruleId, objCopy);
      } else {
        addToLog(
          `\nToo much elements found(${
            s2.elements.length
          }. Locator (${finalLocator}))`,
        );
      }
    }
  }
};

//ok
export let isXpath = locator => locator[1] === "/";

//ok
let generateLocator = (xpath, locator) =>
  xpath === isXpath(locator) ? locator : cssToXpath(locator);

//ok
let getCorrectLocator = (dom, locator, uniqness) => {
  let results = {
    xpath:
      isXpath(locator) ||
      isXpath(uniqness.locator) ||
      uniqness.value === "text",
    locator: ""
  };
  results.locator = generateLocator(results.xpath, locator);
  results.locator =
    results.locator.indexOf("//") === 0
      ? "." + results.locator
      : results.locator;
  if (uniqness.locator)
    results.locator += generateLocator(results.xpath, uniqness.locator);
  return results;
};
//ok
export let getElementsByXpath = (dom, locator) => {
  let results = [];

  let r = document.evaluate(
    locator,
    dom,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  for (let i = 0; i < r.snapshotLength; i++) {
    results.push(r.snapshotItem(i));
  }
  return results;
};
//ok
let getElements = (dom, locatorType) => {
  let elements = [];
  try {
    elements = locatorType.xpath
      ? getElementsByXpath(dom, locatorType.locator)
      : dom.querySelectorAll(locatorType.locator);
  } catch (e) {
    addToLog(`Error!: cannot get elements by '${locatorType.locator}'`);
  }
  return {
    elements: elements,
    locatorType: locatorType
  };
};
//ok
let searchByWithoutValue = (dom, locator, uniqness) => {
  let locatorType = getCorrectLocator(dom, locator, uniqness);
  return getElements(dom, locatorType);
};
//ok
let getValue = (content, uniqness, locator) => {
  switch (uniqness.value) {
    case "text":
      return content.innerText.trim().split(/\n/)[0];
    default:
      return content.attributes[uniqness.value]
        ? content.attributes[uniqness.value].value
        : undefined;
  }
};
//ok
let findInParent = (element, parent, objCopy) => {
  let page = objCopy.PageObjects.find(page => page.pageId === objCopy.activeTabPageId);
  let loc = element.Locator ? "Locator" : "Root";
  //let found = objCopy.sections.find((section) => parent.Locator === section.Locator && parent.Type === section.Type);
  let found, find;
  objCopy.sections.forEach((value, key) => {
    if (value.elId === parent.elId && value.Name === parent.Name) {
      found = key;
    }
  });

  if (!!found) {
    let sec = objCopy.sections.get(found);
    let children = sec.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i][loc] === element[loc]) {
        element.elId = children[i].elId;
        find = true;
        break;
      }
    }
    if (!find) {
      children.push(element);
      objCopy.sections.set(found, sec);
    }
  }
  page.elements.push(element);
  return objCopy;
};
//ok
let camelCase = n => {
  let name = "";
  if (n) {
    let arrayName = n.split(/[^a-zA-Zа-яёА-ЯЁ0-9]/);
    for (let j = 0; j < arrayName.length; j++) {
      if (arrayName[j]) {
        name += arrayName[j][0].toUpperCase() + arrayName[j].slice(1);
      }
    }
  }
  return name;
};

//ok
let nameElement = (locator, uniqness, value, content) => {
  if (uniqness === "text" || uniqness.includes("#text")) {
    return camelCase(value) || camelCase(content.innerText);
  }
  if (uniqness.includes("tag")) {
    return camelCase(content.tagName.toLowerCase());
  }
  if (uniqness.indexOf("[") === 0) {
    return camelCase(uniqness.replace(/[\.\/\*\[\]@]/g, ""));
  }
  if (uniqness === "class") {
    return camelCase(content.classList.value);
  }
  return camelCase(content[uniqness]);
};
//ok
export let applyFoundResult = (e, objCopy, parent, ruleId) => {
  let page = objCopy.PageObjects.find(page => page.pageId === objCopy.activeTabPageId);


  let element = {
    Name: e.Name || genRand(e.Type),
    Type: e.Type,
    parent: e.parent || null,
    parentId: e.parentId,
    elId: e.elId
  };

  if (objCopy.SimpleRules[e.Type]) {
    element.Locator = e.Locator;
    return findInParent(element, parent, objCopy);
  }
  if (objCopy.ComplexRules[e.Type]) {
    let fields = objCopy.ComplexRules[e.Type].find(r => r.id === ruleId);
    element.Root = e.Locator;
    for (let f in fields) {
      if (!element.hasOwnProperty(f) && f !== 'Root') {
        element[f] = fields[f];
      }
    }
    return findInParent(element, parent, objCopy);
  }

  //let fields = objCopy.ElementFields.get(e.Type);
  let fields = objCopy.ElementFields[e.Type];
  if (objCopy.CompositeRules[e.Type]) {
    element.Locator = e.Locator;
    element.isSection = true;
    element.children = [];
    let found = objCopy.sections.get(element.elId);

    if (!!found) {
      //element = found;
      page.elements.push(found.elId);
    } else {
      for (let f in fields) {
        if (!element.hasOwnProperty(f)) {
          element[f] = '';
        }
      }
      page.elements.push(element.elId);
      objCopy.sections.set(element.elId, element);
    }
    objCopy.warningLog += warningLog;
    return objCopy;
  }
};

//ok
let createCorrectXpath = (originalLocator, uniqness, value, locator) => {
  let result =
    uniqness === 'text'
      ? `contains(.,'${value /*.split(/\n/)[0]*/}')`
      : `@${uniqness}='${value}')`;
  if (locator) {
    return `${originalLocator}${locator}${result}`;
  }
  if (originalLocator.indexOf("]") === originalLocator.length - 1) {
    return `${originalLocator.slice(0, -1)} and ${result}]`;
  } else {
    return `${originalLocator}[${result}]`;
  }
};

//ok
let valueToCss = (uniqness, value) => {
  if (!!value) {
    switch (uniqness.value) {
      case "class":
        return `.${value.replace(/\s/g, ".")}`;
      case "id":
        return `#${value}`;
      default:
        return `[${uniqness.value}='${value}']`;
    }
  }
  return "";
};

//ok
let valueToXpath = (originalLocator, uniqness, value) => {
  if (!!value) {
    if (!!uniqness.locator) {
      return createCorrectXpath(
        originalLocator,
        uniqness,
        value,
        uniqness.locator
      );
    }
    if (isXpath(uniqness.value)) {
      return createCorrectXpath(originalLocator, uniqness, value);
    } else {
      return createCorrectXpath(originalLocator, uniqness.value, value);
    }
  }
  return originalLocator;
};
