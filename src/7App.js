import React, { useState, useEffect } from 'react';
import { database, firestore } from './firebase';
import { ref, set, update, remove, onValue } from "firebase/database";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc } from "firebase/firestore";

function App() {
  const [realtimeData, setRealtimeData] = useState([]);
  const [firestoreData, setFirestoreData] = useState([]);
  const [inputData, setInputData] = useState({ id: '', name: '', email: '' });

  // Fetch Realtime Database Data
  useEffect(() => {
    const dbRef = ref(database, 'users/');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRealtimeData(data ? Object.entries(data).map(([key, value]) => ({ ...value, id: key })) : []);
    });
  }, []);

  // Fetch Firestore Data
  const fetchFirestoreData = async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    setFirestoreData(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchFirestoreData();
  }, []);

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // Realtime Database CRUD
  const handleRealtimeAdd = () => {
    set(ref(database, 'users/' + inputData.id), {
      username: inputData.name,
      email: inputData.email
    });
  };

  const handleRealtimeUpdate = () => {
    update(ref(database, 'users/' + inputData.id), {
      username: inputData.name,
      email: inputData.email
    });
  };

  const handleRealtimeDelete = (id) => {
    remove(ref(database, 'users/' + id));
  };

  const handleRealtimeDeleteAll = () => {
    remove(ref(database, 'users/'));
  };

  // Firestore CRUD
  const handleFirestoreAdd = async () => {
    const docRef = doc(firestore, "users", inputData.id);
    await setDoc(docRef, {
      username: inputData.name,
      email: inputData.email
    });
    fetchFirestoreData(); // Reload Firestore data after adding
  };

  const handleFirestoreUpdate = async (id) => {
    try {
      const userDocRef = doc(firestore, "users", id);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          username: inputData.name,
          email: inputData.email
        });
        console.log("Document updated with ID: ", id);
        fetchFirestoreData(); // Reload Firestore data after updating
      } else {
        console.error("No document to update with ID: ", id);
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const handleFirestoreDelete = async (id) => {
    const userDoc = doc(firestore, "users", id);
    await deleteDoc(userDoc);
    fetchFirestoreData(); // Reload Firestore data after deleting
  };

  const handleFirestoreDeleteAll = async () => {
    const querySnapshot = await getDocs(collection(firestore, "users"));
    const batch = firestore.batch();
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    fetchFirestoreData(); // Reload Firestore data after deleting all
  };

  return (
    <div className="App">
      <h1>Firebase CRUD App</h1>
      <div>
        <h2>Realtime Database</h2>
        <input type="text" name="id" placeholder="ID" value={inputData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={inputData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={inputData.email} onChange={handleInputChange} />
        <button onClick={handleRealtimeAdd}>Add</button>
        <button onClick={handleRealtimeUpdate}>Update</button>
        <button onClick={handleRealtimeDeleteAll}>Delete All</button>
        <ul>
          {realtimeData.map(user => (
            <li key={user.id}>
              {user.username} - {user.email}
              <button onClick={() => handleRealtimeDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Firestore</h2>
        <input type="text" name="id" placeholder="ID" value={inputData.id} onChange={handleInputChange} />
        <input type="text" name="name" placeholder="Name" value={inputData.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" value={inputData.email} onChange={handleInputChange} />
        <button onClick={handleFirestoreAdd}>Add</button>
        <button onClick={() => handleFirestoreUpdate(inputData.id)}>Update</button>
        <button onClick={handleFirestoreDeleteAll}>Delete All</button>
        <ul>
          {firestoreData.map(user => (
            <li key={user.id}>
              {user.username} - {user.email}
              <button onClick={() => handleFirestoreDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;