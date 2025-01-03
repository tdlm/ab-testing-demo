import React from 'react';

type HeroProps = {
    heading: string;
    subheading?: string;
};

export const Hero: React.FC<HeroProps> = ({ heading, subheading }) => {
    return (
        <div className="relative min-h-[300px] flex items-center justify-center">
            <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">{heading}</h1>
                {!!subheading && <p className="text-xl mb-8">{subheading}</p>}
            </div>
        </div>
    );
};
