process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const fs = require('fs');
const server = require('./app');

chai.use(chaiHttp);

describe('Product API', () => {
    before(() => {
        const TEST_DATA = {
            1: {
                id: 1,
                name: "Наушники TWS Apple AirPods Pro (2nd generation) USB-C белый",
                price: 27999,
                rating: 0,
                img: "69535aa7-78be-4398-94b4-8cfd28cdcb7a.jpg",
                isFavorite: false,
                createdAt: "2025-01-11T09:11:39.201Z",
                updatedAt: "2025-01-11T09:11:39.201Z",
                typeId: 1,
                brandId: 1
            },
            2: {
                id: 2,
                name: "Наушники TWS Apple AirPods 4 ANC белый",
                price: 25999,
                rating: 0,
                img: "76b1bb18-071c-475e-bb0d-a5e70a55db3b.jpg",
                isFavorite: false,
                createdAt: "2025-01-11T12:53:34.559Z",
                updatedAt: "2025-01-11T12:53:34.559Z",
                typeId: 1,
                brandId: 1
            },
        };

        fs.writeFileSync(
            'data-test.json',
            JSON.stringify(TEST_DATA)
        );
    });

    it('should get all products', (done) => {
        chai.request(server)
            .get('/api/product')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.haveOwnProperty('data');

                done();
            });
    });

    it('should get product by id', (done) => {
        chai.request(server)
            .get('/api/product/2')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.haveOwnProperty('data');
                expect(res.body.data.id).to.equal(2);

                done();
            });
    });

    it("shouldn't get non-existing product", (done) => {
        chai.request(server)
            .get('/api/product/4')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });

    it('should create product', (done) => {
        chai.request(server)
            .post('/api/product')
            .send({
                product: {
                    id: 3,
                    name: "Наушники TWS Apple AirPods 4 ANC белый",
                    price: 25999,
                    rating: 0,
                    img: "76b1bb18-071c-475e-bb0d-a5e70a55db3b.jpg",
                    isFavorite: false,
                    typeId: 1,
                    brandId: 1
                },
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });

    it("shouldn't create product with existing id", (done) => {
        chai.request(server)
            .post('/api/product')
            .send({
                product: {
                    id: 3,
                    name: "Наушники TWS Apple AirPods 4 ANC белый",
                    price: 25999,
                    rating: 0,
                    img: "76b1bb18-071c-475e-bb0d-a5e70a55db3b.jpg",
                    isFavorite: false,
                    typeId: 1,
                    brandId: 1
                },
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(409);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });

    it("shouldn't update non-existing product", (done) => {
        chai.request(server)
            .put('/api/product')
            .send({
                product: {
                    id: 4,
                    name: "Наушники TWS белый",
                    price: 10000,
                },
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });

    it('should delete product', (done) => {
        chai.request(server)
            .delete('/api/product/remove/2')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });

    it("shouldn't delete non-existing product", (done) => {
        chai.request(server)
            .delete('/api/product/remove/4')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.haveOwnProperty(
                    'message'
                );

                done();
            });
    });
});