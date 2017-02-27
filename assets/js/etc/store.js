const Cookies = {

	/**
	 * Will create a cookie in the browser
	 * @param  {String} name - Name of the cookie
	 * @param  {String} value - Value of the cookie
	 * @param  {Int} days - Days to store cookie
	 */
	set(name, value, days = 30) {
		let expires = '';
		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	},

	/**
	 * Will return the value of a cookie for a given name
	 * @param  {String} name - the name of the cookie to get the value for
	 */
	get(name) {
		const nameEQ = name + "=";
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},

    clear() {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); })
    }
};

export default Cookies;
