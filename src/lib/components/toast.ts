import { toast } from '@zerodevx/svelte-toast';

export const success = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastContainerTop': 'auto',
			'--toastContainerRight': 'auto',
			'--toastContainerBottom': '8rem',
			'--toastContainerLeft': 'calc(50vw - 8rem)',
			'--toastBackground': 'green',
			'--toastColor': 'white',
			'--toastBarHeight': 0
		}
	});

export const warning = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastContainerTop': 'auto',
			'--toastContainerRight': 'auto',
			'--toastContainerBottom': '8rem',
			'--toastContainerLeft': 'calc(50vw - 8rem)',
			'--toastBackground': 'red',
			'--toastColor': 'white',
			'--toastBarHeight': 0
		}
	});

export const failure = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastContainerTop': 'auto',
			'--toastContainerRight': 'auto',
			'--toastContainerBottom': '8rem',
			'--toastContainerLeft': 'calc(50vw - 8rem)',
			'--toastBackground': 'red',
			'--toastColor': 'white',
			'--toastBarHeight': 0
		}
	});
