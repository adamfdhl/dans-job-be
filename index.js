const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const GITHUB_URL = "https://jobs.github.com";
const PORT = process.env.PORT || 5000;

const parsedQuery = (queries) => {
	let parsedQuery = "";
	for (let query in queries) {
		parsedQuery += `${query}=${queries[query]}`;
	}
	return parsedQuery;
};

app.get("/", (req, res) => {
	res.send("Server is up");
});

app.get("/jobs", async (req, res) => {
	try {
		const query = parsedQuery(req.query);
		let url = `${GITHUB_URL}/positions.json`;
		if (query) url += `?${query}`;
		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(400).send({
			message: "Something Went Wrong!",
		});
	}
});

app.get("/jobs/:id", async (req, res) => {
	try {
		const query = parsedQuery(req.query);
		let url = `${GITHUB_URL}/positions/${req.params.id}.json`;
		if (query) url += `?${query}`;

		const response = await axios.get(url);
		res.send(response.data);
	} catch (err) {
		res.status(400).send({
			message: "Something Went Wrong!",
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server is listening at PORT:${PORT}`);
});
