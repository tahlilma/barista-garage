const express = require('express');
const path = require("path");
const fs = require('fs/promises')

const app = express();

app.use(express.static("public"));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./views/about.html'))
})

app.get('/beans', (req, res) => {
    res.sendFile(path.resolve('./views/beans.html'))
})

app.get('/accessories', (req, res) => {
    res.sendFile(path.resolve('./views/accessories.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve('./views/contact.html'))
})

app.post("/newsletter/register", async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ error: "The request body must contain an email field." });
        return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)) {
        res.status(400).send({ error: "Email format is not valid." });
        return;
    }
    
    const data = JSON.parse(await fs.readFile('./data/newsletter.json' , 'utf-8'));
    
    if (data.includes(req.body.email)) {
        res.status(400).send({ error: "Email already exists." });
        return;
    } else {
        data.push(req.body.email);
        await fs.writeFile('./data/newsletter.json', JSON.stringify(data), 'utf8');
        res.status(200).send(data);
        return;
    }
    
});

app.post('/newsletter/send', async (req, res) => {
    const { author, date, content } = req.body;
    
    if (!author || !date || !content) {
        res.status(400).send({ error: "The req must contain a author, date and content field." });
        return;
    } else if (JSON.stringify(new Date(date)) === 'null') {
        res.status(400).send({ error: "The date is invalid." });
        return;
    } else if (!content.title || !content.body) {
        res.status(400).send({ error: "The content field must contain title and body fields." });
        return;
    }

    const data = JSON.parse(await fs.readFile('./data/newsletter.json' , 'utf-8'));

    // TODO: write the actual send email part
    return res.status(200).send(data);
});

app.listen(3000, () => console.log('Running on http://localhost:3000/'))
