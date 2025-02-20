import React from 'react';
import CustomSection from './CustomSection';

const HomePageSection = ({ backgroundImage, mainHeading, subHeading, title, subtitle }) => {
	return (
		<div className="bg-black w-screen flex items-center justify-center relative max-h-[800px] h-screen sm:max-h-[600px]">
			{/* Background Image */}
			<div className={`${backgroundImage} bg-center bg-cover bg-no-repeat h-80 sm:h-60`}>
				{/* Overlay Content */}
				<div className="flex flex-col w-full h-full bg-black bg-opacity-50">
					{/* Main Heading */}
					<h1 className="mt-[-54px] font-svnCookies text-white text-4xl uppercase font-bold text-center">
						{mainHeading}
					</h1>

					{/* Sub Heading */}
					<h3 className="italic mt-[120px] font-thin text-white text-2xl normal-case font-bold text-center">
						{subHeading}
					</h3>

					{/* Custom Section */}
					<div className="w-full mt-[100px]">
						<CustomSection
							title={title}
							subtitle={subtitle}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePageSection;
