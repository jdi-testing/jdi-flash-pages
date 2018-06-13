export function showCode(){
    return {
        type: 'SHOW_CODE'
    }
}

export function genCode(){
    return {
        type: 'GEN_CODE'
    }
}

export function downloadCode(){
    return {
        type: 'DOWNLOAD_CODE'
    }
}

export function zipAllCode(){
    return {
        type: 'ZIP_CODE'
    }
}

export function switchCodeMode() {
    return {
        type: 'SWITCH_CODE'
    }
}