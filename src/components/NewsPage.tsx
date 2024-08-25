import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface Props {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  url: string;
}

const url = import.meta.env.VITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const NewsPage = ({ query }: { query: string }) => {
  const [newsData, setNewsData] = useState<Props[]>([]);
  const [cache, setCache] = useState<{ [key: string]: Props[] }>({}); // Cache to store fetched data

  useEffect(() => {
    if (cache[query]) {
      setNewsData(cache[query]);
    } else {
      fetch(`${url}${query}&apiKey=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.articles.filter(
            (article: Props) => article.urlToImage
          );
          setNewsData(filteredData);
          setCache((prevCache) => ({
            ...prevCache,
            [query]: filteredData, // Cache the fetched data
          }));
        })
        .catch((error) => console.error("Error fetching news:", error));
    }
  }, [query, cache]);

  console.log(cache)
  console.log(newsData)
  return (
    <div className="mt-20 m-2 grid gap-2 lg:grid-cols-3">
      {newsData.map((newsItem) => (
        <NewsCard
          key={newsItem.url}
          title={newsItem.title}
          description={newsItem.description}
          urlToImage={newsItem.urlToImage}
          url={newsItem.url}
        />
      ))}
    </div>
  );
};

export default NewsPage;

