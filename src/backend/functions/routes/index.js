const express = require("express");
const admin = require('firebase-admin');
const router = express.Router();
const db = admin.firestore();

// const bcrypt = require("bcrypt");
const saltRounds = 10;

//Default
router.get('/api/', (_, res) => {
    res.status(200).send('Express Running App!!!!');
});

//Login
router.post('/api/login', async (req, res) => {
    try {
        res.status(200).send();
        return;
    } catch (error) {
        res.status(500).send(error);
        return;
    }
})

//Login
router.post('/api/logout', async (req, res) => {
    try {
        admin.signOut().then(() => {
            res.status(200).send();
            return;
        }).catch(error => {
            console.log(error)
        });
        res.status(200).send();
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        return;
    }

})

//List Users
router.get('/api/list-user', async (req, res) => {
    try {
        let query = db.collection('users');
        let response = [];
        await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                };
                response.push(selectedItem);
            }
            return
        });
        res.status(200).send(response);
        return;
    } catch (error) {
        res.status(500).send(error);
        return;
    }
});

//Create User
router.post('/api/add-user', async (req, res) => {
    try {

        admin.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            disabled: false
        })
        
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        await db.collection('users').add(data)
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Get User
router.get('/api/get-user/:email', async (req, res) => {
    try {

        let query = db.collection('users').where('email', '==', req.params.email);
        let response = null;
        await query.get().then(async (querySnapshot) => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                };
                response = selectedItem
            }
            return;
        }).catch(error => {
            console.log(error)
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Update User
router.put('/api/put-user/:id', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
        }
        const document = db.collection('users').doc(req.params.id);
        await document.update(data);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Delete User
router.delete('/api/del-user/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//# Project
//List Project
router.get('/api/list-projects/:id', async (req, res) => {
    try {
        let query = db.collection('projects').where('user_id', '==', req.params.id);
        let response = [];
        await query.get().then(async (querySnapshot) => {
            let docs = querySnapshot.docs;
            /* eslint-disable no-await-in-loop */
            for (let doc of docs) {
                let query = db.collection('tasks').where('project_id', '==', doc.id);
                let tasks = [];
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs;
                    for (let doc of docs) {
                        const task = {
                            id: doc.id,
                            description: doc.data().description,
                            status: doc.data().status,
                            dt_create: doc.data().dt_create,
                            dt_finish: doc.data().dt_finish,
                        };
                        tasks.push(task);
                    }
                    return
                })
                const selectedItem = {
                    id: doc.id,
                    name: doc.data().name,
                    tasks: tasks
                };
                response.push(selectedItem);
            }
            /* eslint-enable no-await-in-loop */
            return
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        console.log(error.response.body)
        return res.status(500).send(error);
    }
});

//Create Project
router.post('/api/add-project', async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id,
            name: req.body.name,
        }
        await db.collection('projects').add(data)
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Update Project
router.put('/api/put-project/', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
        }
        const document = db.collection('projects').doc(req.body.id);
        await document.update(data);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Delete Project
router.delete('/api/del-project/:id', async (req, res) => {
    try {
        const document = db.collection('projects').doc(req.params.id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//# Tasks
//Create Task
router.post('/api/add-task', async (req, res) => {
    try {
        let dt_finish = new Date();
        const numberToAdd = 2;
        dt_finish.setDate(dt_finish.getDate() + numberToAdd);

        const data = {
            project_id: req.body.project_id,
            description: req.body.description,
            status: false,
            dt_create: new Date(Date.now()),
            dt_finish: dt_finish,
        }
        await db.collection('tasks').add(data)
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Update Task
router.put('/api/put-task', async (req, res) => {
    try {
        const data = {
            description: req.body.description,
            status: req.body.status,
        }
        const document = db.collection('tasks').doc(req.body.id);
        await document.update(data);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

//Delete Task
router.delete('/api/del-task/:id', async (req, res) => {
    try {
        const document = db.collection('tasks').doc(req.params.id);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;