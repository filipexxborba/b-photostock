import React from "react";
import ImageWrapper from "./components/ImageWrapper";
import { MagnifyingGlass } from "phosphor-react";
import { GlobalContext } from "./context/GlobalContext";

function App() {
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    setIsLoading,
    apiUrl,
    photos,
    setPhotos,
    handleEventKeyDown,
    previous
  } = React.useContext(GlobalContext);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.currentTarget.value);
  };

  React.useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setPhotos(jsonResponse.hits);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-white dark:bg-[#0F172A]">
      <header className="flex flex-row items-center justify-between sticky top-0 left-0 w-full bg-white z-10 p-4 dark:bg-[#1E293B]">
        <h1 className="font-semibold text-2xl dark:text-white">B.</h1>
        <div className="relative w-1/2">
          <input
            className="bg-indigo-50 rounded-lg px-4 py-2 outline-none block w-full indent-4"
            type="text"
            value={searchTerm}
            onChange={(e) => handleChangeSearchTerm(e)}
            onKeyDown={(e) => handleEventKeyDown(e)}
          />
          <MagnifyingGlass
            weight="bold"
            className="absolute top-1/2 left-2 -translate-y-1/2"
          />
        </div>
        <h2 className="font-bold w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-gray-50 cursor-pointer ring-2 ring-indigo-600 ring-offset-2">
          FB
        </h2>
      </header>
      {/* Fim header */}

      <main className="grid my-5 mx-5 md:mx-5 gap-8 auto-rows-auto grid-cols-pinterest-prefix md:grid-cols-pinterest-prefix-md justify-center bg-white dark:bg-[#0F172A]">
        {isLoading ? (
          <div className="flex col-span-5 items-center justify-center w-20 h-20 rounded-full mx-auto my-4 border-8 border-gray-200 border-t-indigo-600 animate-spin duration-150"></div>
        ) : (
          <>
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <ImageWrapper data={photo} key={index} />
              ))
            ) : (
              <div className="text-center col-span-5">
                <h2 className="text-base text-indigo-300  ">
                  Não foi encontrado nenhuma imagem com o termo <span>"{previous}"</span>.
                </h2>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
