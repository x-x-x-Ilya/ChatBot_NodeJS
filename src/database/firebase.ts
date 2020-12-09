import { log } from '../middleware/logging';
import firebase from 'firebase/app';
require('firebase/database');

const proc = process.env;

export const firebaseDatabase = (): void => {
    const config = {
        apiKey: proc.FIREBASE_API_KEY,
        authDomain: proc.FIREBASE_AUTH_DOMAIN,
        databaseURL: proc.FIREBASE_DATABASE_URL,
        projectId: proc.FIREBASE_PROJECT_ID,
        storageBucket: proc.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: proc.FIREBASE_MESSAGING_SENDER_ID,
        appId: proc.FIREBASE_APP_ID,
        measurementId: proc.FIREBASE_MEASUREMENT_ID,
    };
    firebase.initializeApp(config);
};

export const writeClientData = (
    id: number,
    first_name: string,
    email: string,
    last_name: string,
): void => {
    firebase
        .database()
        .ref('clients/' + id)
        .set(
            {
                first_name: first_name,
                email: email,
                last_name: last_name,
                deleted: false,
            },
            function(e) {
                if (e) {
                    log('./logs/_errors.txt', e, ' ');
                }
            },
        );
};

export const updateClientEmail = (id: number, email: string): void => {
    firebase
        .database()
        .ref('clients/' + id)
        .update(
            {
                email: email,
            },
            function(e) {
                if (e) {
                    log('./logs/_errors.txt', e, ' ');
                }
            },
        );
};

export const updateClientLastName = (id: number, last_name: string): void => {
    firebase
        .database()
        .ref('clients/' + id)
        .update(
            {
                last_name: last_name,
            },
            function(e) {
                if (e) {
                    log('./logs/_errors.txt', e, ' ');
                }
            },
        );
};
