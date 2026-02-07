import React from 'react';

const Contact = () => {
    const contactDetails = [
        {
            icon: "📧",
            label: "Email Address",
            value: "manoj262671@gmail.com",
            link: "mailto:manoj262671@gmail.com"
        },
        {
            icon: "📱",
            label: "Phone Number",
            value: "7799179197",
            link: "tel:7799179197"
        },
        {
            icon: "📍",
            label: "Main HQ",
            value: "Hyderabad, India",
            link: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-surface-variant py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-full">
                            Get In Touch
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-secondary mb-6">
                            Contact <span className="text-primary">Us</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Have a question or want to support our mission? Reach out to us through any of these channels.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {contactDetails.map((detail, index) => (
                            <a
                                key={index}
                                href={detail.link}
                                className="glass-card bg-white p-10 text-center hover:translate-y-[-8px] transition-all duration-300 group shadow-premium divide-y divide-gray-50 flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:rotate-6">
                                    {detail.icon}
                                </div>
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pt-6">{detail.label}</h3>
                                <p className="text-xl font-black text-secondary group-hover:text-primary transition-colors tracking-tight">
                                    {detail.value}
                                </p>
                            </a>
                        ))}
                    </div>

                    {/* Direct Support Card */}
                    <div className="mt-16 glass-card bg-white border-none shadow-premium p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                        <div className="flex-1 text-center lg:text-left relative z-10">
                            <h2 className="text-3xl font-black text-secondary uppercase tracking-tighter mb-4">Urgent Inquiries?</h2>
                            <p className="text-gray-600 text-lg mb-0 font-medium tracking-tight">
                                Our support team is available during business hours to assist you with critical matters.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                            <a href="tel:7799179197" className="btn btn-primary px-10 py-4 flex items-center gap-3 shadow-lg group">
                                <span className="text-xl transition-transform group-hover:rotate-12">📱</span>
                                Call Support
                            </a>
                            <a href="mailto:manoj262671@gmail.com" className="btn btn-secondary px-10 py-4 flex items-center gap-3 bg-white hover:bg-gray-50">
                                <span className="text-xl">📧</span>
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
