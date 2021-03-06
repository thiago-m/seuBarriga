const request = require('supertest')

const app = require('../../src/app')

const mail = `${Date.now()}@mail.com`

test('Deve listar todos os usuários', () => {
	return request(app).get('/users')
		.then(res => {
			expect(res.status).toBe(200)
			expect(res.body.length).toBeGreaterThan(0)
		})
})

test("Deve inserir usuário com sucesso", () => {
	return request(app).post('/users')
		.send({name: 'Walter Mitty', mail, password: '123'})
		.then(res => {
			expect(res.status).toBe(201)
			expect(res.body.name).toBe('Walter Mitty')
		})
})

test('Não deve inserir usuário sem nome', () => {
	return request(app).post('/users')
		.send({mail: 'teste@mail.com', password: '123'})
		.then(res => {
			expect(res.status).toBe(400)
			expect(res.body.error).toBe('Nome é um atributo obrigatório')
		})
})

test('Não deve inserir usuário sem email', async () => {
	const result = await request(app).post('/users')
		.send({name: 'user teste', password: '123'})
	
	expect(result.status).toBe(400)
	expect(result.body.error).toBe('Email é um atributo obrigatório')
})

test('Não deve inserir usuário sem senha', async done => {
	const result = await request(app).post('/users')
		.send({name: 'user teste', mail: 'teste@mail.com'})
	
	expect(result.status).toBe(400)
	expect(result.body.error).toBe('Senha é um atributo obrigatório')
	done()
})

test('Não deve inserir usuário com email já existente', () => {
	return request(app).post('/users')
		.send({name: 'Walter Mitty', mail, password: '123'})
		.then(res => {
			expect(res.status).toBe(400)
			expect(res.body.error).toBe('Já existe um usuário com esse email')
		})
})