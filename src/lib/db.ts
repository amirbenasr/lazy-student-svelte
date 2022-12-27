var db = new Map();

export const createTodo = (todo: any, userid: string | number) => {
	if (!db.has[userid]) {
		db.set(userid, []);
	}
	const todos = db.get[userid];

	todo.push({
		id: crypto.randomUUID(),
		todo,
		done: false
	});
};
