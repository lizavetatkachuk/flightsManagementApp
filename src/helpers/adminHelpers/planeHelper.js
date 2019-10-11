import { api } from "./../apiHeler";

const postPlane = (values, setPlanes, setEdited, setError) => {
  api
    .post("/admin/planes/", {
      ...values
    })
    .then(res => {
      api.get("/admin/planes").then(res => {
        setPlanes(res.data);
        setEdited(null);
      });
    })
    .catch(err => {
      setError(err);
    });
};

const patchPlane = (values, setPlanes, setEdited, setError) => {
  api
    .patch("/admin/planes", {
      ...values
    })
    .then(res => {
      api.get("/admin/planes").then(res => {
        setPlanes(res.data);
        setEdited(null);
      });
    })
    .catch(err => {
      setError(err);
    });
};

const deletePlane = (code, setPlanes) => {
  api.post(`/admin/planes/${code}`).then(res => {
    api.get("/admin/planes").then(res => setPlanes(res.data));
  });
};

export { postPlane, patchPlane, deletePlane };
