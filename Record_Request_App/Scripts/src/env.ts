export enum EnvType {
    LOCAL = "local",
    SHAREPOINT = "sharepoint",
    OTHER = "other",
}

// gloabal variable set at build time through build script
// passed in through webpack plugin
// tslint:disable-next-line:prefer-const
let NODE_ENV: string

// associates NODE_ENV string to Environment enum and checks for any uncrecognized NODE_ENV string
// defaults to local if no NODE_ENV string is supplied by build script
function getEnvironment(nodeEnv: string): EnvType {
    switch (nodeEnv) {
        case "local":
        return EnvType.LOCAL
        case "sharepoint":
        return EnvType.SHAREPOINT
        default:
        return EnvType.LOCAL
    }
}

export const ENVIRONMENT: EnvType = getEnvironment(NODE_ENV)
