const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	if (!email || !name || !password) {
		res.status(400).json('incorrect form submission')
	} else {
		const hash = bcrypt.hashSync(password);
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.then(() => {
				trx.insert({
					name: name,
					email: email,
					joined: new Date()
				})
				.into('users')
				.returning('*')
				.then(users => {
					res.json(users[0]);
				})		
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err => res.status(400).json('unable to register!'))
	}
}

export default handleRegister;