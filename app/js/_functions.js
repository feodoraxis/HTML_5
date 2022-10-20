export function is_mobile() {return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));}
export function is_OSX() {return navigator.platform.match(/(Mac|iPhone|iPod|iPad|Android)/i) ? true : false;}