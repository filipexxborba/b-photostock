import React from "react";

export const GlobalContext = React.createContext();
export const GlobalStorage = ({ children }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [photos, setPhotos] = React.useState([]);
  const apiUrl =
    "https://pixabay.com/api/?key=27319481-db2e91aa6bfac95722db216a1";
  const [previous, setPrevious] = React.useState("");

  const updateSearchTerm = (tag) => {
    setIsLoading(true);
    fetch(`${apiUrl}&q=${encodeURI(tag)}`)
      .then((response) => response.json())
      .then((json) => {
        setPhotos(json.hits);
        setIsLoading(false);
        setSearchTerm(tag);
      })
      .catch((error) => console.log(error));
  };

  const handleEventKeyDown = (e, update) => {
    console.log(update);
    if (e.keyCode === 13) {
      setIsLoading(true);
      fetch(`${apiUrl}&q=${encodeURI(searchTerm)}`)
        .then((response) => response.json())
        .then((json) => {
          setPhotos(json.hits);
          setIsLoading(false);
          setPrevious(searchTerm);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        isLoading,
        setIsLoading,
        apiUrl,
        photos,
        setPhotos,
        updateSearchTerm,
        handleEventKeyDown,
        previous,
        setPrevious,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
