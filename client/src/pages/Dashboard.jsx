import React, { useState, useEffect, useRef, useCallback } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const analyzeSentiment = (text) => {
    return fetch("/api/spacy/analyze-sentiment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => data.sentiment)
      .catch((error) => console.error("Error analyzing sentiment:", error));
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is at the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        setLoading
      )
        return;
      // Increment page or fetch data here
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      const apikey = import.meta.env.VITE_NEWS_API_KEY;
      fetch(
        `https://newsapi.org/v2/top-headlines?country=in&page=${page}&apiKey=${apikey}`
      )
        .then((response) => response.json())
        .then(async (data) => {
          const validArticles = data.articles.filter(
            (article) =>
              article.title !== "[Removed]" &&
              article.description !== "[Removed]"
          );
          for (let article of validArticles) {
            const sentiment = await analyzeSentiment(article.description || "");
            article.sentiment = sentiment;
          }
          const shuffledArticles = shuffleArray([...validArticles]);
          setArticles((prev) => [...prev, ...shuffledArticles]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching news:", error);
          setLoading(false);
        });
    }
  }, [page, loading]);

  return (
    <div className="p-5 bg-gray-600">
      <h2 className="text-center text-4xl font-bold text-white mb-16 mt-10">
        Trending News
      </h2>
      <div className="grid grid-cols-1 max-w-7xl mx-auto md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              article.sentiment === "positive"
                ? "bg-green-500"
                : article.sentiment === "neutral"
                ? "bg-yellow-500"
                : article.sentiment === "negative"
                ? "bg-red-500"
                : "bg-gray-500"
            } block bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:scale-105 hover:opacity-85`}
          >
            <h3 className="font-semibold text-lg text-gray-900">
              {article.title}
            </h3>
            <p className="text-gray-700">{article.description}</p>
          </a>
        ))}
        {loading && (
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-gray-100">Loading news...</p>
          </div>
        )}
      </div>
      <div ref={loader} className="h-5 mt-5"></div>
    </div>
  );
};

export default Dashboard;
