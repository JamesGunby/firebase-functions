import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
const taCollection = 'teachingAssistant';
const anCollection = 'announcements';
const evCollection = 'events';
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));// webApi is your functions name, and you will pass main as
// a parameter
export const webApi = functions.https.onRequest(main);

//Add TA
app.post('/teachingAssistant', async (req, res) => {
    try {
        const teachingassistant = {
            name: req.body['name'],
            class: req.body['class'],
            email: req.body['email'],
            officeHourDays: req.body['officeHourDays'],
            officeHours: req.body['officeHours'],
            phoneNumber: req.body['phoneNumber'],
        };
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, taCollection, teachingassistant);
        res.status(201).send(`Created a new contact: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Error in entry.`)
    }
})

//Remove TA
app.delete('/teachingAssistant/:id', async (req, res) => {
    const deletedTA = await firebaseHelper.firestore
        .deleteDocument(db, taCollection, req.params.id);
    res.status(204).send(`TA is deleted: ${deletedTA}`);
})

//Edit TA
app.patch('/teachingAssistant/:id', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, taCollection, req.params.id, req.body);
    res.status(204).send(`Update a teaching assistant: ${updatedDoc}`);
})

//Add Announcements
app.post('/announcements', async (req, res) => {
    try {
        const announcement = {
            name: req.body['name'],
            description: req.body['description'],
            teachingAssistantID: req.body['teachingAssistantID'],
        };
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, anCollection, announcement);
        res.status(201).send(`Created a new announcement: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Error in entry.`)
    }
})

//Delete Announcements
app.delete('/announcements/:id', async (req, res) => {
    const deletedTA = await firebaseHelper.firestore
        .deleteDocument(db, anCollection, req.params.id);
    res.status(204).send(`Announcement is deleted: ${deletedTA}`);
})

//Edit Announcements
app.patch('/announcements/:id', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, anCollection, req.params.id, req.body);
    res.status(204).send(`Update an announcement: ${updatedDoc}`);
})

//Add Event
app.post('/events', async (req, res) => {
    try {
        const event = {
            name: req.body['name'],
            description: req.body['description'],
            teachingAssistantID: req.body['teachingAssistantID'],
            datetime: req.body['datetime'],
        };
        const newDoc = await firebaseHelper.firestore
            .createNewDocument(db, evCollection, event);
        res.status(201).send(`Created a new event: ${newDoc.id}`);
    } catch (error) {
        res.status(400).send(`Error in entry.`)
    }
})

//Edit Event
app.patch('/events/:id', async (req, res) => {
    const updatedDoc = await firebaseHelper.firestore
        .updateDocument(db, evCollection, req.params.id, req.body);
    res.status(204).send(`Update an event: ${updatedDoc}`);
})

//Delete Event
app.delete('/events/:id', async (req, res) => {
    const deletedEvent = await firebaseHelper.firestore
        .deleteDocument(db, 'events', req.params.id);
    res.status(204).send(`event is deleted: ${deletedEvent}`);
})

//Get All TA's
app.get('/teachingAssistant', (req, res) => {
    firebaseHelper.firestore
        .backup(db, 'teachingAssistant')
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get teachingAssistant: ${error}`));
})

//Get a TA
app.get('/teachingAssistant/:id', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, 'teachingAssistant', req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get TA: ${error}`));
})

//Get Events by TA
app.get('/events/?teachingAssistantID', (req, res) => {
    firebaseHelper.firestore
        .queryData(db, 'events', ['teachingAssistantID', '==', req.params['teachingAssistantID']], ['teachingAssistantID'])
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get events: ${error}`));
})

//Get All Events
app.get('/events', (req, res) => {
    firebaseHelper.firestore
        .backup(db, 'events')
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get events: ${error}`));
})

app.get('/announcements', (req, res) => {
    firebaseHelper.firestore
        .backup(db, 'announcements')
.then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(`Cannot get announcements: ${error}`));
})

//get event
app.get('/events/:id', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, 'events', req.params.id)
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get events: ${error}`));
})

//Get Announcement
app.get('/announcements/:id', (req, res) => {
    firebaseHelper.firestore
        .getDocument(db, 'announcements', req.params.id)
.then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get announcement: ${error}`));
})

//get announcements by taID
app.get('/announcements/?teachingAssistantID=', (req, res) => {
    firebaseHelper.firestore
        .queryData(db, 'announcements', ['teachingAssistantID', '==', req.params['teachingAssistantID']], ['teachingAssistantID'])
        .then(doc => res.status(200).send(doc))
        .catch(error => res.status(400).send(`Cannot get announcements: ${error}`));
})

