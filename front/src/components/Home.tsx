import Body from "./Body";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex p-5 flex-row justify-around">
      <div className="py-10  w-5/12">
        <div
          className="container  grid  gap-4 text-center md:px-6 lg:gap-10 bg-opacity-70 h-[80vh]   bg-cover bg-center bg-no-repeat rounded-xl from-gray-200 to-gray-100 "
          style={{
            maskImage: "linear-gradient(black 80%, transparent)",
          }}
        >
          <div className="space-y-3 bg-gradient-to-b p-5 rounded text-sky-500">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Muscletonic Routines
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Stay fit with these exercises you can do from the comfort of your
              home.
            </p>
          </div>
        </div>
      </div>
      <div className="container  gap-4 px-4 py-8 md:gap-6 md:px-6 lg:py-12 w-7/12 justify-center">
        <div className="space-y-4 lg:col-span-2 lg:space-y-8">
          <div className="space-y-2 w-full flex flex-col items-center">
            <Body setIdPart={null} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
