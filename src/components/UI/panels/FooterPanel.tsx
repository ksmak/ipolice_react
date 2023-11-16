export default function FooterPanel() {
    const mystyle = {
        backgroundImage: `url("icons/ornament.png")`,
    }

    return (
        <footer
            className="bg-contain bg-repeat hidden absolute bottom-0 w-full h-16 md:flex md:flex-row md:flex-wrap md:justify-center md:gap-4"
            style={mystyle}
        >

        </footer>
    )
}