import { CornerDownRight } from "lucide-react"

const Home = () => {
    return (
        <div className="flex flex-col gap-4 lg:gap-0 lg:justify-between items-center lg:items-start h-[45vh] flex-[0.5] relative">
            <div className=" flex items-center lg:items-start gap-4 flex-col">
                <h1 className=" text-2xl lg:text-6xl font-bold ">SpurShop</h1>

                <p className=" text-sm lg:text-xl w-[60%] lg:w-[80%] text-center lg:text-left">
                    A demo e-commerce store with AI-powered customer support
                </p>
            </div>
            <p className=" text-sm lg:text-xl w-[60%] lg:w-[80%] text-center lg:text-left">Ask questions about orders, shipping, returns or any other query to our AI agent</p>
            <CornerDownRight className=" size-20 hidden lg:block lg:absolute top-full left-[76%] stroke-1" />
        </div>
    )
}

export default Home