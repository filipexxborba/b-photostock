import React from "react";
import { ThumbsUp } from "phosphor-react";
import { GlobalContext } from "../context/GlobalContext";

const ImageWrapper = ({ data }) => {
  const { updateSearchTerm } = React.useContext(GlobalContext);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const inicial = Array.from(data.user);
  const tags = data.tags.split(", ");

  const handleClickImage = (e, target) => {
    e.preventDefault();
    window.open(target, "_blank").focus();
  };

  const handleClickUser = (e, target) => {
    e.preventDefault();
    window.open(target, "_blank").focus();
  };

  const randomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const handleClickTag = (tag) => {
    updateSearchTerm(tag);
  };

  return (
    <div className="relative group flex flex-col items-start gap-2">
      <img
        className="rounded-3xl group-hover:brightness-50 ease-in-out duration-100"
        src={isLoaded ? data.webformatURL : data.previewURL}
        alt="."
        onLoad={() => setIsLoaded(true)}
        style={
          !isLoaded
            ? { width: "100%", backgroundColor: "#fbfbfb" }
            : { display: "block" }
        }
      />
      <button
        onClick={(e) => handleClickImage(e, data.pageURL)}
        className="absolute right-2 top-2 bg-indigo-600 rounded-3xl py-2 px-5 text-gray-50 invisible group-hover:visible"
      >
        Abrir
      </button>
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <div className="py-2 px-4 rounded-lg flex items-center gap-2 hover:cursor-pointer hover:bg-indigo-50 hover:text-indigo-900 ">
            <h2 className="w-7 h-7 rounded-full flex items-center justify-center text-gray-50 bg-indigo-700">
              {inicial[0].toUpperCase()}
            </h2>
            <h3 className="dark:text-indigo-100 dark:hover:text-indigo-900" onClick={(e) => handleClickUser(e, `https://pixabay.com/users/${data.user}`)}>
              {data.user}
            </h3>
          </div>
          <div className="p-2 flex flex-row items-center gap-2 hover:cursor-pointer">
            <ThumbsUp color="rgb(79 70 229)" weight="bold" />
            <p className="dark:text-indigo-200">{data.likes}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 px-2">
          {tags.map((tag, index) => (
            <button
              className="font-light text-xs text-indigo-200 hover:text-indigo-400 cursor-pointer"
              key={index}
              onClick={() => handleClickTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageWrapper;
