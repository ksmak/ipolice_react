export default function FooterPanel() {
    const mystyle = {
        backgroundImage: `url("icons/ornament.png")`,
    }

    return (
        <footer
            className="h-12 opacity-70 saturate-100 bg-contain bg-repeat hidden w-full md:flex md:flex-row md:flex-wrap md:justify-center md:gap-4"
            style={mystyle}
        >

        </footer>
    )
}