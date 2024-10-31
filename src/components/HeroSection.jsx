    'use client'
    import { Card, CardContent } from "../components/ui/card"
    import Autoplay from 'embla-carousel-autoplay';
    import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    } from "../components/ui/carousel"
    const HeroSection = () => {
    return (
        <div className="flex flex-col md:flex-col lg:flex-row ">
    <div className="w-full md:w-[800px]">
        <h1 className="text-[50px] md:text-[90px]  mt-3 tracking-wide pl-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-center">Dive into the world of Technology</h1>
    </div>
    <div className="w-full">
        <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full max-w-lg md:max-w-5xl md:mt-3 md:ml-25 lg:ml-32"
            style={{ outline: 'none' }}>
            <CarouselContent>
                {Array.from({ length: 4 }).map((_, index) => (
                    <CarouselItem key={index} style={{ outline: 'none' }}>
                        <div className="p-3">
                            <Card className="shadow-none border-none">
                                <CardContent className="flex items-center justify-center">
                                <img src={`${index+3}.jpg`} alt="image" className="h-[300px] md:h-[450px] w-full object-cover p-3 m-0"></img>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            
        </Carousel>
    </div>
</div>


    )
    }

    export default HeroSection
