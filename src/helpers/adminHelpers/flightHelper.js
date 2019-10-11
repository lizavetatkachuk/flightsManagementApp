import { api } from "./../apiHeler";

const postFlight = (values, setMessage) => {
  api
    .post("/admin/flights/add", {
      ...values,
      time: values.there,
      booked: []
    })
    .then(res => {
      setMessage("Flight created");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    })
    .catch(err => {
      setMessage("Invalid data");
    });
};

const patchFlight = (values, props) => {
  api.patch("/admin/flights", { ...values }).then(res => {
    api.get("admin/flights").then(res => {
      props.close();
      props.update(res.data);
    });
  });
};
export { postFlight, patchFlight };
