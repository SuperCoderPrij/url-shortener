export const generateCode = () => {
    let shortcode = ""
    const mainString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    for (let i = 0; i < 6; i++) {
        shortcode += mainString.charAt(Math.floor(Math.random() * 62))
    }
    return shortcode
}