import * as site from './siteReducer';
import * as page from './pageReducer';
import * as rules from './rulesReducer';
import * as code from './codeReducer';

export const mainReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_PAGE': {
            return page.showPage(state, action.pageId)
        }
        case 'CHANGE_TREE': {
            return page.changeTree(state, action.treeData, action.droppedItem)
        }
        case 'ADD_ELEMENT': {
            return page.addElement(state, action.element)
        }
        case 'DELETE_ELEMENT': {
            return page.deleteElement(state, action.elId)
        }
        case 'SELECT_ELEMENT': {
            return page.selectElement(state, action.elId)
        }
        case 'SEARCH_ELEMENT': {
            return page.searchEl(state, action.elName)
        }
        case 'EDIT_ELEMENT': {
            return page.editElement(state, action.elField, action.value)
        }
        case 'GENERATE_ELEMENTS': {
            return page.generateElements(state)
        }
        case 'ADD_PAGE': {
            return site.addPage(state, action.page);
        }
        case 'DELETE_PAGE': {
            return site.deletePage(state, action.pageId)
        }
        case 'SELECT_PAGE': {
            return site.selectPage(state, action.pageId)
        }
        case 'SEARCH_PAGE': {
            return site.searchPage(state, action.page)
        }
        case 'EDIT_VALUE': {
            return site.editValue(state, action.element, action.value, action.pageId)
        }
        case 'CLOSE_PAGE': {
            return site.closePage(state)
        }
        case 'BACK_TO_SITE': {
            return site.backToSite(state)
        }
        case 'OPEN_RULES':{
            return rules.openRules(state)
        }
        case 'SELECT_RULE':{
            return rules.selectRule(state, action.rule)
        }
        case 'ADD_RULE': {
            return rules.addRule(state, action.ruleType)
        }
        case 'SHOW_RULE': {
            return rules.showRule(state, action.ruleId)
        }
        case 'EDIT_RULE': {
            return rules.editRule(state, action.field, action.value)
        }
        case 'DELETE_RULE': {
            return rules.deleteRule(state, action.ruleId)
        }
        case 'EXPORT_RULES': {
            return rules.exportRules(state)
        }
        case 'IMPORT_RULES': {
            return rules.importRules(state, action.file)
        }
        case 'REMOVE_RULES_GROUP': {
            return rules.removeRulesGroup(state, action.rule)
        }
        case 'REFRESH': {
            return rules.refresh(state)
        }
        case 'SHOW_CODE': {
            return code.showCode(state)          
        }
        case 'GEN_CODE': {
            return code.genCode(state)
        }
        case 'DOWNLOAD_CODE': {
            return code.downloadCode(state)
        }
        case 'ZIP_CODE': {
            return code.zipAllCode(state)
        }
        case 'SWITCH_CODE': {
            return code.switchCodeMode(state)
        }
        default: {
            return state
        }
    }
} 