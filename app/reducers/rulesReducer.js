import { saveAs } from 'file-saver';
import JSZip from '../libs/jszip/dist/jszip';
import { addToLog, getLog } from './POgen/functions';
import { commonFields } from '../data/settings';

export let openRules = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.activeTabPageId = -1;
    objCopy.selectedElement = '';
    objCopy.selectedRule = '';
    objCopy.SiteDetails = false;
    objCopy.selectedPage = {};
    objCopy.ElementsDetails = false;
    objCopy.PagesDetails = false;
    objCopy.RulesDetails = true;
    objCopy.CodeDetails = false;
    objCopy.ruleId = -1;
    return objCopy;
}

export let selectRule = (mainObj, rule) => {
    location.href = "#add-tab-page"
    let objCopy = Object.assign({}, mainObj);
    objCopy.selectedRule = rule;
    //change here
    let Rules = [];
    if (!!objCopy.SimpleRules[rule]) {
        Rules = objCopy.SimpleRules[rule];
    } else if (!!objCopy.ComplexRules[rule]) {
        Rules = objCopy.ComplexRules[rule];
    } else {
        Rules = objCopy.CompositeRules[rule];
    }
    objCopy.ruleId = !!Rules[0] ? Rules[0].id : -1;

    return objCopy;
}

export let removeRulesGroup = (mainObj, rule) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.selectedRule = '';
    objCopy.ruleId = -1;

    delete objCopy.ElementFields[rule];

    if (!!objCopy.SimpleRules[rule]) {
        let copy = { ...objCopy.SimpleRules }
        delete copy[rule];
        objCopy.SimpleRules = copy;
    } else if (!!objCopy.ComplexRules[rule]) {
        let copy = { ...objCopy.ComplexRules }
        delete copy[rule];
        objCopy.ComplexRules = copy;
    } else {
        let copy = { ...objCopy.CompositeRules }
        delete copy[rule];
        objCopy.CompositeRules = copy;
    }

    return objCopy;
}

function addR(Rule, ruleType) {
    let res = {};
    let copy = { ...Rule }
    let rule = copy[ruleType];
    let lastItemNum = rule.length - 1;
    let id = rule[lastItemNum].id + 1;
    let ruleFields = Object.assign({}, rule[0]);
    for (let f in ruleFields) {
        res[f] = "";
    }
    res.id = id;
    rule.push(res);
    return copy;
}
export let addRule = (mainObj, ruleType) => {
    let objCopy = Object.assign({}, mainObj);
    //let allFields = objCopy.ElementFields[ruleType];

    if (!!objCopy.SimpleRules[ruleType]) {
        objCopy.SimpleRules = addR(objCopy.SimpleRules, ruleType);
    }
    if (!!objCopy.ComplexRules[ruleType]) {
        objCopy.ComplexRules = addR(objCopy.ComplexRules, ruleType);
    }
    if (!!objCopy.CompositeRules[ruleType]) {
        objCopy.CompositeRules = addR(objCopy.CompositeRules, ruleType);
    }

    return objCopy;
}

export let showRule = (mainObj, ruleId) => {
    let objCopy = Object.assign({}, mainObj);
    objCopy.ruleId = ruleId;

    return objCopy;
}

function editR(Rule, ruleType, field, value, id){
    let copy = { ...Rule }
    let rule = copy[ruleType];
    let result = rule.map(r => {
        if (r.id === id){
            r[field] = value;
        }
        return r;
    })
    copy[ruleType] = result;
    return copy;
}

export let editRule = (mainObj, field, value) => {
    let objCopy = Object.assign({}, mainObj);
    let selectedRule = objCopy.selectedRule;
    let id = objCopy.ruleId;

    if (!!objCopy.SimpleRules[selectedRule]) {
        objCopy.SimpleRules = editR(objCopy.SimpleRules, selectedRule, field, value, id);
    }
    if (!!objCopy.ComplexRules[selectedRule]) {
        objCopy.ComplexRules = editR(objCopy.ComplexRules, selectedRule, field, value, id);
    }
    if (!!objCopy.CompositeRules[selectedRule]) {
        objCopy.CompositeRules = editR(objCopy.CompositeRules, selectedRule, field, value, id);
    }

    return objCopy;
}

function deleteR(Rule, ruleType, id, ruleId){
    let copy = { ...Rule };
    let rule = copy[ruleType];
    let newRuleArr = [];
    let newRid = ruleId;
    if (rule.length === 1) {
        newRuleArr.push({});
        for (let f in rule[0]) {
            newRuleArr[0][f] = '';
        }
        newRuleArr[0].id = 0;
    } else {
        newRuleArr = rule.filter(rule => rule.id !== id);
    }
    if (id === ruleId) {
        newRid = newRuleArr[0].id;
    }
    copy[ruleType] = newRuleArr;
    return {
        copy,
        newRid
    }
}

