interface ShowNavBar {
    isLoggedIn: boolean
}

export default function useAuth({isLoggedIn}: ShowNavBar){
    return isLoggedIn

}