import React from "react";

const News = () => [
  {
    date: "Feb 4, 2025",
    title: "Northwestern-MML-Lab is seeking research collaborators/interns!",
    description:
      "More details here. If you’d like to work with me, plz drop an email. You may feel free to lead/join projects; we prefer strong coding, rapid learning skills, interdisciplinary expertise (STEM/other). We have interns with many (~10) pubs, but it's not required!",
    link: "#",
    highlight: true,
  },
  {
    date: "Jan 27, 2025",
    title:
      "Introducing RAGEN -- the world’s first reproduction of DeepSeek-R1(Zero) methods for training agentic AI models!",
    link: "#",
  },
  {
    date: "Sep 20, 2024",
    title:
      "Glad to announce that ESFT has been accepted to the EMNLP 2024 Main Conference! 🎉",
  },
  {
    date: "Jul 4, 2024",
    title:
      "Thrilled to introduce our latest project at DeepSeek, Expert-Specialized Fine-Tuning (ESFT) for efficient and effective LLM customization by leveraging the highly specialized Mixture-of-Experts (MoE) architecture!",
  },
  {
    date: "Jun 2, 2024",
    title:
      "Grateful to be spotlighted by my alma mater RUC for my journey and achievements.",
    link: "#",
  },
  {
    date: "Feb 15, 2024",
    title:
      "Excited to join Northwestern as a PhD student! 🎓 Many thanks to my advisor Manling Li!",
  },
  {
    date: "Oct 19, 2023",
    title:
      "Honored to be awarded the Baosteel Outstanding Student Award 2023 🏆 as the ONLY undergrad student among science and technology departments in RUC! Special thanks to NLPR lab! 🙏",
  },
  {
    date: "Jun 7, 2023",
    title:
      "Excited to share that I'll be joining UIUC Blender Lab 🧪 this summer as a student researcher!",
  },
  {
    date: "Dec 12, 2022",
    title:
      "I posted an article introducing ChatGPT on Capital of Statistics 💡. Do not miss it if you want to know more about ChatGPT!",
    link: "#",
  },
];

const NewsSection = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">📢 News</h2>
      <ul className="space-y-4">
        {newsItems.map((news, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg border ${
              news.highlight
                ? "bg-red-100 border-red-400"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <span className="font-semibold text-gray-700">{news.date} - </span>
            {news.link ? (
              <a
                href={news.link}
                className="text-blue-600 hover:underline font-medium"
              >
                {news.title}
              </a>
            ) : (
              <span className="text-gray-800">{news.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
