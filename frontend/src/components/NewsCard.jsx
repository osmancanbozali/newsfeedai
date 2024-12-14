import { useState } from "react";
import MediaPlayer from "./MediaPlayer";
import Modal from "react-modal";
Modal.setAppElement("#root");

export default function NewsCard({ article }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    console.log(article.audioUrl);
    async function sendClickEvent() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/news/click`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newsId: article._id }),
            });
            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
            } else {
                const result = await response.json();
                console.log("Error:", result);
            }
        } catch (error) {
            console.error('Error sending click event:', error);
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
        sendClickEvent();
    }
    const closeModal = () => {
        setModalIsOpen(false);
    }

    const date = new Date(article.publishedAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    const smallerSummary = article.summary.length > 300 ? article.summary.slice(0, 300) + '...' : article.summary;

    return (<>
        <button onClick={openModal} className="bg-maincolor rounded-2xl p-4 min-h-[350px] max-h-[450px] flex flex-col justify-between text-left">
            <div>
                <div className="flex flex-row justify-between mb-5">
                    <h1 className="text-white font-semibold text-2xl">{article.title}</h1>
                    <p className="text-white ml-2">{article.category}</p>
                </div>
                <p className="text-white">
                    {smallerSummary}
                </p>
            </div>
            <div className="flex flex-row justify-between w-full mt-1">
                <p className="text-white">{formattedDate}</p>
                <p className="text-white">Click to Expand</p>
                <p className="text-white">{article.source}</p>
            </div>
        </button>
        <Modal
            className='bg-maincolor rounded-2xl w-4/5 lg:w-1/2 h-2/3 mx-auto p-4 flex flex-col justify-between overflow-y-auto'
            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <div>
                <div className="flex flex-row justify-between mb-5">
                    <h1 className="text-white font-semibold text-2xl">{article.title}</h1>
                    <p className="text-white ml-2">{article.category}</p>
                </div>
                <p className="text-white">
                    {article.summary}
                </p>
            </div>
            <MediaPlayer audioUrl={article.audioUrl} />
            <div className="flex flex-row justify-between w-full">
                <p className="text-white">{formattedDate}</p>
                <button onClick={closeModal} className="text-white">Click to Close</button>
                <a className="text-white" target="_blank" href={article.url}>{article.source}</a>
            </div>
        </Modal>
    </>
    );
}