"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
//import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
// Optional for navigation/pagination

export default function AdvertismentSliding() {
  //   const res = await fetch(`${apiUrl}/blogs/displayhome`, {
  //     next: {
  //       revalidate: 5,
  //     },
  //   });
  //   const data = await res.json();

  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/advertisment/displayhome`, {
          credentials: "include",
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-8 cursor-pointer ">
      <div className="w-full my-4">
        <h1 className="w-fit text-3xl underline text-primaryColor font-semibold mx-auto">
          Advertisment
        </h1>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 6000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          align: "start",
          duration: 100,
          loop: true,
          slidesToScroll: 1,
          // itemPerPage: 4, // Show 4 items per page (Shad CN Carousel option)
          //className: "w-full",
        }}
        className="w-full "
      >
        <CarouselContent>
          {data?.map((ad: any) => {
            return (
              <CarouselItem
                key={ad.id}
                //className="basis-1/2 smd:basis-1/3  lg:basis-1/4"
                className="basis-1/1 w-fit"
                // className="-mt-1 h-[200px]"
              >
                <Link href={`/advertisment_details/${ad?.id}`}>
                  <div className="flex flex-col  bg-primaryColor rounded-md md:px-4 py-6 shadow-md">
                    <div className="md:flex items-center mx-auto ">
                      <img
                        // src={`${apiUrl}/upload_assets/images/advertisement_images/${data[0]?.image}`}
                        src={ad?.imgUrl}
                        alt="Ad Image"
                        className="h-1/3  w-1/3 mx-auto  ssmd:h-1/4 ssmd:w-1/6 object-cover rounded-md"
                      />
                      <div className="  px-7 flex ">
                        <div className=" md:w-3/4 w-full mx-4">
                          <div className="mx-1 sm:ml-4 flex flex-col justify-between sm:mx-auto  ">
                            <h1 className="text-2xl   text-center text-white font-bold">
                              {ad?.title}
                            </h1>
                            <div className="mx-2 ssmd:text-lg text-center  text-white font-light">
                              {ad?.subtitle}
                              <br />
                              {ad?.text}
                            </div>
                            {/* <a
                  target="_blank"
                  href={`${data[0]?.info}`}
                  className="bg-white text-primaryColor text-center text-sm ssmd:font-semibold sm:px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
                >
                  {data[0]?.info}
                </a> */}
                            <h1 className="bg-white w-3/4 mx-auto my-3 text-primaryColor text-center text-sm ssmd:font-semibold sm:px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
                              {ad?.info}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
