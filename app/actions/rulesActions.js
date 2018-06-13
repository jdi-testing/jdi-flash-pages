export function openRules(){
    return{
        type: "OPEN_RULES"
    }
}

export function selectRule(rule){
    return{
        type: "SELECT_RULE",
        rule
    }
}

export function addRule(ruleType){
    return{
        type: "ADD_RULE",
        ruleType
    }
}

export function showRule(ruleId){
    return{
        type: "SHOW_RULE",
        ruleId
    }
}

export function editRule(field, value){
    return{
        type: "EDIT_RULE",
        field,
        value
    }
}

export function deleteRule(ruleId){
    return{
        type: "DELETE_RULE",
        ruleId
    }
}

export function exportRules(){
    return{
        type: "EXPORT_RULES",
    }
}

export function importRules(file){
    return{
        type: "IMPORT_RULES",
        file
    }
}

export function removeRulesGroup(rule){
    return{
        type: "REMOVE_RULES_GROUP",
        rule
    }
}

export function refresh(){
    return{
        type: "REFRESH",
    }
}