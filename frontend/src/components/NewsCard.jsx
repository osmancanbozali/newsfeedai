
export default function NewsCard({ article }) {
    const date = new Date(article.publishedAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    const smallerSummary = article.summary.length > 300 ? article.summary.slice(0, 300) + '...' : article.summary;

    return (
        <div className="bg-maincolor rounded-2xl p-4 min-h-[350px] max-h-[450px] flex flex-col justify-between">
            <div>
                <div className="flex flex-row justify-between mb-5">
                    <h1 className="text-white font-semibold text-2xl">{article.title}</h1>
                    <p className="text-white ml-2">{article.category}</p>
                </div>
                <p className="text-white">
                    {smallerSummary}
                </p>
            </div>
            <div className="flex flex-row justify-between w-full">
                <p className="text-white">{formattedDate}</p>
                <p className="text-white">Click to Expand</p>
                <p className="text-white">{article.source}</p>
            </div>
        </div>

    );
}