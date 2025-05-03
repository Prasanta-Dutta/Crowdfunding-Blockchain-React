import React from "react";

const Footer = () => {
    const productList = ["Market", "ERC20 Token", "Donation"];
    const contactList = [
        "support@donator.com",
        "info@example.com",
        "Contact us"
    ];
    const usefulLinks = ["Home", "About Us", "Company Bio"];
    return(
        <footer className="text-center text-white backgroundMain lg:text-left">
            <div className="mx-6 py-10 text-center md:text-left">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="">
                    <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Donator
                        </h6>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, tenetur repellendus. Fuga veniam veritatis dolorem nobis consequatur nulla, quos ad!</p>
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Products
                        </h6>
                        {
                            productList.map((item, index) => (
                                <p className="mb-4" key={index + 1}>
                                    <a href="#!">{item}</a>
                                </p>
                            ))
                        }
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Contact Us
                        </h6>
                        {
                            contactList.map((item, index) => (
                                <p className="mb-4" key={index + 1}>
                                    <a href="#!">{item}</a>
                                </p>
                            ))
                        }
                    </div>
                    <div className="">
                        <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                            Useful links
                        </h6>
                        {
                            usefulLinks.map((item, index) => (
                                <p className="mb-4" key={index + 1}>
                                    <a href="#!">{item}</a>
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="backgroundMain p-6 text-center">
                <span>&copy; 2025 Copyright </span>
                <a href="https://google.com" className="font-semibold">Donator</a>
            </div>
        </footer>
    )
};

export default Footer;
