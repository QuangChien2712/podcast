export const convertTitleToPath = (id, title) => {
	if (!title) return '';

	// Vietnamese character mapping
	const vietnameseMap = {
		à: 'a',
		á: 'a',
		ả: 'a',
		ã: 'a',
		ạ: 'a',
		ă: 'a',
		ằ: 'a',
		ắ: 'a',
		ẳ: 'a',
		ẵ: 'a',
		ặ: 'a',
		â: 'a',
		ầ: 'a',
		ấ: 'a',
		ẩ: 'a',
		ẫ: 'a',
		ậ: 'a',
		đ: 'd',
		è: 'e',
		é: 'e',
		ẻ: 'e',
		ẽ: 'e',
		ẹ: 'e',
		ê: 'e',
		ề: 'e',
		ế: 'e',
		ể: 'e',
		ễ: 'e',
		ệ: 'e',
		ì: 'i',
		í: 'i',
		ỉ: 'i',
		ĩ: 'i',
		ị: 'i',
		ò: 'o',
		ó: 'o',
		ỏ: 'o',
		õ: 'o',
		ọ: 'o',
		ô: 'o',
		ồ: 'o',
		ố: 'o',
		ổ: 'o',
		ỗ: 'o',
		ộ: 'o',
		ơ: 'o',
		ờ: 'o',
		ớ: 'o',
		ở: 'o',
		ỡ: 'o',
		ợ: 'o',
		ù: 'u',
		ú: 'u',
		ủ: 'u',
		ũ: 'u',
		ụ: 'u',
		ư: 'u',
		ừ: 'u',
		ứ: 'u',
		ử: 'u',
		ữ: 'u',
		ự: 'u',
		ỳ: 'y',
		ý: 'y',
		ỷ: 'y',
		ỹ: 'y',
		ỵ: 'y',
	};

	return (
		title
			.toLowerCase()
			.split('')
			.map((char) => vietnameseMap[char] || char) // Replace Vietnamese characters
			.join('')
			.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
			.trim()
			.replace(/\s+/g, '-') 
			+ 
			`-${id}`
	); // Replace spaces with hyphens
};

export const convertTitleToPathAlt = (id, title) => {
	if (!title) return '';

	return (
		title
			.toLowerCase()
			.normalize('NFD') // Normalize to decomposed form
			.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
			.replace(/đ/g, 'd') // Special case for Vietnamese 'd'
			.replace(/[^\w\s-]/g, '') // Remove special characters
			.trim()
			.replace(/\s+/g, '-') + `-${id}`
	); // Replace spaces with hyphens
};

export const extractIdFromPath = (path) => {
  // Handle null, undefined, or non-string values
  if (!path || typeof path !== 'string') {
    console.warn('extractIdFromPath received invalid input:', path);
    return { id: null, slug: '' };
  }
  
  // Find the last hyphen position
  const lastHyphenIndex = path.lastIndexOf('-');
  
  if (lastHyphenIndex === -1) {
    return { id: null, slug: path };
  }
  
  // Extract ID (everything after the last hyphen)
  const id = path.substring(lastHyphenIndex + 1);
  
  // Extract slug (everything before the last hyphen)
  const slug = path.substring(0, lastHyphenIndex);
  
  return { id, slug };
};

export default convertTitleToPath;