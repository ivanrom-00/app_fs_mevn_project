const connect = require("../app");
const { MongoClient } = require("mongodb");
describe("Pruebas de base de datos", () => {
    let connection;
    let db = null;
    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db(process.env.__MONGO_DB_NAME__);
    });
    test("Debe insertar dentro de la collección", async () => {
        const posts = db.collection("posts");
        let id = Math.floor(Math.random() * 101);
        const mockPost = {
            _id: id,
            title: "Test of post",
            category: "Test",
            content: "some test text",
        };
        await posts.insertOne(mockPost);

        const insertedPost = await posts.findOne({ _id: id });
        expect(insertedPost).toEqual(mockPost);
    });
    test("Compara el insertado con otro", async () => {
        const posts = db.collection("posts");
        let id = Math.floor(Math.random() * 101);
        const mockPost = {
            _id: id,
            title: "Test of post",
            category: "Test",
            content: "some test text",
        };
        const prueba = {
            _id: id,
            //title: "Titulo prueba",
            title: "Test of post",
            category: "Test",
            content: "some test text",
        };
        await posts.insertOne(mockPost);

        const insertedPost = await posts.findOne({ _id: id });
        expect(insertedPost).toEqual(prueba);
    });
    afterAll(async () => {
        await connection.close();
    });
});
