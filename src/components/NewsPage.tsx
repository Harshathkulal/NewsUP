import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import Loader from "./Loader";

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
  const [loading, setLoading] = useState(true);
  const [cache, setCache] = useState<{ [key: string]: Props[] }>({});

  useEffect(() => {
    if (cache[query]) {
      setNewsData(cache[query]);
      setLoading(false);
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
            [query]: filteredData,
          }));
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching news:", error));
    }
  }, [query, cache]);

  return (
    <div className="mt-20 m-2 grid gap-2 lg:grid-cols-3">
      {loading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <Loader key={index} />
          ))}
        </>
      ) : (
        newsData.map((newsItem) => (
          <NewsCard
            key={newsItem.url}
            title={newsItem.title}
            description={newsItem.description}
            urlToImage={newsItem.urlToImage}
            url={newsItem.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsPage;
