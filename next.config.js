const nextConfig = {
	images: {
		domains: ["skins.minimog.co"],
	},
};

const customConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:slug*',
				destination: `http://localhost:3000/api/:slug*`,
			},
		]
	},
};

module.exports = {
	...nextConfig,
	...customConfig
};
