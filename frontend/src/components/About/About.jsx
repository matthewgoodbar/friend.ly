import React from "react";
import "./About.css"

function About() {
    const authors = [
        {
            name: "Diego Novaes",
            github: "https://github.com/dsnovaes",
            linkedin: "https://www.linkedin.com/in/diegonovaes/",
            picture: "https://i.imgur.com/sClpoq6.jpg"
        },
        {
            name: "Evgenii Shvetsov",
            github: "https://github.com/evgenii-shvetsov",
            linkedin: "https://www.linkedin.com/in/shvetsovea/",
            picture: "https://i.imgur.com/XNPUclU.jpg"
        },
        {
            name: "Marcos Henrich",
            github: "https://github.com/Marcoshenrich/",
            linkedin: "https://www.linkedin.com/in/marcos-henrich-794226108/",
            picture: "https://i.imgur.com/zxiytKs.jpg"
        },
        {
            name: "Matthew Goodbar",
            github: "https://github.com/matthewgoodbar",
            linkedin: "https://www.linkedin.com/in/matthew-goodbar-671a24169",
            picture: "https://i.imgur.com/YiWuKeh.jpg"
        },
        {
            name: "Vivian Wang",
            github: "https://github.com/iamxiwang",
            linkedin: "https://www.linkedin.com/in/xi-wang-7b00bb25a/",
            picture: "https://friendly-aa.s3.us-west-1.amazonaws.com/vivian.jpg"
        }
    ]
    return (
        <div className="about-modal">
            <h1>Creators of Friendly</h1>
            <div className="authors">
                {authors.map(author=> 
                    <div className="author">
                        <figure>
                            <img src={author.picture} alt={author.name} />
                        </figure>
                        <h2>{author.name}</h2>
                        <div className="links">
                            <a href={author.github} title={`Visit ${author.name}'s Github profile`} target="_blank">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 0C13.0302 0 11.0796 0.387987 9.25975 1.14181C7.43986 1.89563 5.78628 3.00052 4.3934 4.3934C1.58035 7.20644 0 11.0218 0 15C0 21.63 4.305 27.255 10.26 29.25C11.01 29.37 11.25 28.905 11.25 28.5V25.965C7.095 26.865 6.21 23.955 6.21 23.955C5.52 22.215 4.545 21.75 4.545 21.75C3.18 20.82 4.65 20.85 4.65 20.85C6.15 20.955 6.945 22.395 6.945 22.395C8.25 24.675 10.455 24 11.31 23.64C11.445 22.665 11.835 22.005 12.255 21.63C8.925 21.255 5.43 19.965 5.43 14.25C5.43 12.585 6 11.25 6.975 10.185C6.825 9.81 6.3 8.25 7.125 6.225C7.125 6.225 8.385 5.82 11.25 7.755C12.435 7.425 13.725 7.26 15 7.26C16.275 7.26 17.565 7.425 18.75 7.755C21.615 5.82 22.875 6.225 22.875 6.225C23.7 8.25 23.175 9.81 23.025 10.185C24 11.25 24.57 12.585 24.57 14.25C24.57 19.98 21.06 21.24 17.715 21.615C18.255 22.08 18.75 22.995 18.75 24.39V28.5C18.75 28.905 18.99 29.385 19.755 29.25C25.71 27.24 30 21.63 30 15C30 13.0302 29.612 11.0796 28.8582 9.25975C28.1044 7.43986 26.9995 5.78628 25.6066 4.3934C24.2137 3.00052 22.5601 1.89563 20.7403 1.14181C18.9204 0.387987 16.9698 0 15 0Z" fill="currentColor"/>
                                </svg>
                            </a>
                            <a href={author.linkedin} title={`Visit ${author.name}'s LinkedIn profile`} target="_blank">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7217 20.5H9.055V11.835H11.7217V20.5ZM10.3883 10.7233C9.42667 10.7233 8.945 10.2783 8.945 9.39C8.94202 9.21173 8.97772 9.03493 9.04965 8.87179C9.12159 8.70864 9.22804 8.56304 9.36167 8.445C9.63958 8.18571 10.0084 8.04621 10.3883 8.05667C11.35 8.05667 11.8317 8.50333 11.8317 9.39167C11.8317 10.28 11.3517 10.7233 10.3883 10.7233ZM21.6117 20.5H18.89V15.6667C18.89 14.4083 18.4433 13.7783 17.555 13.7783C16.8517 13.7783 16.39 14.13 16.165 14.8333C16.0933 14.945 16.055 15.1683 16.055 15.5V20.5H13.3333V14.6117C13.3333 13.2783 13.3133 12.3533 13.2783 11.835H15.6117L15.7783 13C16.39 12.0733 17.2783 11.6117 18.5 11.6117C19.4283 11.6117 20.1767 11.935 20.75 12.5833C21.3267 13.2317 21.6133 14.1667 21.6133 15.39V20.5H21.6117ZM15 30C6.72833 30 0 23.2717 0 15C0 6.72833 6.72833 0 15 0C23.2717 0 30 6.72833 30 15C30 23.2717 23.2717 30 15 30ZM15 3.33333C8.56833 3.33333 3.33333 8.56833 3.33333 15C3.33333 21.4317 8.56833 26.6667 15 26.6667C21.4317 26.6667 26.6667 21.4317 26.6667 15C26.6667 8.56833 21.4317 3.33333 15 3.33333Z" fill="currentColor"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default About;