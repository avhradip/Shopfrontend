import Image from 'next/image';
import React from 'react'

function Faqs() {

  const faqs = [
    {
      id: 1,
      name: "Emily Johnson",
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of delivery for a full refund. The item must be unused and in its original packaging.",
      profileImage: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Smith",
      question: "How long does shipping take?",
      answer: "Standard shipping usually takes 5-7 business days. Expedited shipping options are also available at checkout.",
      profileImage: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Sarah Lee",
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping fees and delivery times vary based on the destination.",
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "David Kim",
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package.",
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      question: "Can I cancel or change my order?",
      answer: "You can cancel or modify your order within 2 hours of placing it by contacting our support team.",
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 6,
      name: "James Brown",
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping at an additional cost. You can select this option during checkout.",
      profileImage: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      id: 7,
      name: "Ava Wilson",
      question: "Is my payment information secure?",
      answer: "Absolutely. We use secure payment gateways and do not store any of your card details.",
      profileImage: "https://randomuser.me/api/portraits/women/7.jpg"
    },
  ];



  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-10">
      {faqs.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-xl p-6 w-[350px]">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={item.profileImage}
              alt="User"
              width={50}
              height={50}
              className="rounded-full border border-gray-300"
            />
            <div>
              <p className="text-sm font-semibold text-gray-700">Asked by</p>
              <p className="text-base text-black">{item.name || "Anonymous"}</p>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-500 font-medium mb-1">Question</p>
            <p className="text-md font-semibold text-black">{item.question}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Answer</p>
            <p className="text-sm text-gray-700">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>

  )
}

export default Faqs