
//fetch wrapper function ----------------------------------
export async function sendRequest(url, cfg) {

    cfg = cfg || {}; //if no cfg, create one
    cfg.signal = AbortSignal.timeout(5000); //5 seconds before timeout

    try {
        
        const response = await fetch(url, cfg);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg);
        }
        
        return Promise.resolve(data); //forward the resolved promise

    } catch (error) {
        
        return Promise.reject(error); //forward the rejected promise
    }

}

// --------------------------------------------------------
export function createBasicAuthString(username, password) {
    let combinedStr = username + ":" + password;
    let b64Str = btoa(combinedStr);
    return "basic " + b64Str; //return the basic auth. string
}


//-----------------------------------------------------------
// more utility-functions here if needed...