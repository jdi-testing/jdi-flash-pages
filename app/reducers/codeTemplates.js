import { commonFields } from '../data/settings';

function varName(name) {
	return name[0].toLowerCase() + name.slice(1);
}
export function getClassName(name) { 
	let words = name.split(/\W/);
	return words.map(word => word[0].toUpperCase() + word.slice(1)).join('');
}
function poName(name, poName) {
	let result = getClassName(name);
	if (result.length > 4 && result.substr(-4).toLowerCase() !== poName.toLowerCase())
		result += poName;
	return result;
}
export function getSiteName(name) {
	return poName(name, "Site");
}
export function getPageName(name) {
	return poName(name, "Page");
}
function locatorType(locator) {
	return locator.indexOf('/') !== 1 ? "Css" : "XPath";
}
function simpleCode(locatorType, locator, elType, name) {
	return elementCode(locatorType, `"${locator}"`, elType, name)
}
function elementCode(locatorType, locator, elType, name) {
	return `	@${locatorType}(${locator}) public ${elType} ${varName(name)};
`;
}
function pageElementCode(page, pageName) {
	return `	@JPage(url = "${page.url}", title = "${page.title}") 
	public static ${getPageName(pageName)} ${varName(pageName)};
`;
};
function complexLocators(el, fields) {
	let locators = [];
	for (let field in fields) {
		let locator = el[field];
		if (locator !== "") {
			locators.push(`${field.toLowerCase()} = @FindBy(${locatorType(locator).toLowerCase()} ="${locator}")`);
		}
	}
	return locators.join(",\n\t\t\t") + "\n\t";
}

function getFields(obj) {
	let clone = Object.assign({}, obj);
	for (let field in commonFields) {
		delete clone[field];
	}
	return clone;
}

function isSimple(el, fields) {
	let count = 0;;
	for (let field in fields) {
		if (el[field] !== "") count ++;
	}
	return count === 1;
}

function genEntities(parentId, arrOfElements, objCopy) {
	return arrOfElements
		.filter(el => el.parentId === parentId && (objCopy.SimpleRules[el.Type] || objCopy.ComplexRules[el.Type]) && el.Type != "Button")
		.map(el => `public String ${varName(el.Name)};`).join('\n\t');
}
function getElement(el, objCopy) {
	return typeof el === 'string' ? objCopy.sections.get(el) : el;
}

function genCodeOfElements(parentId, arrOfElements, objCopy) {
    let result = '';
    for (let i = 0; i < arrOfElements.length; i++) {
		let el = getElement(arrOfElements[i], objCopy);
        if (el.parentId === parentId && (!!el.Locator || !!el.Root)) {
            if (!!objCopy.CompositeRules[el.Type]) {
                result += simpleCode(locatorType(el.Locator), el.Locator, getClassName(el.Name), el.Name);				
            }
            if (!!objCopy.ComplexRules[el.Type]) {				
				let fields = getFields(objCopy.ElementFields[el.Type]);
				result += isSimple(el, fields)
					 ? simpleCode(locatorType(el.Root), el.Root, el.Type, el.Name)
					 : elementCode("J" + el.Type, complexLocators(el, fields), el.Type, el.Name);
            }
            if (!!objCopy.SimpleRules[el.Type]) {
                result += simpleCode(locatorType(el.Locator), el.Locator, el.Type, el.Name);
            }
        }
    }
    return result;
}
function getPageCode(objCopy) {
	return objCopy.PageObjects.map(page=>pageElementCode(page, getPageName(page.name))).join('');
}

function commonImport() {
    return `import com.epam.jdi.uitests.web.selenium.elements.common.*;
import com.epam.jdi.uitests.web.selenium.elements.complex.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.WebPage;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.objects.*;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.simple.*;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;`;
}

function sectionTemplate(pack, name, code) {
	return `package ${pack}.sections;

${commonImport()}

public class ${getClassName(name)} extends Section {
${code}
}`;
}

function formTemplate(pack, name, code, entityName) {
	return `package ${pack}.sections;

${commonImport()}
import ${pack}.entities.*;

public class ${getClassName(name)} extends Form<${entityName}> {
${code}
}`;
}
export function getEntityName(name) {
	return getClassName(name.slice(0,-4) + "s");
}

export function sectionCode(pack, el, objCopy) {
	let code = genCodeOfElements(el.elId, el.children, objCopy);
	switch (el.Type) {
		case "Section": return sectionTemplate(pack, el.Name, code);
		case "Form": return formTemplate(pack, el.Name, code, getEntityName(el.Name));
	};
}

export function entityCode(pack, section, objCopy) {
	let entityName = getEntityName(section.Name);
	return `package ${pack}.entities;

import com.epam.jdi.tools.DataClass;

public class ${entityName} extends DataClass<${entityName}> {
	${genEntities(section.elId, section.children, objCopy)}
}`;
}

export function siteCode(pack, domain, name, objCopy) {
    let siteName = getSiteName(name);
	return `package ${pack};
import ${pack}.pages.*;
import com.epam.jdi.uitests.web.selenium.elements.composite.WebSite;
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.*;

@JSite("${domain}")
public class ${name} extends WebSite {
${getPageCode(objCopy)}
}`;
}

export function pageCode(pack, page, objCopy) {
    let pageName = getPageName(page.name);
	return `package ${pack}.pages;

${commonImport()}
import ${pack}.sections.*;

public class ${pageName} extends WebPage {
${genCodeOfElements(null, page.elements, objCopy)}
}`;
}

export function seleniumPageCode(pack, page) {
    let pageName = getPageName(page.name);
	return `package ${pack}.pages;
	
import com.epam.jdi.uitests.web.selenium.elements.pageobjects.annotations.FindBy;
import org.openqa.selenium.WebElement;

public class ${pageName} {
${genCodeOfWEBElements(page.elements)}
}`;
}
function findByCode(el) {
	let locator = el.Locator;
	let name = el.Name;
	return elementCode("FindBy", `${locatorType(locator).toLowerCase()} ="${locator}"`, "WebElement", name);
}
function genCodeOfWEBElements(arrOfElements) {
    return arrOfElements.map(el => `${findByCode(el)}`).join("");
}


