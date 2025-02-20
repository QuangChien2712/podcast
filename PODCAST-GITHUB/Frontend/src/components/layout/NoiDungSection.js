import React, {useEffect, useState } from 'react';

const ContentSection = ({ contents }) => {
    const [contentList, setContentList] = useState([contents]);
    
    useEffect(() => {
        let arrContents = contents.split("THEO");
        setContentList(arrContents);
      }, [contents]);
    
      
    return (
        <div>           
            {contentList && contentList.length > 0 && contentList.map((item, index) => {
                if(index % 2 === 0){
				return (
					<div key={index}>
					<div className="prose max-w-none text-gray-700 leading-7 mt-4 mb-8">{item}</div>
					{index + 1 <= contentList.length - 1 ? <img src={contentList[index+1]} alt={"Ảnh"} className="w-full h-80 object-cover rounded-lg mb-6" /> : <span></span>}
					</div>
					);
				}			
            }
        )}        
        </div>
    );
};

export default ContentSection;



