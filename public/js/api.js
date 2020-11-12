const API_KEY = "aacc958f967c440f8841522bbae7c715";
const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2014;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;


const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                    
                })                
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            console.log("Fetch Competition Data: " + data);
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    let standings = " ";
    let title=" ";
    let standingElement =  document.getElementById("homeStandings");
    let i=1;

    // <td><a href="./team.html?id=${standing.team.id}">${standing.team.name}</a></td>
    data.standings[0].table.forEach(function (standing) {
        standings += `                
                    <tr>
                        <td>${i}</td>
                        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                        <td>${standing.team.name}</td>
                        <td>${standing.won}</td>
                        <td>${standing.draw}</td>
                        <td>${standing.lost}</td>
                        <td>${standing.points}</td>
                        <td>${standing.goalsFor}</td>
                        <td>${standing.goalsAgainst}</td>
                        <td>${standing.goalDifference}</td>
                        <td><b>${standing.points}</b></td>
                        <td>${standing.form}</td>
                        <td><button id="${standing.team.id}" class="waves-effect waves-light playerButton">Players</button></td>
                    </tr>
                
        `;
        i++;
    });

    title=`
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
        <table class="bordered centered highlight striped responsive-table">
        <thead>
            <tr>
                <th>League Name</th>                           
                <th>Start Date</th>
                <th>End Date</th>
               
            </tr>
        </thead>
        <tbody id="standings">
            <tr>
                <td>${data.competition.name}</th>                           
                <td>${data.season.startDate}</th>
                <td>${data.season.endDate}</th>
            
            </tr>
        </tbody>
        </table>

    </div>
    `;       

     //standingElement.innerHTML =  standingElement.innerHTML + `${title}       
     standingElement.innerHTML = `${title}  
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="bordered highlight striped responsive-table">
                    <thead>
                        <tr>
                            <th colspan="3">Club</th>                           
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                            <th>Pts</th>
                            <th>Last 5</th>
                            <th></th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                         ${standings}
                    </tbody>
                </table>
                
                </div>
    `;

    let removeButtons = document.querySelectorAll(".playerButton");
        for(let button of removeButtons) {
            button.addEventListener("click", function (event) {  
                       
                let id = event.target.id;
                getTeamById2(id);
            })
        }

}

function getTeamById() {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var teamEndPoint=BASE_URL + "teams/" + idParam;
    if ("caches" in window) {
      caches.match(teamEndPoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            showTeams(data);
          });
        }
      });
    }
  
    fetchAPI(teamEndPoint)
    .then(data => {
        showTeams(data);
    })
    .catch(error => {
        console.log(error)
    })

  }

function getTeamById2(id) {
    // Ambil nilai query parameter (?id=)   
    var teamEndPoint=BASE_URL + "teams/" + id;
    if ("caches" in window) {
      caches.match(teamEndPoint).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            showTeams(data);
          });
        }
      });
    }
  
    fetchAPI(teamEndPoint)
    .then(data => {
        showTeams(data);
    })
    .catch(error => {
        console.log(error)
    })

  }


function showTeams(data) {
    let standings = "";

    let teamElement =  document.getElementById("body-content");
    let i=1;
    let title="";
   
    data.squad.forEach(function (data) {
        var date = (new Date(data.dateOfBirth)).toISOString().split('T')[0];

        standings += `        
        <tr>
            <td>${i}</td>
            <td><b>${data.name}</b></td>
            <td>${data.position}</td>
            <td>${data.countryOfBirth},${date} </td>
            <td>${data.nationality} </td>          
            <td>${data.role} </td>
        </tr>                
        `;
                
        i++;

        
    });


    title=`
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
        <table class="bordered centered highlight striped responsive-table">
        <thead>
            <tr>
                <th></th>
                <th style="display:none;"></th>
                <th>Club Name</th>                           
                <th>Venue</th>
                <th>Founded</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="standings">
            <tr>
                <td><img id="insertImg" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td style="display:none;" id="insertId">${data.id}</td>
                <td class="insertName" id="insertName">${data.name}</th>                           
                <td id="insertVenue">${data.venue}</th>
                <td id="insertFounded">${data.founded}</th>     
                <td><button class="waves-effect waves-light btn insertButton" id="saveButton">Favourite</button></td>          
            </tr>
        </tbody>
        </table>

    </div>
    `;          
 
     teamElement.innerHTML = `${title}
     <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

     <table class="bordered highlight striped responsive-table">
         <thead>
             <tr>
                 <th></th>                           
                 <th>Name</th>
                 <th>Position</th>
                 <th>Birth</th>
                 <th>Nationality</th>               
                 <th>Role</th>  
                 <th></th>              
             </tr>
          </thead>
         <tbody id="standings">
              ${standings}
         </tbody>
     </table>
     
     </div>
`;

   
    // let insertButton = document.querySelector(".insertButton");
    let insertButton = document.getElementById("saveButton");
    let insertName = document.getElementById("insertName");
    let insertId = document.getElementById("insertId")
    let insertImg = document.getElementById("insertImg");
    let insertVenue = document.getElementById("insertVenue");
    let insertFounded = document.getElementById("insertFounded");


    insertButton.addEventListener("click", function (event) {
       
        //let playerId = event.target.id;      
        console.log(insertId.textContent);
        // console.log(insertName.textContent);
        // console.log(insertVenue.textContent);
        // console.log(insertFounded.textContent);  
        // console.log(insertImg.src);
        
                   
        insertPlayer(insertId.textContent,insertName.textContent,insertVenue.textContent,insertFounded.textContent)
    })


    dbGetAllteamById(insertId.textContent).then(result => {
        console.log(result);
        if(result){
            insertButton.disabled = true;
        }
        
    });

}

function insertPlayer(id,name,venue,founded) {
    const player = {
        teamId: id,
        name: name,
        venue: venue,
        founded: founded
    };

    dbInsertTeam(player).then(() => {
        alert("Berhasil ditambah");

        let insertButton = document.getElementById("saveButton");
        dbGetAllteamById(insertId.textContent).then(result => {
            console.log(result);
            if(result){
                insertButton.disabled = true;
            }
            
        });
    })
}

function getAllSavedTeams() {
    const teamsRow =  document.getElementById("savedStandings");

    function showAllTeams() {
    dbGetAllTeams().then(teams => {
        let listInText = ` <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="bordered centered highlight striped responsive-table">
            <thead>
                <tr>
                    <th></th>
                    <th style="display:none;"></th>
                    <th>Club Name</th>                           
                    <th>Venue</th>
                    <th>Founded</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="teamsRow">
            
           `;
        let i=1;
        teams.forEach(team => {
            listInText += `
            <tr>
                <td>${i}</td>
                <td style="display:none;">${team.teamId}</td>
                <td>${team.name}</td>
                <td>${team.venue}</td>
                <td>${team.founded}</td>
                <td><button id="${team.teamId}" class="removeButton">Remove</button></td>
            </tr>
            `;
            i++;
        });

        listInText += `
            </tbody>
            </table>

            </div>
        `;
        teamsRow.innerHTML =  listInText;

        let removeButtons = document.querySelectorAll(".removeButton");
        for(let button of removeButtons) {
            button.addEventListener("click", function (event) {            
                let id = event.target.id;
                dbDeleteTeam(id).then(() => {
                    showAllTeams()
                })
            })
        }

    })
    }

    showAllTeams();
}
