document.addEventListener('DOMContentLoaded', (event) => 
{
    console.log('Document loaded and script running');




// map variable with a set view to visualize the United States
let map = L.map('mymap').setView([37.8, -96], 4);

let ourData = []; 



//A link to the mapping software 
var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



// Function to create markers for private institutions
function createPrivateInstitutionMarkers() {
  ourData.forEach(data => {
      let state = data.state;
      let privateInstitution = parseFloat(data.privateInstitution);

      // Check if latitude and longitude are valid numbers
      if (!isNaN(data.latitude) && !isNaN(data.longitude)) {

          // makes a marker variable that if clicked on will show the private institution data based on state
          let marker = L.marker([data.latitude, data.longitude])
              .bindPopup(`<h3>${state}</h3><p>Private Institution: ${privateInstitution}</p>`)
              .addTo(map);
      } else {
        //error to handle the invalid data for lat/long 3 of them
          console.error(`Invalid latitude or longitude for state: ${state}`);
      }
  });
}




fetch('CostAndDegreesGrantedByState.csv')
.then((response) => response.text())
.then((data) => {
    //split csv data into rows
    let rows = data.split('\n');
    //getting the column names
    let columns = rows[0].split(',');
    
    rows.shift();
    // Processing each row
    rows.forEach(row => {
        let rowData = row.split(',');
        let state = rowData[0];
        let privateInstitution = parseFloat(rowData[1]);
        let publicInstitution = parseFloat(rowData[2]);
        let business = parseFloat(rowData[3]);
        let computerAndInfo = parseFloat(rowData[4]);
        let education = parseFloat(rowData[5]);
        let engineering = parseFloat(rowData[6]);
        let healthProfessions = parseFloat(rowData[7]);
        let humanities = parseFloat(rowData[8]);
        let naturalSciences = parseFloat(rowData[9]);
        let otherFields = parseFloat(rowData[10]);
        let psychology = parseFloat(rowData[11]);
        let socialSciences = parseFloat(rowData[12]);
        let latitude = parseFloat(rowData[13]); 
        let longitude = parseFloat(rowData[14]); 


        // Store the extracted data in your desired format
        ourData.push({
            state,
            privateInstitution,
            publicInstitution,
            business,
            computerAndInfo,
            education,
            engineering,
            healthProfessions,
            humanities,
            naturalSciences,
            otherFields,
            psychology,
            socialSciences,
            latitude,
            longitude
        });

      });

    console.log(ourData); // You can now use this data for further processing

    createPrivateInstitutionMarkers();
})
.catch((error) => alert(error));

});
