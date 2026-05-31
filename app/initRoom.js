import { getDatabase, ref, set, get, child } from "firebase/database";
import { nanoid } from "nanoid";

const initRoom = async (alias, password, setModeCallback) => {
    setModeCallback(MODES.LOADING);
    const db = getDatabase();
    let roomNotExists = true;

    while (true) {
        let room_id = `Rooms/${nanoid(8)}`; //generate room ID

        await get(child(ref(db), room_id))
            .then((snapshot) => {
                console.log(snapshot.exists());
                if (snapshot.exists()) {
                    console.log("Room already Exists! Generating another ID");
                    roomNotExists = false;
                } else {
                    console.log("Room does not exist. Creating room...");
                    roomNotExists = true;
                }
            })
            .catch((error) => {
                console.error(error);
            });

        if (roomNotExists) {
            set(ref(db, room_id), {
                createdBy: alias,
                password: password,
            });
            break;
        }
    }

    setTimeout(() => {
        setModeCallback(MODES.DEFAULT);
    }, 4000);
};

export default initRoom;
