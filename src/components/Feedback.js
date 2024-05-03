// import { useEffect, useState } from "react";

// export default function Feedback() {
//     const [feedbackData, setFeedbackData] = useState({});
//     const [feedbackList, setFeedbackList] = useState([]);
//     const [cartItems, setCartItems] = useState([]);


//     useEffect(() => {
//         // Lấy dữ liệu giỏ hàng từ localStorage khi component được tải lần đầu tiên
//         const storedCartItems = localStorage.getItem('cart');
//         if (storedCartItems) {
//             setCartItems(JSON.parse(storedCartItems));
//         }

//         // Lấy dữ liệu phản hồi từ localStorage khi component được tải lần đầu tiên
//         const storedFeedbackData = localStorage.getItem('feedbackData');
//         if (storedFeedbackData) {
//             setFeedbackData(JSON.parse(storedFeedbackData));
//         }
//         const storedFeedbackList = localStorage.getItem('feedbackList');
//         if (storedFeedbackList) {
//             setFeedbackList(JSON.parse(storedFeedbackList));
//         }
//     }, []);
//     return (
//         <section>
//             <div>
//                 <div className="title_banner2">
//                     <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Feedback</span>
//                 </div>
//                 <p>Product Name: {feedbackData.productName}</p>
//                 <p>Comment: {feedbackData.comment}</p>
//                 <p>Rating: {feedbackData.rating}</p>
//             </div>
//         </section>
//     );
// }
import React, { useState, useEffect } from "react";

export default function Home() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        // Load feedback list from localStorage
        const storedFeedbackList = localStorage.getItem("feedbackList");
        if (storedFeedbackList) {
            setFeedbackList(JSON.parse(storedFeedbackList));
        }
    }, []);

    const limitedFeedbackList = feedbackList.slice(0, 5); // Chỉ lấy 5 phản hồi đầu tiên

    return (
        <div>
            <div className="title_banner2"><span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Feedback</span></div>
            <ul>
                {limitedFeedbackList.map((feedback, index) => (
                    <li key={index}>
                        <p>Product Name: {feedback.productName}</p>
                        <p>Comment: {feedback.comment}</p>
                        <p>Rating: {feedback.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
