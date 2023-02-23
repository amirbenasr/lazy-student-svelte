import { format, formatDistance } from 'date-fns';
import { config } from './config';

export const ProjectTech: { [key: string]: string[] } = {
	'': [],
	WEB: ['React', 'Laravel', 'Flutter', 'Static website(html/css/js)'],
	MOBILE: ['Flutter', 'React Native', 'Android', 'iOS'],
	BACKEND: ['Firebase', 'NodeJs'],
	FULLSTACK: ['LAMP', 'LEMP', 'MEAN']
};

export const formatGenericDate = (date: string): string => {
	const formattedDate = format(Date.parse(date), 'yyyy-MM-dd');
	return formattedDate;
};

export const formatAgoDate = (date: string): string => {
	const formattedDate = formatDistance(
		new Date(date),
		new Date(),
	   { addSuffix: true }
	) 
	return formattedDate;
};

export const formatReadableDate = (date: string): string => {
	const formattedDate = format(Date.parse(date), 'MMMM yyyy');
	return formattedDate;
};

export const getUserAvatar = (profile: any): string => {
	if (profile.avatar === 'monkey') {
		return config['media-url'] + 'default/' + 'monkey.jpg';
	}
	return config['media-url'] + profile.userId + '/profile.png';
};
