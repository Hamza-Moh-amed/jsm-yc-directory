import Navbar from "@/components/Navbar";

export default function LayoutPage({ children }: LayoutProps<"/">) {
    return (
        <main>
        <Navbar /> 
        </main>
    )
}
