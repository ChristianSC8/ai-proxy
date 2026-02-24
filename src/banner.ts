import { env } from "./config/env.ts"
import { MODELS } from "./config/models.ts"

const RESET = "\x1b[0m"
const CYAN = "\x1b[36m"
const GRAY = "\x1b[90m"
const WHITE = "\x1b[97m"

const ascii = `

${CYAN} █████╗ ██╗    ██████╗ ██████╗  ██████╗ ██╗  ██╗██╗   ██╗
██╔══██╗██║    ██╔══██╗██╔══██╗██╔═══██╗╚██╗██╔╝╚██╗ ██╔╝
███████║██║    ██████╔╝██████╔╝██║   ██║ ╚███╔╝  ╚████╔╝ 
██╔══██║██║    ██╔═══╝ ██╔══██╗██║   ██║ ██╔██╗   ╚██╔╝  
██║  ██║██║    ██║     ██║  ██║╚██████╔╝██╔╝ ██╗   ██║   
╚═╝  ╚═╝╚═╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝${RESET}`

export function printBanner(): void {
    const modelCount = MODELS.length
    const providerCount = new Set(MODELS.map(m => m.providerId)).size

    console.log(ascii)
    console.log(`  ${GRAY}--------------------------------------------------${RESET}`)
    console.log(`  ${WHITE}Port:${RESET}       ${CYAN}${env.PORT}${RESET}`)
    console.log(`  ${WHITE}Models:${RESET}     ${CYAN}${modelCount} loaded${RESET}`)
    console.log(`  ${WHITE}Providers:${RESET}  ${CYAN}${providerCount} active${RESET}`)
    console.log(`  ${WHITE}Log level:${RESET}  ${CYAN}${env.LOG_LEVEL}${RESET}`)
    console.log(`  ${GRAY}--------------------------------------------------${RESET}`)
    console.log(`  ${WHITE}server started${RESET}`)
    console.log()
}
