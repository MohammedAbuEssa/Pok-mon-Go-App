const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../src/server");
const { Pokemon, Type, Weather } = require("../src/model/relations");

chai.use(chaiHttp);
const { expect } = chai;

describe("Pokemon API Routes", () => {
  beforeEach(async () => {
    await Pokemon.destroy({ where: {} });
    await Type.destroy({ where: {} });
    await Weather.destroy({ where: {} });
  });

  describe("Create Pokemon Route", () => {
    it("should create a new Pokemon", async () => {
      const response = await chai.request(app).post("/api/pokemon").send({
        name: "Pikachu",
        pokedexNumber: 720,
        imgName: "720",
        generation: 6,
        evolutionStage: "Lower",
        evolved: false,
        familyID: null,
        crossGen: false,
        statTotal: 688,
        ATK: 287,
        DEF: 241,
        STA: 160,
        legendary: 1,
        acquireable: 0,
        spawns: false,
        regional: false,
        raidable: 0,
        hatchable: 0,
        shiny: false,
        nest: false,
        new: false,
        notGettable: false,
        futureEvolve: false,
        "100CPat40": 3992,
        "100CPat39": 3935,
        types: "Electric",
        weathers: "Clear",
      });

      expect(response).to.have.status(201);
      expect(response.body).to.have.property("name").to.equal("Pikachu");
    });
  });

  describe("Get One Pokemon Route", () => {
    let createdPokemon;

    beforeEach(async () => {
      createdPokemon = await Pokemon.create({
        name: "Bulbasaur",
        pokedexNumber: 720,
        imgName: "720",
        generation: 6,
        evolutionStage: "Lower",
        evolved: false,
        familyID: null,
        crossGen: false,
        statTotal: 688,
        ATK: 287,
        DEF: 241,
        STA: 160,
        legendary: 1,
        acquireable: 0,
        spawns: false,
        regional: false,
        raidable: 0,
        hatchable: 0,
        shiny: false,
        nest: false,
        new: false,
        notGettable: false,
        futureEvolve: false,
        "100CPat40": 3992,
        "100CPat39": 3935,
        types: "Electric",
        weathers: "Clear",
      });
    });

    it("should get a specific Pokemon by ID", async () => {
      const response = await chai
        .request(app)
        .get(`/api/pokemon/${createdPokemon.id}`);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("name").to.equal("Bulbasaur");
    });

    it("should return 404 if Pokemon is not found", async () => {
      const response = await chai.request(app).get("/api/pokemons/999");

      expect(response).to.have.status(404);
    });
  });

  describe("Get All Pokemon Route", () => {
    beforeEach(async () => {
      createdPokemon = await Pokemon.create({
        name: "Bulbasaur",
        pokedexNumber: 720,
        imgName: "720",
        generation: 6,
        evolutionStage: "Lower",
        evolved: false,
        familyID: null,
        crossGen: false,
        statTotal: 688,
        ATK: 287,
        DEF: 241,
        STA: 160,
        legendary: 1,
        acquireable: 0,
        spawns: false,
        regional: false,
        raidable: 0,
        hatchable: 0,
        shiny: false,
        nest: false,
        new: false,
        notGettable: false,
        futureEvolve: false,
        "100CPat40": 3992,
        "100CPat39": 3935,
        types: "Electric",
        weathers: "Clear",
      });
    });

    it("should get all Pokemons with filters", async () => {
      const response = await chai.request(app).get("/api/pokemon");

      expect(response).to.have.status(200);
      expect(response.body).to.have.property("count");
      expect(response.body).to.have.property("pokemons");
    });
  });

  describe("Delete Pokemon Route", () => {
    let createdPokemon;

    beforeEach(async () => {
      createdPokemon = await Pokemon.create({
        name: "Bulbasaur",
        pokedexNumber: 720,
        imgName: "720",
        generation: 6,
        evolutionStage: "Lower",
        evolved: false,
        familyID: null,
        crossGen: false,
        statTotal: 688,
        ATK: 287,
        DEF: 241,
        STA: 160,
        legendary: 1,
        acquireable: 0,
        spawns: false,
        regional: false,
        raidable: 0,
        hatchable: 0,
        shiny: false,
        nest: false,
        new: false,
        notGettable: false,
        futureEvolve: false,
        "100CPat40": 3992,
        "100CPat39": 3935,
        types: "Electric",
        weathers: "Clear",
      });
    });

    it("should delete a specific Pokemon by ID", async () => {
      const response = await chai
        .request(app)
        .delete(`/api/pokemon/${createdPokemon.id}`);

      expect(response).to.have.status(204);
    });

    it("should return 404 if Pokemon is not found", async () => {
      const response = await chai.request(app).delete("/api/pokemon/999");

      expect(response).to.have.status(404);
    });
  });
});
