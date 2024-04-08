import { Card, CardHeader, CardTitle } from "./ui/card";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Body from "./Body";
import { z } from "zod";
import { useToast } from "./ui/use-toast";

const idPartSchema = z.number().min(0, "Debe seleccionar una parte");

const RoutineForm = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >("/upload-image-icon.png");
  const [steps, setSteps] = useState<number[]>([1]);
  const [idPart, setIdPart] = useState<number>(-1);
  const { toast } = useToast();
  const [api, setApi] = useState<CarouselApi>();

  const addStep = () => {
    setSteps((prevSteps) => [...prevSteps, prevSteps.length + 1]);
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/gif": [".gif"],
    },
  });

  const handleNextClick = () => {
    const result = idPartSchema.safeParse(idPart);

    if (!result.success) {
      const error = result.error.message;
      const message = JSON.parse(error)[0].message;
      toast({
        variant: "destructive",
        title: message,
        description: "",
        duration: 3000,
      });
    } else {
      api?.scrollNext();
    }
  };

  return (
    <Carousel setApi={setApi} className="mt-6">
      <CarouselContent className="md:h-[90vh]">
        <CarouselItem className="flex flex-col items-center gap-4">
          <h4>Select Muscle routine</h4>
          <Body setIdPart={setIdPart} />
        </CarouselItem>
        <CarouselItem className="w-full overflow-visible">
          <Card className="mx-auto  pb-4 w-3/4">
            <CardHeader className="bg-blue-700 rounded-md text-white">
              <CardTitle className="text-2xl">
                <input
                  type="text"
                  placeholder="Ingresa tu titulo aqui..."
                  className="bg-blue-700 text-white placeholder:text-gray-50 border-none"
                />
              </CardTitle>
            </CardHeader>
            <section
              className="flex justify-around flex-col w-1/2 bg-gray-50 mx-auto my-2 rounded-md items-center pt-4 border-dotted border-4"
              {...getRootProps()}
            >
              <img
                src={selectedImage as string}
                className="rounded-md w-96"
                alt="Preview"
              />
              <p>Drag drop gif here, or click to select files</p>
            </section>
            <p className="px-10 pt-6">
              <textarea
                className="w-2/3 bg-slate-50 rounded-lg"
                placeholder="Escribe tu descripcion aqui..."
              ></textarea>
            </p>

            {steps.map((step, index) => (
              <div key={index} className="flex mt-7 gap-6 items-center px-4 ">
                <div className="w-14 h-14 rounded-full bg-blue-700 flex justify-center items-center text-white">
                  <p>{step}</p>
                </div>
                <p>
                  <input
                    placeholder={`Some step here...`}
                    className="w-80 bg-slate-50 rounded-lg h-10"
                  />
                </p>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (steps.length > 1) {
                      setSteps(
                        steps
                          .filter((_, indexStep) => indexStep !== index)
                          .map((_, index) => index + 1)
                      );
                    }
                  }}
                >
                  <MdDelete size={30} fill="red" />
                </div>
              </div>
            ))}
            <div
              onClick={addStep}
              className="cursor-pointer flex w-2/12 mx-auto rounded-md text-green-500 text-xl"
            >
              <IoIosAddCircleOutline className="w-2/6" size={40} />
              <button>Add Step</button>
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="top-48  left-10 w-20 h-20" />
      <CarouselNext
        className="top-48 right-10 w-20 h-20"
        onClick={handleNextClick}
      />
    </Carousel>
  );
};

export default RoutineForm;
