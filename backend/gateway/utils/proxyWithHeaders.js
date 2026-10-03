import proxy from "express-http-proxy"


export const proxyWithHeaders = (serviceUrl) => {
    return proxy(serviceUrl, {
      proxyReqBodyDecorator:(proxyReqOpts,req) => { // this is using to send {header} to project

        // if jb user hoga to ye req.user._id  se header access ker pyenge
        if(req.user){
          proxyReqOpts.headers["x-user-id"] = req.user?._id
        }
        return proxyReqOpts
      }
    })
}