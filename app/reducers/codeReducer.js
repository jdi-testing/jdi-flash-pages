import { saveAs } from 'file-saver';
import JSZip from '../libs/jszip/dist/jszip';
import { PageObjectJSON, SiteInfoJSON } from '../data/pageObject';
import { pageCode, siteCode, entityCode, sectionCode, seleniumPageCode, getPageName, getSiteName, getClassName, getEntityName } from './codeTemplates';

export let showCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    let page = objCopy.PageObjects.find(page => page.pageId === objCopy.activeTabPageId);
    let el = objCopy.selectedElement;
	let pack = objCopy.SiteInfo.pack;
	objCopy.code = sectionCode(pack, el, objCopy);
    return objCopy;
}

export let genCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.CodeDetails = true;
    objCopy.selectedElement = '';
    objCopy.code = genPageCode(getActivePage(objCopy), objCopy.SiteInfo.pack, objCopy);
    return objCopy;
}

export let downloadCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);

    let objToSave = {
        content: objCopy.code,
        name: !!objCopy.selectedElement
			? objCopy.selectedElement.Name + '.java'
			: getPageName(getActivePage(objCopy).name) + '.java'
    }
    if (objToSave.content && objToSave.name) {
        let blob = new Blob([objToSave.content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, objToSave.name);
    }
    return objCopy;
}

export let switchCodeMode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.JDI = !objCopy.JDI;
    objCopy.selectedElement = '';
    objCopy.activeTabPageId = -1;
    objCopy.selectedPage = {};
    objCopy.resultTree = [];
    objCopy.pageMap = new Map();
    objCopy.ElementsDetails = false;
    objCopy.PagesDetails = false;
    objCopy.CodeDetails = false;
    objCopy.RulesDetails = false;
    objCopy.SiteDetails = true;
    objCopy.warningLog = [];
    objCopy.sections = new Map();
    objCopy.PageObjects = [];
    objCopy.SiteInfo = Object.assign({}, SiteInfoJSON);
    objCopy.searchedPages = [];
    return objCopy;
}

export let zipAllCode = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let zip = new JSZip();	
	let pack = objCopy.SiteInfo.pack;
	let pages = objCopy.PageObjects;
	if (!objCopy.SiteInfo.siteTitle) return objCopy;
	let siteName = getSiteName(objCopy.SiteInfo.siteTitle);
	
	zip.file(siteName + '.java', 
		siteCode(pack, objCopy.SiteInfo.origin, siteName, objCopy)); 

	pages.forEach(page=> 
		zip.folder("pages").file(getPageName(page.name) + ".java", 
		genPageCode(page, pack, objCopy))
	);
	
	objCopy.sections.forEach(section => 
		zip.folder("sections").file(getClassName(section.Name) + ".java", 
		sectionCode(pack, section, objCopy))
	);
	
	objCopy.sections.forEach(section => {
		if (section.Type === "Form") {
			zip.folder("entities").file(getEntityName(section.Name) + ".java",  
				entityCode(pack, section, objCopy))
		}}
	);
	
	zip.generateAsync({ type: "blob" }).then(
		function (content) {
			saveAs(content, "pageobject.zip");
		}
	);
    return objCopy;
}

function genPageCode(page, pack, objCopy) {
    let pageName = getPageName(page.name);
    return objCopy.JDI ? pageCode(pack, page, objCopy) : seleniumPageCode(pack, page);
}

function getActivePage(objCopy) {
	return objCopy.PageObjects.find(page => {
            if (page.pageId === objCopy.activeTabPageId) {
                return page;
            }
        });
}

