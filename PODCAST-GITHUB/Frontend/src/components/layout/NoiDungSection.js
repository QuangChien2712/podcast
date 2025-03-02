import React, { useEffect, useState } from 'react';

const ContentSection = ({ contents }) => {
	const [contentList, setContentList] = useState([contents]);

	useEffect(() => {
		let arrNoiDung = [];
		let regex = /\r\n\r\n/gi;
		let noiDungSau = contents.replace(regex, 'HAIDONG');
		let arrContents = noiDungSau.split('THEO');
		for (let index = 0; index < arrContents.length; index++) {
			const element = arrContents[index];
			let x = element.split('\r\n');
			arrNoiDung = arrNoiDung.concat(x);
		}
		setContentList(arrNoiDung);
		// setContentList(arrContents);
	}, [contents]);

	return (
		<div>
			{contentList &&
				contentList.length > 0 &&
				contentList.map((item, index) => {
					return (
						<div key={index} className="text-justify">
							{item.includes(`https:`) ? (
								<img src={item} alt={'Ảnh'} className="w-full h-80 object-cover rounded-lg mt-6 mb-6" />
							) : item.includes('HAIDONG') ? (
								<div>
									{item.split('HAIDONG').map((m, index) => {
										return index < item.split('HAIDONG').length - 1 ? (
											<div key={index}>
												<div className="prose max-w-none text-gray-700 leading-7 mt-1 mb-1">
													{m}
												</div>
												<br></br>
											</div>
										) : (
											<div key={index}>
												<div className="prose max-w-none text-gray-700 leading-7 mt-1 mb-1">
													{m}
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<div className="prose max-w-none text-gray-700 leading-7 mt-1 mb-1">{item}</div>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default ContentSection;