export let deleteRule = (mainObj, id) => {
    let objCopy = Object.assign({}, mainObj);
    let selectedRule = objCopy.selectedRule;
    let ruleId = objCopy.ruleId;
   
    if (!!objCopy.SimpleRules[selectedRule]) {
        let res = deleteR(objCopy.SimpleRules, selectedRule, id, ruleId);
        objCopy.SimpleRules = res.copy;
        objCopy.ruleId = res.newRid;
    }
    if (!!objCopy.ComplexRules[selectedRule]) {
        let res = deleteR(objCopy.ComplexRules, selectedRule, id, ruleId);
        objCopy.ComplexRules = res.copy;
        objCopy.ruleId = res.newRid;
    }
    if (!!objCopy.CompositeRules[selectedRule]) {
        let res = deleteR(objCopy.CompositeRules, selectedRule, id, ruleId);
        objCopy.CompositeRules = res.copy;
        objCopy.ruleId = res.newRid;
    }

    return objCopy;
}

export let exportRules = (mainObj) => {
    let objCopy = Object.assign({}, mainObj);
    let zip = new JSZip();

    zip.file('Rules.json', JSON.stringify({ SimpleRules: objCopy.SimpleRules, ComplexRules: objCopy.ComplexRules, CompositeRules: objCopy.CompositeRules }));
    //zip.file('ElementsFields.json', JSON.stringify(objCopy.ElementFields));
    zip.generateAsync({ type: "blob" }).then(
        function (content) {
            saveAs(content, "JDIrules.zip");
        })

    //console.log('objCopy.Rules', JSON.stringify(objCopy.Rules))

    return objCopy;
}

function getElementsForRule(newObj) {
    let newElementsFields = {};
    let fields = Object.keys(newObj);
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        let otherFields = Object.keys(newObj[field][0]);
        newElementsFields[field] = { ...commonFields };
        for (let j = 0; j < otherFields.length; j++) {
            if (!['id', 'children'].includes(otherFields[j])) {
                newElementsFields[field][otherFields[j]] = "TextField";
            } else {
                newElementsFields[field][otherFields[j]] = "internal";
            }
        }
    }
    return newElementsFields;
}

function setId(OBJ) {
    let obj = { ...OBJ }
    let rule = Object.keys(obj);
    for (let i = 0; i < rule.length; i++) {
        for (let j = 0; j < obj[rule[i]].length; j++) {
            obj[rule[i]][j].id = j;
        }
    }
    return obj;
}

export let importRules = (mainObj, files) => {
    let objCopy = { ...mainObj }
    let newSimple = {};
    let newComplex = {};
    let newComposite = {};
    let newElementsFields = {}
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        try {
            let file = files[0];
            if (!file) {
                return;
            }
            let reader = new FileReader();
            reader.onload = (e) => {
                let contents = e.target.result;
                try {
                    let rules = JSON.parse(contents);
                    newSimple = setId(rules.SimpleRules);
                    newComplex = setId(rules.ComplexRules);
                    newComposite = setId(rules.CompositeRules);
                    newElementsFields = { ...getElementsForRule(newSimple), ...getElementsForRule(newComplex), ...getElementsForRule(newComposite) };

                    objCopy.SimpleRules = newSimple;
                    objCopy.ComplexRules = newComplex;
                    objCopy.CompositeRules = newComposite;
                    objCopy.ElementFields = newElementsFields;

                    document.querySelector('#refresh').click();
                } catch (e) {
                    addToLog(`Error occurs reading local json file: ${e}`);
                    let log = [...objCopy.warningLog, ...getLog()];
                    objCopy.warningLog = log;
                    document.querySelector('#refresh').click();
                }
            };
            reader.readAsText(file)
        } catch (e) {
            addToLog(`Error occurs with FileReader: ${e}.`);
            let log = [...objCopy.warningLog, ...getLog()];
            objCopy.warningLog = log;
            document.querySelector('#refresh').click();
        }
    } else {
        addToLog(`Warning! The File APIs are not fully supported in this browser.`);
        let log = [...objCopy.warningLog, ...getLog()];
        objCopy.warningLog = log;
        document.querySelector('#refresh').click();
    }
    objCopy.selectedRule = '';
    objCopy.ruleId = -1;
    console.log('log', log)
    return objCopy;
}

export let refresh = (mainObj) => {
    let objCopy = { ...mainObj };
    objCopy.warningLog = [...objCopy.warningLog, ...getLog()];
    return objCopy;
}