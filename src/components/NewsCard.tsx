import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const NewsCard: React.FC<Props> = ({ title, description, urlToImage, url }) => {
  return (
    <div className="m-2">
      <a href={url}>
        <img src={urlToImage} alt={title} className="w-full h-48" />
        <h1 className="font-bold text-xl mt-2">{title}</h1>
        <p className="text-sm text-gray-400 mt-6">{description}</p>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          Read more <FaArrowRight className="mt-1" />
        </div>
      </a>
    </div>
  );
};

export default NewsCard;
