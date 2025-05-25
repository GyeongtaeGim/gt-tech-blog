import { NextConfig } from 'next';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

const nextConfig: NextConfig = {
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins.push(
				new CopyWebpackPlugin({
					patterns: [
						{
							from: path.resolve(__dirname, './src/posts'), // 예: certs, 설정파일 등
							to: path.resolve(__dirname, '.next/server/posts'),
						},
					],
				}))
		}
		return config
	}
};

export default nextConfig;
