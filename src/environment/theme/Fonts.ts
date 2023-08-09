import { Colors } from './Colors';

export const Fonts = {
	bold: 'Quicksand-Bold',
	semi: 'Quicksand-SemiBold',
	regular: 'Quicksand-Regular',
	medium: 'Quicksand-Medium'
};

export const Typography = {
	header: {
		medium: {
			fontFamily: Fonts.semi,
			fontSize: 20,
			color: Colors.gray[10]
		},
		large: {
			fontFamily: Fonts.semi,
			fontSize: 24,
			color: Colors.gray[10]
		}
	},
	body: {
		small: {
			fontFamily: Fonts.medium,
			fontSize: 12,
			color: Colors.gray[6]
		},
		medium: {
			fontFamily: Fonts.medium,
			fontSize: 14,
			color: Colors.gray[10]
		},
		large: {
			fontFamily: Fonts.medium,
			fontSize: 16,
			color: Colors.gray[10]
		}
	},
	info: {
		fontFamily: Fonts.semi,
		fontSize: 10,
		color: Colors.white
	}
};
