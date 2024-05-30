const nextConfig = {
	images: {
		domains: ["skins.minimog.co"],
	},
	fastRefresh: true,
	productionBrowserSourceMaps: false,
	optimizeFonts: false,
	minify: false,
	concurrentFeatures: true,
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
