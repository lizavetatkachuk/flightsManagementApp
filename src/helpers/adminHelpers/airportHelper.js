import { api } from "./../apiHeler";

const patchAirport = (values, airports, setAirports, setEdited, setError) => {
  api
    .patch("/admin/airports/", {
      ...values
    })
    .then(res => {
      let filtered = airports.filter(airport => {
        return airport.code !== values.code;
      });
      setAirports([...filtered, values]);
      setEdited(null);
    })
    .catch(err => {
      setError(err);
    });
};

const postAirport = (values, airports, setAirports, setEdited, setError) => {
  api
    .post("/admin/airports/", {
      ...values
    })
    .then(res => {
      setAirports([...airports, values]);
      setEdited(null);
    })
    .catch(err => {
      setError(err);
    });
};
const deleteAirport = (code, airports, setAirports) => {
  api.post(`/admin/airports/${code}`).then(res => {
    let filtered = airports.filter(airport => {
      return airport.code !== code;
    });
    setAirports(filtered);
  });
};

export { patchAirport, postAirport, deleteAirport };
