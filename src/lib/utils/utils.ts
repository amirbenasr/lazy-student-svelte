import { format } from 'date-fns';

export const ProjectTech: { [key: string]: string[] } = {
	WEB: ['ReactJs', 'Laravel', 'Flutter', "Static website ('html/css/js')"],
	MOBILE: ['Flutter', 'React Native', 'Android', 'iOS'],
	BACKEND: ['Firebase', 'NodeJs'],
	FULLSTACK: ['LAMP', 'LEMP', 'MEAN']
};

export const formatGenericDate = (date: string): string => {
	const formattedDate = format(Date.parse(date), 'yyyy-MM-dd');
	return formattedDate;
};

export const formatReadableDate = (date: string): string => {
	const formattedDate = format(Date.parse(date), 'MMMM yyyy');
	return formattedDate;
};
