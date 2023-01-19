import { toast } from '@zerodevx/svelte-toast';

export const success = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastBackground': 'green',
			'--toastColor': 'white',
			'--toastBarHeight': 0
		}
	});

export const warning = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastBackground': 'white',
			'--toastColor': 'red',
			'--toastBarHeight': 0
		}
	});

export const failure = (m: string) => toast.push(m, { theme: {} });
