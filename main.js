import { createRequire } from "module";
const require = createRequire(import.meta.url);

const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import fetch from "node-fetch";

async function getdata() {
  const response = await fetch("https://random-data-api.com/api/v2/users", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  var data = await response.json();
  console.log(data);

  const csvWriter = createCsvWriter({
    path: "user.csv",
    header: [
      { id: "id", title: "id" },
      { id: "FirstName", title: "FirstName" },
      { id: "LastName", title: "LastName" },
      { id: "Username", title: "Username" },
      { id: "Email", title: "Email" },
      { id: "Avatar", title: "Avatar" },
      { id: "Gender", title: "Gender" },
      { id: "DoB", title: "DoB" },
      { id: "Address", title: "Address" },
    ],
  });

  const records = [
    {
      id: data.id,
      FirstName: data.first_name,
      LastName: data.last_name,
      Username: data.username,
      Email: data.email,
      Avatar: data.avatar,
      Gender: data.gender,
      DoB: data.date_of_birth,
      Address: `${data.address.city},${data.address.street_name},${data.address.street_address},${data.address.zip_code},${data.address.state},${data.address.country}`,
    },
  ];



  async function writeFile() {
    await csvWriter.writeRecords(records);
      // returns a promise
      .then(() => {
        console.log("...Done");
      });
  }
  writeFile();
}
getdata();
