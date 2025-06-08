import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CHON_GIAI_PHAP, GIOI_THIEU } from '../../constants/path';

const Bio = () => {
	const path = window.location.pathname;
	console.log('Current path:', path);
	var imageUrls = [];
	if (path === `/${GIOI_THIEU}`) {
		imageUrls = [
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749355389/Thay_trang_đầu_tiên_bkg2ta.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417325/8ed7a8f2eb8e5ad0039f2_aytj2v.jpg',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417322/a313f3cebfb20eec57a33_dfb7a2.jpg',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417335/16fae668aa141b4a42054_hfrwsv.jpg',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417333/02ae85dcc9a078fe21b15_haexfe.jpg',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1741417331/47140417486bf935a07a6_ygjv0z.jpg',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749355392/TRANG_KẾ_CUỐI_vosjht.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749355386/Thêm_TRANG_CUỐI_jqdwdi.png',
		];
	} else if (path === `/${CHON_GIAI_PHAP}`) {
		imageUrls = [
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356271/Coaching_1-1_bzeh5n.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356287/CHO%CC%A3N_GIA%CC%89I_PHA%CC%81P_-_1_hour_coaching_free_-_Diag_xbgzpo.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356282/MAY_%C4%90O_KE%CC%82%CC%81_HOA%CC%A3CH_iizcl8.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356283/ASSESSMENT_bfgy61.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356285/GAME_ina8b9.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/Alignment_-_cha%CC%82%CC%89n_%C4%91oa%CC%81n_DN_pi00jz.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/v1749356272/%C4%90a%CC%80o_ta%CC%A3o_Ky%CC%83_na%CC%86ng_atmvye.png',
			'https://res.cloudinary.com/dxakedneq/image/upload/w_500,q_auto,f_auto/TheO_Life_Style_wqcc5o.png',
		];
	}

	return (
		<div className="bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center">
			<div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
				{imageUrls.map((url, index) => (
					<LazyLoadImage key={index} src={url} alt={`Image ${index + 1}`} effect="blur" />
				))}
			</div>
		</div>
	);
};

export default Bio;
