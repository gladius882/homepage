const { default: genericProxyHandler } = require("utils/proxy/handlers/generic");

const widget = {
    api: "https://api.myip.com",
    proxyHandler: genericProxyHandler,

    mappings: {
        ip: {
            endpoint: "/"
        }
    }
}

export default widget;