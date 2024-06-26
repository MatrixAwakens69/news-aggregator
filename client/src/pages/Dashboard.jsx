import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const apikey = import.meta.env.VITE_NEWS_API_KEY;
    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}`)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Trending news</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-90"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <h3 className="text-lg font-semibold text-gray-900 p-4">
              {article.title}
            </h3>
            <p className="text-gray-700 p-4">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
