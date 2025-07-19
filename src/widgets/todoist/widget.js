import credentialedProxyHandler from "utils/proxy/handlers/credentialed";


const widget = {
    api: "https://api.todoist.com/api/v1/{endpoint}",
    proxyHandler: credentialedProxyHandler,

    mappings: {
        tasks: {
            endpoint: "tasks"
        }
    }
}

export default widget;