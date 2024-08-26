import { useEffect, useState, useRef } from "react";
import NewsCard from "./NewsCard";
import Loader from "./Loader";

interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  content: string;
  url: string;
}

interface ApiResponse {
  articles: NewsArticle[];
}

const url = import.meta.env.VITE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const NewsPage = ({ query }: { query: string }) => {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const cacheRef = useRef<{ [key: string]: NewsArticle[] }>({});

  useEffect(() => {
    const fetchNews = async () => {
      if (cacheRef.current[query]) {
        setNewsData(cacheRef.current[query]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        const filteredData = data.articles.filter(
          (article) => article.urlToImage
        );
        setNewsData(filteredData);
        cacheRef.current = {
          ...cacheRef.current,
          [query]: filteredData,
        };
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query]);

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
