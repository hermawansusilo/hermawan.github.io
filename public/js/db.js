const idbPromised = idb.open('teams_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('teams')) {
        upgradedDb.createObjectStore("teams", {keyPath: "teamId"});
    }
});

const dbGetAllTeams = () => {
    return new Promise((resolve, reject) => {
        console.log("MULAI");
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readonly`);
            return transaction.objectStore("teams").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbGetAllteamById = (id) => {
    return new Promise((resolve,reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readonly`);
            return transaction.objectStore("teams").get(id);
        }).then(data => {
            //console.log(data);
            if (data !== undefined) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })

};


const dbDeleteTeam = teamId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readwrite`);
            transaction.objectStore("teams").delete(teamId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};


const dbInsertTeam = team => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("teams", `readwrite`);
            transaction.objectStore("teams").add(team);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};