import React, { useState } from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "Who can donate blood?",
            answer: "Most people who are healthy, weigh at least 50kg, and are aged between 18 and 65 can donate blood."
        },
        {
            question: "How often can I donate blood?",
            answer: "You can usually donate whole blood every 3 months (90 days). This gives your body plenty of time to replenish its iron levels."
        },
        {
            question: "Is it safe to donate blood?",
            answer: "Absolutely. Donating blood is very safe. A new, sterile needle is used for each donor and then discarded. You cannot contract any disease from donating blood."
        },
        {
            question: "How long does the donation process take?",
            answer: "The entire process, from registration to recovery, usually takes about 45 minutes to an hour. The actual donation only takes 8-10 minutes."
        },
        {
            question: "What should I do before donating?",
            answer: "Eat a healthy meal, stay hydrated by drinking plenty of water, and get a good night's sleep before your donation."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="min-h-screen bg-surface-variant py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                            Common Questions
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Everything you need to know about blood donation and our platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="glass-card bg-white border-none shadow-premium overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full p-6 text-left flex justify-between items-center group"
                                >
                                    <span className={`text-lg font-bold transition-colors ${activeIndex === index ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}>
                                        {faq.question}
                                    </span>
                                    <span className={`text-2xl transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                                        ↓
                                    </span>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 glass-card bg-secondary p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                        <p className="text-gray-400 mb-8">We're here to help you understand the process better.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a href="mailto:manoj262671@gmail.com" className="btn btn-primary">Email Us</a>
                            <a href="tel:7799179197" className="btn btn-secondary border-white/20 hover:bg-white text-secondary hover:text-secondary group">
                                <span className="transition-transform group-hover:rotate-12 inline-block">📱</span> Call Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
